/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  username: string,
  email: string,
  profile_pic_url?: string | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  email: string,
  profile_pic_url?: string | null,
  created_at: number,
  updated_at?: number | null,
};

export type CreateGroupInput = {
  group_name: string,
  creator_id: string,
  group_description: string,
  group_url?: string | null,
};

export type Group = {
  __typename: "Group",
  id: string,
  group_name: string,
  creator_id: string,
  group_description: string,
  last_message?: Message | null,
  group_url?: string | null,
  created_at: number,
  members:  Array<Member >,
  messages?:  Array<Message > | null,
  updated_at?: number | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  user_id: string,
  group_id: string,
  message_type: MESSAGETYPE,
  message_content?: string | null,
  image_url?: string | null,
  video_url?: string | null,
  created_at: number,
  updated_at?: number | null,
};

export enum MESSAGETYPE {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}


export type Member = {
  __typename: "Member",
  user_id: string,
  role: ROLE,
};

export enum ROLE {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}


export type CreateMessageInput = {
  user_id: string,
  group_id: string,
  message_type: MESSAGETYPE,
  message_content?: string | null,
  image_url?: string | null,
  video_url?: string | null,
};

export type CreateTypingInput = {
  user_id: string,
  group_id: string,
  typing: boolean,
};

export type Typing = {
  __typename: "Typing",
  id: string,
  user_id: string,
  group_id: string,
  typing: boolean,
};

export type GroupMessagesResult = {
  __typename: "GroupMessagesResult",
  items:  Array<Message >,
};

export type GroupsResult = {
  __typename: "GroupsResult",
  items:  Array<Group >,
};

export type UsersResult = {
  __typename: "UsersResult",
  items:  Array<User >,
};

export type CreateUserAccountMutationVariables = {
  userInput: CreateUserInput,
};

export type CreateUserAccountMutation = {
  createUserAccount:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    profile_pic_url?: string | null,
    created_at: number,
    updated_at?: number | null,
  },
};

export type CreateGroupMutationVariables = {
  input: CreateGroupInput,
};

export type CreateGroupMutation = {
  createGroup:  {
    __typename: "Group",
    id: string,
    group_name: string,
    creator_id: string,
    group_description: string,
    last_message?:  {
      __typename: "Message",
      id: string,
      user_id: string,
      group_id: string,
      message_type: MESSAGETYPE,
      message_content?: string | null,
      image_url?: string | null,
      video_url?: string | null,
      created_at: number,
      updated_at?: number | null,
    } | null,
    group_url?: string | null,
    created_at: number,
    members:  Array< {
      __typename: "Member",
      user_id: string,
      role: ROLE,
    } >,
    messages?:  Array< {
      __typename: "Message",
      id: string,
      user_id: string,
      group_id: string,
      message_type: MESSAGETYPE,
      message_content?: string | null,
      image_url?: string | null,
      video_url?: string | null,
      created_at: number,
      updated_at?: number | null,
    } > | null,
    updated_at?: number | null,
  },
};

export type AddGroupParticipantMutationVariables = {
  group_id: string,
  user_id: string,
  role: string,
};

export type AddGroupParticipantMutation = {
  addGroupParticipant: string,
};

export type SendGroupMessageMutationVariables = {
  input: CreateMessageInput,
};

export type SendGroupMessageMutation = {
  sendGroupMessage:  {
    __typename: "Message",
    id: string,
    user_id: string,
    group_id: string,
    message_type: MESSAGETYPE,
    message_content?: string | null,
    image_url?: string | null,
    video_url?: string | null,
    created_at: number,
    updated_at?: number | null,
  },
};

export type AddTypingIndicatorMutationVariables = {
  input: CreateTypingInput,
};

export type AddTypingIndicatorMutation = {
  addTypingIndicator:  {
    __typename: "Typing",
    id: string,
    user_id: string,
    group_id: string,
    typing: boolean,
  },
};

export type GetUserAccountQueryVariables = {
  user_id: string,
};

export type GetUserAccountQuery = {
  getUserAccount:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    profile_pic_url?: string | null,
    created_at: number,
    updated_at?: number | null,
  },
};

export type GetGroupQueryVariables = {
  group_id: string,
};

export type GetGroupQuery = {
  getGroup:  {
    __typename: "Group",
    id: string,
    group_name: string,
    creator_id: string,
    group_description: string,
    last_message?:  {
      __typename: "Message",
      id: string,
      user_id: string,
      group_id: string,
      message_type: MESSAGETYPE,
      message_content?: string | null,
      image_url?: string | null,
      video_url?: string | null,
      created_at: number,
      updated_at?: number | null,
    } | null,
    group_url?: string | null,
    created_at: number,
    members:  Array< {
      __typename: "Member",
      user_id: string,
      role: ROLE,
    } >,
    messages?:  Array< {
      __typename: "Message",
      id: string,
      user_id: string,
      group_id: string,
      message_type: MESSAGETYPE,
      message_content?: string | null,
      image_url?: string | null,
      video_url?: string | null,
      created_at: number,
      updated_at?: number | null,
    } > | null,
    updated_at?: number | null,
  },
};

export type GetGroupMessagesQueryVariables = {
  group_id: string,
};

export type GetGroupMessagesQuery = {
  getGroupMessages:  {
    __typename: "GroupMessagesResult",
    items:  Array< {
      __typename: "Message",
      id: string,
      user_id: string,
      group_id: string,
      message_type: MESSAGETYPE,
      message_content?: string | null,
      image_url?: string | null,
      video_url?: string | null,
      created_at: number,
      updated_at?: number | null,
    } >,
  },
};

export type GetGroupsQueryVariables = {
  token?: string | null,
  limit: number,
};

export type GetGroupsQuery = {
  getGroups:  {
    __typename: "GroupsResult",
    items:  Array< {
      __typename: "Group",
      id: string,
      group_name: string,
      creator_id: string,
      group_description: string,
      group_url?: string | null,
      created_at: number,
      updated_at?: number | null,
    } >,
  },
};

export type GetUsersQueryVariables = {
};

export type GetUsersQuery = {
  getUsers:  {
    __typename: "UsersResult",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      profile_pic_url?: string | null,
      created_at: number,
      updated_at?: number | null,
    } >,
  },
};

export type OnCreateMessagesSubscriptionVariables = {
};

export type OnCreateMessagesSubscription = {
  onCreateMessages?:  {
    __typename: "Message",
    id: string,
    user_id: string,
    group_id: string,
    message_type: MESSAGETYPE,
    message_content?: string | null,
    image_url?: string | null,
    video_url?: string | null,
    created_at: number,
    updated_at?: number | null,
  } | null,
};

export type OnAddingTypingIndicatorSubscriptionVariables = {
};

export type OnAddingTypingIndicatorSubscription = {
  onAddingTypingIndicator?:  {
    __typename: "Typing",
    id: string,
    user_id: string,
    group_id: string,
    typing: boolean,
  } | null,
};
