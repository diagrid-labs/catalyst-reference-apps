<template>
  <div class="bg-light h-16 px-2 md:px-4 absolute top-0 w-full">
    <div class="flex items-center">
      <div class="flex-shrink-0 mr-3 py-3 flex items-center">
        <NuxtLink to="/dashboard" class="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 mr-1 text-gray-300 hover:cursor-pointer"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
            />
          </svg>
        </NuxtLink>
        <div
          class="relative hover:cursor-pointer"
          @click="screenStore.setShowGroupInfo(true)"
        >
          <img class="w-10 h-10 rounded-full" :src="group?.group_url" alt="" />
        </div>
      </div>
      <div class="w-full py-3 flex gap-4 items-center justify-between">
        <div
          class="text-gray-200 hover:cursor-pointer w-full"
          @click="screenStore.setShowGroupInfo(true)"
        >
          <div class="text-[14px] font-semibold">{{ group?.group_name }}</div>
          <div class="text-sm font-light text-text-primary">
            <span
              v-if="typing?.status && typing?.id !== user?.id"
              class="text-violet-500"
              >typing...</span
            >
            <span v-else> tap for group info</span>
          </div>
        </div>
        <button class="text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="3"
              d="M12 6h.01M12 12h.01M12 18h.01"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const screenStore = useScreenStore();
const store = useGroupStore();
const typing = computed(() => store.typingIndicatore);
const groupId = useRoute().params.groupId as string;
const user: any = ref(null);
const group: any = ref({
  group_name: "Group name",
  group_url: "/profile.webp",
});

onMounted(async () => {
  if (process.client) {
    const currentUser = localStorage.getItem("group_chat_user");
    if (currentUser != null) {
      user.value = JSON.parse(currentUser);
    }
  }

  const result = await store.getUserGroup(groupId);
  group.value = result.result;
  await store.typingIndicatorSubscribe();
});
</script>
