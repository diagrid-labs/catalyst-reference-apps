# Group Chat Microservice

## Prerequisites
Please ensure you have these dependencies configured and installed before proceeding
- [Diagrid Account](https://catalyst.diagrid.io/)
- [DIAGRID CLI](https://docs.diagrid.io/catalyst/references/cli-reference/intro/)
- [Github Acount](https://docs.diagrid.io/catalyst/references/cli-reference/intro/)
- [AWS Account](https://repost.aws/knowledge-center/create-and-activate-aws-account)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

## Setup AWS CLI
Retrieve AWS access credentials from the AWS console.

From your CLI run these commands, replacing XXX and YYY with the correct values.
```
export AWS_ACCESS_KEY_ID=XXX
export AWS_SECRET_ACCESS_KEY=YYY
export AWS_DEFAULT_REGION=us-east-1

export GROUP_CHAT_MICROSERVICES=group-chat-microservices 

aws configure
```

## Install Catalyst Project
From the CLI, run the command to install and provision all resources required for your catalyst project

`python run.py`


## Running Github Actions
Fork the github project. Navigate to `settings` -> `secrets and variables` -> `action`.

Click on `new repository secret` button.

Add these secrets

```
Name                           Value
-----
AWS_ACCESS_KEY_ID             -------
AWS_ACCOUNT_ID                -------
AWS_SECRET_ACCESS_KEY         -------
DIAGRID_API_KEY               --------
DIAGRID_PROJECT               --------
```

The Gihub actions pipeline runs everytime you do a push.