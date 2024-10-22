<template>
  <div class="flex items-center hover:bg-light hover:cursor-pointer px-3">
    <div class="flex-shrink-0 mr-3 py-4">
      <div class="relative">
        <img
          class="w-11 h-11 rounded-full"
          :src="user?.profile_pic_url"
          alt=""
        />
      </div>
    </div>
    <div class="w-full h-full py-4 flex items-center justify-between">
      <div class="text-gray-200">
        <div class="text-[16px] font-semibold">
          <p>{{ user?.username }}</p>
        </div>
        <div class="text-sm text-text-primary">
          {{ user?.email }}
        </div>
      </div>
      <div class="text-gray-200">
        <button
          type="button"
          :disabled="pending"
          class="outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
          @click="addUser()"
        >
          <span v-if="pending"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
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
              </g></svg
          ></span>
          <span v-else>Add</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const pending = ref(false);
const emits = defineEmits(["close-modal"]);

const store = useGroupStore();
const group_id = useRoute().params.groupId as string;

const addUser = async () => {
  pending.value = true;
  await store
    .addUserToGroup({
      user_id: props.user.id,
      group_id,
      role: "MEMBER",
    })
    .then(() => {
      pending.value = false;
      emits("close-modal");
    });
};
</script>
