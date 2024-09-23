<template>
  <div
    ref="el"
    class="px-4 :px-8 pb-24 -mt-4 no-scrollbar h-full overflow-y-auto"
  >
    <div v-if="messages.length != 0">
      <div v-for="message of messages" :key="message?.id" class="pt-5">
        <RightChat
          v-if="user?.id === message?.user_id"
          :message="message"
          :lastMessage="
            messages[messages.length - 1]?.user_id == message?.user_id
              ? true
              : false
          "
        /><LeftChat
          v-else
          :message="message"
          :lastMessage="
            messages[messages.length - 1]?.user_id == message?.user_id
              ? true
              : false
          "
        />
      </div>
    </div>
    <div
      v-else
      class="h-full w-full relative transition-all ease-in-out duration-700"
    >
      <div class="h-full w-full pt-20 flex justify-center items-center">
        <div class="-mt-32 text-gray-300">
          <p v-if="pending" class="flex gap-1 items-center">
            Loading
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle cx="4" cy="12" r="3" fill="#888888">
                <animate
                  id="svgSpinners3DotsFade0"
                  fill="freeze"
                  attributeName="opacity"
                  begin="0;svgSpinners3DotsFade1.end-0.25s"
                  dur="0.75s"
                  values="1;.2"
                />
              </circle>
              <circle cx="12" cy="12" r="3" fill="#888888" opacity=".4">
                <animate
                  fill="freeze"
                  attributeName="opacity"
                  begin="svgSpinners3DotsFade0.begin+0.15s"
                  dur="0.75s"
                  values="1;.2"
                />
              </circle>
              <circle cx="20" cy="12" r="3" fill="#888888" opacity=".3">
                <animate
                  id="svgSpinners3DotsFade1"
                  fill="freeze"
                  attributeName="opacity"
                  begin="svgSpinners3DotsFade0.begin+0.3s"
                  dur="0.75s"
                  values="1;.2"
                />
              </circle>
            </svg>
          </p>
          <p v-else>It's empty here!</p>
        </div>
      </div>
    </div>

    <div id="scroller" ref="scroller" class="py-20 h-5 w-full"></div>
  </div>
</template>
<script setup lang="ts">
const store = useGroupStore();
const group_id = useRoute().params.groupId as string;
const messages = computed(() => store.groupMessages);
const user: any = ref(null);
const scroller = ref();
const pending = ref(true);

onMounted(async () => {
  if (process.client) {
    const currentUser = localStorage.getItem("group_chat_user");
    if (currentUser != null) {
      user.value = JSON.parse(currentUser);
    }
  }
  if (group_id) {
    await store.listGroupMessages(group_id).then(() => scrollToBottom());
  }
});

const scrollToBottom = async () => {
  pending.value = false;
  if (!scroller.value) return;
  scroller.value.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
};
</script>
