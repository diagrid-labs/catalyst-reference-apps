<script setup lang="ts">
const isOpen = ref(false);
const store = useAuthStore();
const groupStore = useGroupStore();

const props = defineProps({
  location: {
    type: String,
    required: true,
  },
});

const showModal = () => {
  isOpen.value = !isOpen.value;
};

const handleDelete = async () => {
  if (props.location === "profile") {
    const { data, error } = await useAsyncData("group", () =>
      store.deleteAccount("values").then(() => {})
    );
  } else {
    const { data, error } = await useAsyncData("group", () =>
      groupStore.deleteGroup("values").then(() => {})
    );
  }
};

defineExpose({ showModal });
</script>

<template>
  <div>
    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100',
        }"
        class="bg-deep rounded"
      >
        <div class="relative text-center bg-transparent rounded-lg shadow">
          <button
            type="button"
            class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            @click="isOpen = !isOpen"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <svg
            class="text-gray-400 w-11 h-11 mb-3.5 mx-auto"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p class="mb-4 text-gray-500">
            Are you sure you want to delete
            <span v-if="location == 'profile'">your account</span
            ><span v-else>this group</span>?
          </p>
          <div class="flex justify-center items-center space-x-4">
            <button
              type="button"
              class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
              @click="isOpen = !isOpen"
            >
              No, cancel
            </button>
            <button
              type="submit"
              class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
              @click="handleDelete()"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
