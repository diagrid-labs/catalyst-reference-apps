// Dependencies ===============
import { defineStore } from "pinia";
import { generateClient } from "aws-amplify/api";
import { uploadData } from "aws-amplify/storage";
import { type CreateGroupInput } from "~/src/types/amplify";
import {
  addGroupParticipant,
  addTypingIndicator,
  createGroup,
  sendGroupMessage,
} from "~/src/graphql/mutations";
import {
  getGroups,
  getGroup,
  getGroupMessages,
  getUserAccount,
} from "~/src/graphql/queries";
import {
  onAddingTypingIndicator,
  onCreateMessages,
} from "~/src/graphql/subscriptions";
export const useGroupStore = defineStore("group", () => {
  // State =====================
  const client = generateClient();
  const groups: any = ref([
    {
      id: "2mtnDVXGNYiKhBUjdMZWLAbPcDK",
      group_name: "Catalyst group 5",
      creator_id: "2mtjFe2fzhfYHnqSC4OlRX2UZRv",
      group_description: "Catalyst application",
      last_message: null,
      group_url: "/profile.webp",
      created_at: 1727904620,
      members: [
        {
          user_id: "2mtjFe2fzhfYHnqSC4OlRX2UZRv",
          role: "ADMIN",
          __typename: "Member",
        },
      ],
      messages: [],
      updated_at: null,
      __typename: "Group",
    },
    {
      id: "2mtnNNHms0oWL30mL4zHttzllyg",
      group_name: "launch celebration chat",
      creator_id: "2mtjFe2fzhfYHnqSC4OlRX2UZRv",
      group_description: "Launch Celebration Chat",
      last_message: null,
      group_url: "/profile.webp",
      created_at: 1727904698,
      members: [
        {
          user_id: "2mtjFe2fzhfYHnqSC4OlRX2UZRv",
          role: "ADMIN",
          __typename: "Member",
        },
      ],
      messages: [],
      updated_at: null,
      __typename: "Group",
    },
  ]);
  const groupMessages = ref<any>([]);
  const typingIndicatore = ref<any>({ id: "", status: false });
  const group = ref<any>({
    group_name: "Group name",
    group_url: "/profile.webp",
  });

  // Actions ====================
  const createUserGroup = async (
    group: CreateGroupInput,
    image: File | string
  ) => {
    try {
      let result;
      if (typeof image === "string" || image instanceof String) {
        result = await client.graphql({
          query: createGroup,
          variables: {
            input: {
              group_name: group.group_name,
              creator_id: group.creator_id,
              group_description: group.group_description,
              group_url: image as string,
            },
          },
        });
      } else {
        await uploadData({
          path: `public/groups/${image.name}`,
          data: image,
          options: {
            useAccelerateEndpoint: true,
          },
        }).result;
        result = await client.graphql({
          query: createGroup,
          variables: {
            input: {
              group_name: group.group_name,
              creator_id: group.creator_id,
              group_description: group.group_description,
              group_url: `http://groupchatappui637f5aee4a1a423ca744782861324eeacd7ce-dev.s3-website-us-east-1.amazonaws.com/public/groups/${image.name}`,
            },
          },
        });
      }

      console.log("group: ", result?.data.createGroup);

      return { success: true, group: result?.data.createGroup };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  const listUserGroup = async () => {
    try {
      // console.log("groups============ ooooo");
      const groups = await client.graphql({
        query: getGroups,
        variables: {
          token: null,
          limit: 10,
        },
      });

      // console.log("groups: ", groups);
    } catch (error) {
      // console.log("error: ", error);
    }
  };

  const deleteGroup = async (value: any) => {
    console.log("values", value);
  };

  const getUserGroup = async (groupId: string) => {
    try {
      const gp = await client.graphql({
        query: getGroup,
        variables: {
          group_id: groupId,
        },
      });
      group.value = gp.data.getGroup;
      return { success: true, result: gp.data.getGroup };
    } catch (error) {
      return { success: false, result: error };
    }
  };

  const sendMessage = async (messageInfo: any) => {
    try {
      const result = await client.graphql({
        query: sendGroupMessage,
        variables: {
          input: messageInfo,
        },
      });
      return { success: true, result: result.data.sendGroupMessage };
    } catch (error) {
      return { success: false, result: error };
    }
  };

  const setTyping = async (values: any) => {
    try {
      const result = await client.graphql({
        query: addTypingIndicator,
        variables: {
          input: {
            user_id: values.user_id,
            group_id: values.group_id,
            typing: values.typing,
          },
        },
      });
      return { success: true, result: result.data.addTypingIndicator };
    } catch (error) {
      console.log("error: ", error);
      return { success: false, result: error };
    }
  };

  const addUserToGroup = async (values: any) => {
    try {
      const result = await client.graphql({
        query: addGroupParticipant,
        variables: values,
      });
      await getUserGroup(values.group_id);
      return { success: true, result: result.data.addGroupParticipant };
    } catch (error) {
      console.log("error: ", error);
      return { success: false, result: error };
    }
  };

  const listGroupMessages = async (group_id: string) => {
    try {
      groupMessages.value = [];
      const msg = await client.graphql({
        query: getGroupMessages,
        variables: {
          group_id: group_id,
        },
      });
      groupMessages.value = msg.data.getGroupMessages.items;
      return { success: true, result: msg.data.getGroupMessages.items };
    } catch (error) {
      return { success: false, result: error };
    }
  };

  const messagesSubscribe = async () => {
    client
      .graphql({
        query: onCreateMessages,
      })
      .subscribe({
        next: ({ data }) => {
          const newData = data.onCreateMessages;

          const new_object = {
            __typename: "Message",
            id: newData.id,
            user_id: newData.user_id,
            group_id: newData.group_id,
            message_type: newData.message_type,
            message_content: newData.message_content,
            synced: true,
          };

          const index = groupMessages.value.findIndex(
            (el: any) => el.id === new_object.id
          );

          if (index === -1) {
            groupMessages.value.push(new_object);
          }
        },
        error: (error) => console.warn("==== errr", error),
      });
  };

  const typingIndicatorSubscribe = async () => {
    client
      .graphql({
        query: onAddingTypingIndicator,
      })
      .subscribe({
        next: async ({ data }) => {
          console.log("data", data);
          const info = data.onAddingTypingIndicator;

          // const user = await client.graphql({
          //   query: getUserAccount,
          //   variables: {
          //     user_id: info.user_id,
          //   },
          // });

          // typingIndicatore.value = {
          //   username: user.data.getUserAccount.username,
          //   group_id: info.group_id,
          //   __typename: info.__typename,
          //   typing: info.typing,
          //   user_id: info.user_id,
          //   id: info.id,
          // };

          typingIndicatore.value = { id: info.user_id, status: info.typing };

          // console.log("data222222", typingIndicatore.value);
        },
        error: (error) => console.warn("errr", error),
      });
  };

  return {
    groups,
    group,
    groupMessages,
    typingIndicatore,
    addUserToGroup,
    setTyping,
    listUserGroup,
    createUserGroup,
    deleteGroup,
    getUserGroup,
    sendMessage,
    listGroupMessages,
    messagesSubscribe,
    typingIndicatorSubscribe,
  };
});
