/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUserAccount = /* GraphQL */ `mutation CreateUserAccount($userInput: CreateUserInput!) {
  createUserAccount(userInput: $userInput) {
    id
    username
    email
    profile_pic_url
    created_at
    updated_at
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserAccountMutationVariables,
  APITypes.CreateUserAccountMutation
>;
export const createGroup = /* GraphQL */ `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    id
    group_name
    creator_id
    group_description
    last_message {
      id
      user_id
      group_id
      message_type
      message_content
      image_url
      video_url
      created_at
      updated_at
      __typename
    }
    group_url
    created_at
    members {
      user_id
      role
      __typename
    }
    messages {
      id
      user_id
      group_id
      message_type
      message_content
      image_url
      video_url
      created_at
      updated_at
      __typename
    }
    updated_at
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateGroupMutationVariables,
  APITypes.CreateGroupMutation
>;
export const addGroupParticipant = /* GraphQL */ `mutation AddGroupParticipant(
  $group_id: String!
  $user_id: String!
  $role: String!
) {
  addGroupParticipant(group_id: $group_id, user_id: $user_id, role: $role)
}
` as GeneratedMutation<
  APITypes.AddGroupParticipantMutationVariables,
  APITypes.AddGroupParticipantMutation
>;
export const sendGroupMessage = /* GraphQL */ `mutation SendGroupMessage($input: CreateMessageInput!) {
  sendGroupMessage(input: $input) {
    id
    user_id
    group_id
    message_type
    message_content
    image_url
    video_url
    created_at
    updated_at
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendGroupMessageMutationVariables,
  APITypes.SendGroupMessageMutation
>;
export const addTypingIndicator = /* GraphQL */ `mutation AddTypingIndicator($input: CreateTypingInput!) {
  addTypingIndicator(input: $input) {
    id
    user_id
    group_id
    typing
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AddTypingIndicatorMutationVariables,
  APITypes.AddTypingIndicatorMutation
>;
