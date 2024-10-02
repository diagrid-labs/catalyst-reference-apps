/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateMessages = /* GraphQL */ `subscription OnCreateMessages {
  onCreateMessages {
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
` as GeneratedSubscription<
  APITypes.OnCreateMessagesSubscriptionVariables,
  APITypes.OnCreateMessagesSubscription
>;
export const onAddingTypingIndicator = /* GraphQL */ `subscription OnAddingTypingIndicator {
  onAddingTypingIndicator {
    id
    user_id
    group_id
    typing
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnAddingTypingIndicatorSubscriptionVariables,
  APITypes.OnAddingTypingIndicatorSubscription
>;
