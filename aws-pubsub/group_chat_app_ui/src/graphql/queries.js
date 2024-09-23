/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserAccount = /* GraphQL */ `
  query GetUserAccount($user_id: String!) {
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
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($group_id: String!) {
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
`;
export const getGroupMessages = /* GraphQL */ `
  query GetGroupMessages($group_id: String!) {
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
`;
export const getGroups = /* GraphQL */ `
  query GetGroups($token: String, $limit: Int!) {
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
`;
export const getUsers = /* GraphQL */ `
  query GetUsers {
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
`;
