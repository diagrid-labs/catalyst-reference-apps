# Create Diagrid(Catalyst) Project And Components

Because this project has 6 services, each service will represent a Catalyst App
Id.

Communication between services will be done through a pubsub connection that
consist of SNS topics and SQS subscriptions. AWS SNS/SQS will be configured on
demand by Catalyst.

Each service will have a state for data storage and for this application, we'll
be using AWS DynamoDB.

![group](./assets/group_dk.png)

## Project Directory Structure

```
|catalyst-reference-apps
|-.github
   |--workflows
|-aws-pubsub
  |--cdk-graphql-stack(`realtime appsync api`)
  |--cdk-infra(`docker-ecr-ecs/fargate`)
  |--docs
  |--group-chat-app-ui
  |--services(Catalyst Apps)
|-group-subs.yaml
|-readme.md
```

The `.github` folder contains a Github Actions pipeline setup to automate the
creation and configuration of this project, alongside all it's components.

The workflow is broken down into 3 jobs.

### setup-diagrid-project

This job

- Creates a new Diagrid Catalyst project called `group-chat-microservices` with
  6 Catalyst apps.
- Configures a Dynamodb state for each Catalyst App. Meaning 6 Dynamodb States.
- Creates a single pubsub (AWS SQS/SNS) for all the states.
- Configures a subscription topic for catalyst apps to publish and subscribe to.

### 2. upload-to-ecs

This job

- Retrieves the Diagrid Project variables such as `apitoken` for each catalyst
  app, and also the `http_url` and `grpc_url` which will be passed in as
  Environment Variables when creating Fargate Tasks for each service in
  ECS(Elastic Container Service).

- Uploads a docker image for each catalyst app(service) to Amazon Elastic
  Container Registry(ECR)
- Installs A CDK project alongside some dependencies

- Creates a VPC(Virtual Private Cloud) configuration with subnets, availability
  zones and VPC Logs for an ECS cluster.
- Configures an Amazon Elastic Container Service(ECS) cluster and uploads each
  ECR image as a Fargate while passing in the with individual Application Load
  Balancers(ALB).
- Gets the Domain Name Service(DNS) for each ALB and adds them as a public
  endpoint to each Catalyst App.

### 3. deploy-graphql-cdk-stack

This job

- Installs CDK and accompanying dependencies.
- Grabs all ALB DNS for each service and passes them as a json file to a CDK
  project.
- Deploys CDK Project and generates an endpoint which can be used to perform
  `query`, `mutation` and `subscription` operations on the underlying data.

The generated endpoint will also be used to configure the group chat apps
frontend amplify application, which we'll cover later

## Deploy

Create a fork of this github repository
https://github.com/diagrid-labs/catalyst-reference-apps/tree/main.

Navigate to the `Settings` menu of your fork. ![settings](./assets/settings.png)

Scroll down to the bottom left hand side of the screen and click on
`Secrets and Variables`.

![secrets_and_variables](./assets/secrets_variables.png)

Click on `Actions`.

![actions](./assets/actions.png).

Click on the blue button `New repository secret` and add key-value pairs for
each of these repository secrets.

For the Diagrid API_KEY, assuming you've installed and logged into the diagrid
CLI from the command line, run this command

```bash

diagrid apikey create --name [ENTER NAME OF API KEY] --role  cra.diagrid:admin

```

Replace `[ENTER NAME OF API KEY]` with any name of your choice.

For the `DIAGRID_PROJECT` , use this `group-chat-microservices`

- AWS_ACCESS_KEY_ID
- AWS_ACCOUNT_ID
- AWS_DEFAULT_REGION
- AWS_SECRET_ACCESS_KEY
- DIAGRID_API_KEY
- DIAGRID_PROJECT

Do a git push once you're done. If the everything was configured properly, your
workflow should run and all 3 jobs completed successfully.

Now, sign into your aws console, from the search bar, type `appsync`, navigate
to your appsync console.

![search_appsync](./assets/search_appsync.png)

You'll find a project named `groupChatApiMicroservice`
![group_chat_project](./assets/group_chat.png)

Click on the project, navigate to settings on the bottom left handside of the
menu and grab the keys below.

```
  "aws_appsync_graphqlEndpoint": [GRAPHQL_ENDPOINT],
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-**************",
```

![appsync_settings](./assets/appsync_settings.png)
![valid_api_key](./assets/valid_api_key.png)


Navigate back to your project's home page by clicking the name of the project in
the left menu. ![valid_api_key](./assets/project_name.png)

Scroll to the middle of the page and copy the command shown in the screenshot
below. ![valid_api_key](./assets/copy_command.png)

Make sure you change the `--appId`

```bash
npx @aws-amplify/cli codegen add --apiId 5ytfjd2****** --region us-east-1
```

Next,from your IDE, navigate to the directory
`../aws-pubsub/group-chat-app-ui/`, and run the following commands

`npm install aws-amplify`

`npm i` and the command you copied above.

`amplify init` to initialize a new amplify application.

You'll also have to add 2 amplify categories.

- Auth
- Storage.

Run the command `amplify add auth` and follow the prompts. Please view the
screenshot below

![amplify auth](../docs/assets/amplify_auth.png)

Run the command `amplify add storage and follow the prompts as show on the
screenshot.

![amplify storage](../docs/assets/amplify_storage.png)

Navigate to the directory
`../aws-pubsub/group-chat-app-ui/src`. Open up the file `amplifyconfig.json` and
add the key-value pairs you saved earlier to the file.

Below is a sample of how your `amplifyconfig.json` file should look like.

```json
{
 
  "aws_project_region": "us-east-1",
  "aws_appsync_graphqlEndpoint": "ADD GRAPHQL ENDPOINT HERE",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "ADD VALID API KEY HERE",
  "aws_cognito_identity_pool_id": "us-east-1:627cb5d3-ecaf-4fa1-a754-545144620488",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_ak4Wv1FF4",
  "aws_user_pools_web_client_id": "4heoc8i46cacpm6nimj564hd23",
  "oauth": {},
  "aws_cognito_username_attributes": ["EMAIL"],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": ["EMAIL"],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": ["SMS"],
  "aws_cognito_password_protection_settings": {
    "passwordPolicyMinLength": 8,
    "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": ["EMAIL"],
  "aws_user_files_s3_bucket": "S3 Bucket",
  "aws_user_files_s3_bucket_region": "us-east-1"


}
```

Finally, run the command

`amplify push` to push the application and create cloud resources.

You can run the application locally, using the command

`npm run dev`

or follow this [elaborate guide](https://docs.amplify.aws/vue/start/quickstart/)
to deploy the application to the cloud.

## Creating and running a diagrid Catalyst app locally

Assuming you created an AWS Access Key/secret in the prerequisites section. Once
cloned and open inside the IDE.

Setup these environment variables in your CLI.

```
export CONNECTION_ACCESS_KEY=******
export CONNECTION_SECRET_KEY=********8
export AWS_DEFAULT_REGION=****
export AWS_ACCOUNT_ID=2******
export GROUP_CHAT_MICROSERVICES=group-chat-microservices

```

Then run the command `python run.py` to install and configure your diagrid
project and components
