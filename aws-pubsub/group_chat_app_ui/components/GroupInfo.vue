<template>
  <div
    :class="screenStore.showGroupInfo ? 'w-full' : 'w-0'"
    class="absolute bg-deeper right-0 top-0 h-full lg:max-w-[35vw] transition-all ease-in-out duration-700"
  >
    <div
      class="relative w-full overflow-hidden transition-all ease-in-out duration-700 h-full pb-10 pt-4"
    >
      <div class="px-3 absolute bg-deep top-0 py-5 inset-x-0 z-[105]">
        <div class="w-full flex justify-between px-3">
          <div class="flex items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 text-gray-300 mr-5 hover:cursor-pointer"
                viewBox="0 0 24 24"
                @click="screenStore.setShowGroupInfo(false)"
              >
                <path
                  fill="currentColor"
                  d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"
                />
              </svg>
            </div>
            <div><p class="text-gray-50">Group info</p></div>
          </div>
          <div v-if="group?.creator_id == user?.id">
            <button
              type="button"
              class="outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
              @click="showUpdate()"
            >
              Edit
            </button>
            <button
              type="button"
              class="outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
              @click="showDelete()"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div
        class="w-full mt-[3rem] pt-2 h-full overflow-y-auto overflow-x-hidden sidebar"
      >
        <div class="w-full bg-deep flex justify-center px-8 pt-4">
          <div class="flex-shrink-0">
            <img
              class="w-32 h-32 md:w-40 md:h-40 rounded-full"
              :src="group?.group_url"
              alt=""
            />
          </div>
        </div>

        <div class="w-full bg-deep pt-2 pb-8 space-y-5 px-8">
          <div class="w-full">
            <div class="relative mt-4 text-gray-300 font-semibold text-center">
              {{ group?.group_name }}
            </div>
          </div>
        </div>

        <div class="w-full bg-deep pb-8 mt-3">
          <div
            class="px-8 flex justify-between pt-5 pb-4 text-gray-50 font-semibold"
          >
            <div>Group Members</div>
            <button class="text-gray-400" @click="showAdd()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11 13v3q0 .425.288.713T12 17t.713-.288T13 16v-3h3q.425 0 .713-.288T17 12t-.288-.712T16 11h-3V8q0-.425-.288-.712T12 7t-.712.288T11 8v3H8q-.425 0-.712.288T7 12t.288.713T8 13zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                />
              </svg>
            </button>
            <!-- <button
            type="button"
            class="focus:outline-none text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
          >
            Add member
          </button> -->
          </div>
          <div class="">
            <GroupMembers
              v-for="user of group?.members"
              :key="user.user_id"
              :user_id="user.user_id"
              :role="user.role"
            />
          </div>
        </div>
      </div>
      <Delete ref="del" location="group" :id="groupId" />
    </div>
    <CreateEditChatGroup ref="update" action="update" :id="groupId" />
    <AddUserToGroup ref="add" :users="newUsers" />
  </div>
</template>

<script setup lang="ts">
import Delete from "./Delete.vue";
import CreateEditChatGroup from "./CreateEditChatGroup.vue";
import AddUserToGroup from "./AddUserToGroup.vue";
const auth = useAuthStore();
const store = useGroupStore();
const screenStore = useScreenStore();
const del = ref();
const add = ref();
const update = ref();
const groupId = useRoute().params.groupId as string;
const group = computed(() => store.group);
const user: any = ref(null);
const users = computed(() => auth.users);
const newUsers = ref<any>([]);

watch(
  () => group.value,
  () => {
    filterMembers();
  }
);

onMounted(async () => {
  const result = await store.getUserGroup(groupId);
  const userList = await auth.listUsers();
  if (process.client) {
    const currentUser = localStorage.getItem("group_chat_user");
    if (currentUser != null) {
      user.value = JSON.parse(currentUser);
    }
  }
  filterMembers();
});

const filterMembers = () => {
  newUsers.value = [];
  for (const user of users.value) {
    const index = group.value?.members.findIndex(
      (el: any) => el.user_id === user.id
    );
    if (index === -1) {
      newUsers.value.push(user);
    }
  }
};

const showDelete = () => {
  del.value.showModal();
};
const showUpdate = () => {
  update.value.showModal();
};
const showAdd = () => {
  add.value.showModal();
};
</script>
