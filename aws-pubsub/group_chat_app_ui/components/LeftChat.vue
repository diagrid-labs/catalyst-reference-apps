<template>
  <div :id="message.id" class="w-full pt-6">
    <div class="flex items-start gap-2.5">
      <img class="w-8 h-8 rounded-full" :src="user?.profile_pic_url" alt="" />
      <div class="flex flex-col gap-1 w-full max-w-[70%] md:max-w-[60%]">
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-300">{{
            user?.username
          }}</span>
          <!-- <span class="text-sm font-normal text-gray-500">11:46 pm</span> -->
        </div>
        <div
          class="flex flex-col leading-1.5 p-4 border-gray-200 bg-violet-500 w-fit rounded-e-md rounded-es-md"
        >
          <p class="text-sm font-normal text-gray-200">
            {{ message.message_content }}
          </p>
        </div>
        <!-- <div
          class="flex flex-col leading-1.5 p-4 border-gray-200 w-fit bg-violet-500 rounded-md"
        >
          <p class="text-sm font-normal text-gray-200">
            That's awesome. I think our users will really appreciate the
            improvements.
          </p>
        </div> -->
        <!-- <span class="text-sm font-normal text-gray-500">Delivered</span> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  lastMessage: {
    type: Boolean,
  },
});
const store = useAuthStore();
const user: any = ref({
  username: "Username",
  profile_pic_url: "/profile.webp",
  email: "example@gmail.com",
});

onMounted(async () => {
  const result = await store.getUser(props.message.user_id);
  user.value = result.result;

  if (process.client) {
    if (props.message?.synced) {
      document.getElementById("scroller")?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }
});
</script>
