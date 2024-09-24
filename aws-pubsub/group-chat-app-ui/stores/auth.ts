// Dependencies ===============
import { type CreateUserInput } from "~/src/types/amplify";
import { uploadData } from "aws-amplify/storage";
import { createUserAccount } from "~/src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getUserAccount, getUsers } from "~/src/graphql/queries";
export const useAuthStore = defineStore("auth", () => {
  // State =====================
  const client = generateClient();
  const users = ref<any>([]);
  // const users = ref<any>([
  //   {
  //     id: "2lsgXjazocjQbqOWXYmaX1mmEmB",
  //     username: "Rosius1",
  //     email: "treyrosius@gmail.com",
  //     profile_pic_url:
  //       "https://catalystgroupchatappe1ee8-dev.s3.amazonaws.com/public/users/group_chat_profile_d85ff0e4-3b2a-4772-b865-775aed26f7a1.png",
  //     created_at: 1725974239,
  //     updated_at: 1725974239,
  //     __typename: "User",
  //   },
  //   {
  //     id: "2lshFEeV5aG9rg1DEokptOKXupG",
  //     username: "Rosius2",
  //     email: "treyrosius@gmail.com",
  //     profile_pic_url:
  //       "https://catalystgroupchatappe1ee8-dev.s3.amazonaws.com/public/users/group_chat_profile_957b9ea8-08c4-4780-b83b-f9806a3c4a46.png",
  //     created_at: 1725974585,
  //     updated_at: 1725974585,
  //     __typename: "User",
  //   },
  //   {
  //     id: "2lshLZocQ095uEgQrtKHCt1rkjr",
  //     username: "Rosius3",
  //     email: "treyrosius@gmail.com",
  //     profile_pic_url:
  //       "https://catalystgroupchatappe1ee8-dev.s3.amazonaws.com/public/users/group_chat_profile_2df1055a-6c90-4523-8dd1-3f2a25edc091.png",
  //     created_at: 1725974635,
  //     updated_at: 1725974635,
  //     __typename: "User",
  //   },
  //   {
  //     id: "2lshS3twmXRpaL5v0xRlBzHMBSV",
  //     username: "Rosius4",
  //     email: "treyrosius@gmail.com",
  //     profile_pic_url:
  //       "https://catalystgroupchatappe1ee8-dev.s3.amazonaws.com/public/users/group_chat_profile_40498488-988b-461f-908e-e86ca3b7925e.png",
  //     created_at: 1725974687,
  //     updated_at: 1725974687,
  //     __typename: "User",
  //   },
  //   {
  //     id: "2lshaLAiadi2TOPQ4blDHr8NIlc",
  //     username: "Rosius5",
  //     email: "treyrosius@gmail.com",
  //     profile_pic_url:
  //       "https://catalystgroupchatappe1ee8-dev.s3.amazonaws.com/public/users/group_chat_profile_792dcf2d-f827-4318-aef8-157883ff8564.png",
  //     created_at: 1725974753,
  //     updated_at: 1725974753,
  //     __typename: "User",
  //   },
  //   {
  //     id: "2lsh3F9jUaQlqlQoxACT79d2pda",
  //     username: "ro",
  //     email: "treyrosius@gmail.com",
  //     profile_pic_url:
  //       "https://catalystgroupchatappe1ee8-dev.s3.amazonaws.com/public/users/group_chat_profile_b5410c33-67ec-40db-9696-730f1cc87c0a.png",
  //     created_at: 1725974489,
  //     updated_at: 1725974489,
  //     __typename: "User",
  //   },
  //   {
  //     id: "2lp5bFRthncU8Twaeshr1abZyI4",
  //     username: "wdnjda dkjas dj",
  //     email: "kongbizion3@gmail.com",
  //     profile_pic_url:
  //       "https://catalystgroupchatappe1ee8-dev.s3.amazonaws.com/public/users/group_chat_profile_95b4cbd9-720c-40a9-a3e3-4db4ea76769b.png",
  //     created_at: 1725864246,
  //     updated_at: 1725864246,
  //     __typename: "User",
  //   },
  // ]);

  // Actions ====================
  const createUser = async (user: CreateUserInput, image: File | string) => {
    try {
      let result;
      if (typeof image === "string" || image instanceof String) {
        result = await client.graphql({
          query: createUserAccount,
          variables: {
            userInput: {
              username: user.username,
              email: user.email,
              profile_pic_url: image as string,
            },
          },
        });
      } else {
        await uploadData({
          path: `public/users/${image.name}`,
          data: image,
          options: {
            useAccelerateEndpoint: true,
          },
        }).result;
        result = await client.graphql({
          query: createUserAccount,
          variables: {
            userInput: {
              username: user.username,
              email: user.email,
              profile_pic_url: `https://catalystgroupchatappe1ee8-dev.s3.amazonaws.com/public/users/${image.name}`,
            },
          },
        });
      }

      localStorage.setItem(
        "group_chat_user",
        JSON.stringify(result.data.createUserAccount)
      );
      // console.log(
      //   "result.data.createUserAccount",
      //   result.data.createUserAccount
      // );

      return { success: true, user: result.data.createUserAccount };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  const getUser = async (user_id: string) => {
    try {
      const group = await client.graphql({
        query: getUserAccount,
        variables: {
          user_id,
        },
      });
      return { success: true, result: group.data.getUserAccount };
    } catch (error) {
      return { success: false, result: error };
    }
  };

  const listUsers = async () => {
    // users.value = [];
    try {
      const result = await client.graphql({
        query: getUsers,
        variables: {},
      });
      users.value = result.data.getUsers.items;
      return { success: true, result: result.data.getUsers.items };
    } catch (error) {
      // console.log("data: ", error);
      return { success: false, result: error };
    }
  };
  const deleteAccount = async (value: any) => {
    console.log("values", value);
  };
  return {
    users,
    listUsers,
    getUser,
    createUser,
    deleteAccount,
  };
});
