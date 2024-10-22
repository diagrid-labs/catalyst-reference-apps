<template>
  <div
    class="bg-light min-h-16 absolute bottom-0 w-full px-4 py-3 flex items-center"
  >
    <div class="w-full flex gap-3 items-center h-full">
      <div class="h-full min-w-5 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          class="text-gray-500"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"
          />
        </svg>
      </div>

      <div class="w-full">
        <textarea
          id="message_content"
          name="message_content"
          v-model="message_content"
          @input="debouncedSearch"
          @focus="updateTyping(true)"
          class="outline-none bg-[#2a3942] text-gray-300 text-sm rounded-md block w-full px-2.5 pt-2.5"
          placeholder="Type a message"
        ></textarea>
      </div>
      <div
        v-if="message_content"
        class="h-full min-w-5 flex justify-center items-center"
      >
        <svg
          v-if="!pending"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          class="text-gray-500 hover:cursor-pointer"
          viewBox="0 0 24 24"
          :disabled="pending"
          @click="handleSendMessage()"
        >
          <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="text-gray-300 h-6"
        >
          <g stroke="currentColor">
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="none"
              stroke-linecap="round"
              stroke-width="3"
            >
              <animate
                attributeName="stroke-dasharray"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                keyTimes="0;0.475;0.95;1"
                repeatCount="indefinite"
                values="0 150;42 150;42 150;42 150"
              />
              <animate
                attributeName="stroke-dashoffset"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                keyTimes="0;0.475;0.95;1"
                repeatCount="indefinite"
                values="0;-16;-59;-59"
              />
            </circle>
            <animateTransform
              attributeName="transform"
              dur="2s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MESSAGETYPE } from "~/src/types/amplify";

const message_content = ref("");
const group_id = useRoute().params.groupId as string;
const user: any = ref(null);
const pending = ref(false);
const timeout: any = ref(null);

onMounted(async () => {
  if (process.client) {
    const currentUser = localStorage.getItem("group_chat_user");
    if (currentUser != null) {
      user.value = JSON.parse(currentUser);
    }
  }
  await store.messagesSubscribe();
});
const store = useGroupStore();

const debouncedSearch = () => {
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    if (!message_content) updateTyping(false);
  }, 20000);
};

const updateTyping = async (value: Boolean) => {
  const info = {
    user_id: user.value.id,
    group_id,
    typing: value,
  };
  // console.log("info", info);
  await store.setTyping({
    user_id: user.value.id,
    group_id,
    typing: value,
  });
};

const handleSendMessage = async () => {
  pending.value = true;
  await store
    .sendMessage({
      user_id: user.value?.id,
      group_id,
      message_type: MESSAGETYPE.TEXT,
      message_content: message_content.value,
    })
    .then((sendMessageResult) => {
      pending.value = false;
      if (sendMessageResult.success) {
        message_content.value = "";
        updateTyping(false);
      }
    });
};
</script>
