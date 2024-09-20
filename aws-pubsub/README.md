# Group Chat Microservice

## Prerequisites

- [Diagrid Account](https://catalyst.diagrid.io/)
- [AWS Account](https://repost.aws/knowledge-center/create-and-activate-aws-account)

Please ensure you have these dependencies configured and installed before proceeding

- [Diagrid CLI](https://docs.diagrid.io/catalyst/references/cli-reference/intro/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

### Setup AWS CLI

Retrieve AWS access credentials from the AWS console. From your CLI run these commands, replacing XXX and YYY with the correct values.

```bash
export AWS_ACCESS_KEY_ID=XXX
export AWS_SECRET_ACCESS_KEY=YYY
export AWS_DEFAULT_REGION=us-east-1

aws configure
```

### Log in to Catalyst

Log in using the below command:

```bash
diagrid login
```

If you have more than one Catalyst organization, set the default org:

```bash
diagrid org use [YOUR-ORG-NAME]
```

### Create an API Key

Create an API key which can be used by the Github Action to create and update Catalyst resources in your organization

```bash
diagrid apikey create --name github-action --role cra.diagrid:admin
```

## Running Github Actions

Fork the github project. Navigate to `Settings` -> `Secrets and variables` -> `Actions`.

Click the `New repository secret` button.

Add the following secrets and populate your credentials:

```bash
Name                           Value
-----
AWS_ACCESS_KEY_ID             -------
AWS_ACCOUNT_ID                -------
AWS_SECRET_ACCESS_KEY         -------   
```

Next, select the `Variables` tab and click the `New repository variable` button.

Add the following variables:

```bash
Name                           Value
-----
CATALYST_PROJECT_NAME          Enter a unique project name for your group chat application
```

The Gihub actions pipeline runs everytime you do a push