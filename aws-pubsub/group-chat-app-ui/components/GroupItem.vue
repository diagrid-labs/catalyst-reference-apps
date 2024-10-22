<template>
  <NuxtLink
    :to="`/chat/${group.id}`"
    class="flex items-center px-4 hover:bg-light hover:cursor-pointer"
  >
    <div class="flex-shrink-0 mr-3 py-3">
      <div class="relative">
        <img class="w-12 h-12 rounded-full" :src="group.group_url" alt="" />
      </div>
    </div>
    <div class="w-full py-3 border-t border-light">
      <div class="text-gray-200 flex items-center justify-between">
        <div class="text-[16px] font-semibold">{{ group.group_name }}</div>
        <!-- <div class="text-text-primary text-xs">8:01 AM</div> -->
      </div>
      <div class="text-gray-200 flex items-center justify-between">
        <div class="text-sm text-text-primary">messages</div>
        <!-- <div
          class="bg-primary rounded-full h-[1.4rem] w-[1.4rem] flex justify-center items-center text-gray-300"
        >
          <p class="text-[13px]">10</p>
        </div> -->
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
});
</script>
