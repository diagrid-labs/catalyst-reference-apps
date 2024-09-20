import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as apigw2 from "aws-cdk-lib/aws-apigatewayv2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as logs from "aws-cdk-lib/aws-logs";
import * as iam from "aws-cdk-lib/aws-iam";
import { HttpAlbIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { readFileSync } from "fs";
import { ServiceApiToken } from "./service-api-token";

export class CdkInfraStack extends cdk.Stack {
  PREFIX = "GROUP-CHAT";
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get file name from context and parse JSON
    const inputFile = this.node.tryGetContext("configfile");
    const envVar: [ServiceApiToken] = JSON.parse(
      readFileSync(inputFile).toString()
    );
    const vpc = new ec2.Vpc(this, "EdaVpc", {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
      maxAzs: 2, // Default is all AZs in region
      vpcName: `${this.PREFIX}-mvpc`,

      restrictDefaultSecurityGroup: false,
    });
    // Create Log Group
    const vpcLogGroup = new logs.LogGroup(this, "VPCLogGroup", {
      logGroupName: "ecs-cdk-vpc-flow",
      retention: logs.RetentionDays.ONE_DAY,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create IAM Role
    const vpcFlowRole = new iam.Role(this, "FlowLog", {
      assumedBy: new iam.ServicePrincipal("vpc-flow-logs.amazonaws.com"),
      inlinePolicies: {
        ses: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
              ],
              resources: [vpcLogGroup.logGroupArn],
              effect: iam.Effect.ALLOW,
            }),
          ],
        }),
      },
    });

    // Create VPC Flow Log
    new ec2.CfnFlowLog(this, "FlowLogs", {
      resourceId: vpc.vpcId,
      resourceType: "VPC",
      trafficType: "ALL",
      deliverLogsPermissionArn: vpcFlowRole.roleArn,
      logDestinationType: "cloud-watch-logs",
      logGroupName: vpcLogGroup.logGroupName,
    });

    const cluster = new ecs.Cluster(this, "MultiImageCluster", {
      vpc: vpc,
      clusterName: `${this.PREFIX}-cluster`,
    });

    const deployService = async (service: ServiceApiToken) => {
      const serviceRepo = ecr.Repository.fromRepositoryName(
        this,
        `${service.service}-RepositoryService`,
        `${service.service}`
      );

      const task_definition = new ecs.FargateTaskDefinition(
        this,
        `${service.service}-Task-def`,
        {
          cpu: 256,
          memoryLimitMiB: 512,
          runtimePlatform: {
            operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
            cpuArchitecture: ecs.CpuArchitecture.X86_64,
          },
        }
      );

      const container = task_definition.addContainer(
        `${service.service}-container`,
        {
          image: ecs.ContainerImage.fromEcrRepository(serviceRepo, "latest"),
          environment: {
            DAPR_API_TOKEN: service.apiToken,
          },

          logging: ecs.LogDrivers.awsLogs({
            streamPrefix: `${service.service}-stream`,
            logRetention: logs.RetentionDays.ONE_DAY,
          }),
        }
      );

      container.addPortMappings({
        containerPort:
          service.service == "user-service"
            ? 5006
            : service.service == "group-service"
            ? 5002
            : service.service == "message-service"
            ? 5001
            : service.service == "read-receipts-service"
            ? 5005
            : service.service == "typing-indicator-service"
            ? 5003
            : 5004,
        protocol: ecs.Protocol.TCP,
      });

      // Create a load-balanced Fargate service and make it public
      const fargateService =
        new ecs_patterns.ApplicationLoadBalancedFargateService(
          this,
          `${service.service}-fargateService`,
          {
            cluster: cluster, // Required
            cpu: 256, // can be >= 256
            serviceName: `${service.service}`,
            loadBalancerName: `${service.service}-ALB`,
            desiredCount: 2, // Default is 1
            taskDefinition: task_definition,
            listenerPort: 80,
            memoryLimitMiB: 512, // can be >= 512
            publicLoadBalancer: true, // can be set to false
          }
        );

      // Add Scaling
      const scaling = fargateService.service.autoScaleTaskCount({
        maxCapacity: 5,
        minCapacity: 1,
      });
      scaling.scaleOnCpuUtilization("CpuScaling", {
        targetUtilizationPercent: 70,
      }); // default cooldown of 5 min
      scaling.scaleOnMemoryUtilization("RamScaling", {
        targetUtilizationPercent: 70,
      }); // default cooldown of 5 min

      fargateService.targetGroup.configureHealthCheck({
        path: "/",
      });

      const httpApi = new apigw2.HttpApi(this, `${service.service}-HttpApi`, {
        apiName: `${service.service}-api`,
      });

      httpApi.addRoutes({
        path: "/",
        methods: [apigw2.HttpMethod.GET],
        integration: new HttpAlbIntegration(
          `${service.service}-AlbIntegration`,
          fargateService.listener
        ),
      });
    };

    const deployAllServices = async () => {
      for (const service of envVar) {
        await deployService(service);
      }
    };

    deployAllServices();
  }
}
