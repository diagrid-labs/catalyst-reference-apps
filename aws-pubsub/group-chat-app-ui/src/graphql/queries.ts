/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUserAccount = /* GraphQL */ `query GetUserAccount($user_id: String!) {
  getUserAccount(user_id: $user_id) {
    id
    username
    email
    profile_pic_url
    created_at
    updated_at
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserAccountQueryVariables,
  APITypes.GetUserAccountQuery
>;
export const getGroup = /* GraphQL */ `query GetGroup($group_id: String!) {
  getGroup(group_id: $group_id) {
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
` as GeneratedQuery<APITypes.GetGroupQueryVariables, APITypes.GetGroupQuery>;
export const getGroupMessages = /* GraphQL */ `query GetGroupMessages($group_id: String!) {
  getGroupMessages(group_id: $group_id) {
    items {
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
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetGroupMessagesQueryVariables,
  APITypes.GetGroupMessagesQuery
>;
export const getGroups = /* GraphQL */ `query GetGroups($token: String, $limit: Int!) {
  getGroups(token: $token, limit: $limit) {
    items {
      id
      group_name
      creator_id
      group_description
      group_url
      created_at
      updated_at
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetGroupsQueryVariables, APITypes.GetGroupsQuery>;
export const getUsers = /* GraphQL */ `query GetUsers {
  getUsers {
    items {
      id
      username
      email
      profile_pic_url
      created_at
      updated_at
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUsersQueryVariables, APITypes.GetUsersQuery>;
