# Catalyst Cloud Reference Applications

This repo contains deployable reference architectures that leverage the Catalyst APIs from applications and services running in the cloud. Each sample shows how to wire a real cloud deployment to [Diagrid Catalyst](https://www.diagrid.io/catalyst) building block APIs (Pub/Sub, State, and more) so you can see end-to-end patterns rather than isolated snippets. The samples are intended for developers and architects evaluating Catalyst for cloud-native applications.

## Prerequisites

- A [Diagrid Catalyst](https://www.diagrid.io/catalyst) account.
- Per-sample prerequisites (cloud provider account, language runtime, infrastructure-as-code tools) — see each sample's own README.

## Getting Started

| Sample Application    | Language | Catalyst APIs | Deployment target | Description |
| -------- | ------- | -------- | ------- | ------- |
| [Group chat application](https://github.com/diagrid-labs/catalyst-reference-apps/tree/main/aws-pubsub)  | Python | Pub/Sub, State |  AWS  | Interact with an intuitive user interface to send and receive messages |

## Project structure

- `aws-pubsub/` — Group chat reference application deployed on AWS, using Catalyst Pub/Sub and State APIs.

---

Join the [Dapr Discord](https://diagrid.ws/dapr-discord) for Q&A and chat with other community members!
