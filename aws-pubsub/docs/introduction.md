# Introduction

This tutorial illustrates how to build a Group Chat Microservice application
using Diagrid Catalyst(https://www.diagrid.io/catalyst) and AWS Services.

## Services

This application is broken down into 6 services.

### User Service.

Responsible for User related functionality such as

- create
- update
- Read
- Delete Users

### Message Service.

Responsible for Message related functionality such as

- Sending a message to a group
- reading all group messages
- sending events to update user typing indicators

### Group Service.

Responsible for Group related functionality such as

- Create/Update/Read/Delete Groups
- Adding users to Group
- Getting messages per Group

### User Group Service

Responsible for

- managing group users

### Typing Indicator Service

Provides functionality to add/update users typing indicators per group.

### Read Receipts Service

Provides functionality to mark/un-mark messages either as read or unread. This
can later be used to show the number of unread messages a user has in a group.

## Events

Communication between services are done through events. This effectively leads
to isolation and loose coupling between services.

The configured AWS SNS/SQS pubsub serves as a great message broker in the
application.

We have a single subscription topic(`group-subscription-topic`) which routes
messages to different event handlers.

## Event Types

### send-message

This event is published by the `message-service` and subscribed to by the
`group-service` and `typing-indicator-service`.

### add-group-participant

This event is published by the `group-service` and subscribed to by the
`user-group-service`.
