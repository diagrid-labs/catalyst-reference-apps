<template>
  <div class="flex items-center hover:bg-light hover:cursor-pointer px-8">
    <div class="flex-shrink-0 mr-3 py-4">
      <div class="relative">
        <img
          class="w-11 h-11 rounded-full"
          :src="user?.profile_pic_url"
          alt=""
        />
      </div>
    </div>
    <div class="w-full h-full py-4">
      <div class="text-gray-200 flex items-center justify-between">
        <div class="text-[16px] font-semibold">
          {{ user?.username }} <span v-if="role === 'ADMIN'">(Admin)</span>
        </div>
      </div>
      <div class="text-gray-200 flex items-center justify-between">
        <div class="text-sm text-text-primary">{{ user?.email }}</div>
        <div class="text-sm text-text-primary"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  user_id: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
const store = useAuthStore();
const user: any = ref({
  username: "Username",
  profile_pic_url: "/profile.webp",
  email: "example@gmail.com",
});

onMounted(async () => {
  const result = await store.getUser(props.user_id);
  user.value = result.result;
});
</script>
