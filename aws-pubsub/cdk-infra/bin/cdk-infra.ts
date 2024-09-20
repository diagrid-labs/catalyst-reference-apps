#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkInfraStack } from "../lib/cdk-infra-stack";
import { RepositoryStack } from "../lib/repository-stack";

const app = new cdk.App();

new RepositoryStack(app, "repoStackName", {});
new CdkInfraStack(app, "CdkInfraStack", {});
