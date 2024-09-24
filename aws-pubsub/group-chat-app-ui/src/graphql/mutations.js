/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserAccount = /* GraphQL */ `
  mutation CreateUserAccount($userInput: CreateUserInput!) {
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
`;
export const createGroup = /* GraphQL */ `
  mutation CreateGroup($input: CreateGroupInput!) {
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
`;
export const addGroupParticipant = /* GraphQL */ `
  mutation AddGroupParticipant(
    $group_id: String!
    $user_id: String!
    $role: String!
  ) {
    addGroupParticipant(group_id: $group_id, user_id: $user_id, role: $role)
  }
`;
export const sendGroupMessage = /* GraphQL */ `
  mutation SendGroupMessage($input: CreateMessageInput!) {
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
`;
export const addTypingIndicator = /* GraphQL */ `
  mutation AddTypingIndicator($input: CreateTypingInput!) {
    addTypingIndicator(input: $input) {
      id
      user_id
      group_id
      typing
      __typename
    }
  }
`;
