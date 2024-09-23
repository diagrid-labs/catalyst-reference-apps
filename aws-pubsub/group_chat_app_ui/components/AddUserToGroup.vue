<script setup lang="ts">
import * as yup from "yup";
import AddUser from "./AddUser.vue";

const props = defineProps({
  users: { type: Array<any>, required: true },
});

const schema = yup.object({
  name: yup.string().required("Required!"),
  description: yup.string().required("Required!"),
});

const isOpen = ref(false);
const isLoading = ref(false);
const store = useGroupStore();
const initialValues: any = {
  // name: "",
  // description: "",
};

const showModal = () => {
  isOpen.value = !isOpen.value;
};

const handleSubmit = async (values: any) => {
  // const { data, error } = await useAsyncData("group", () =>
  //   store.createGroup(values).then(() => {})
  // );
};

defineExpose({ showModal });
</script>

<template>
  <div class="mx-4">
    <UModal v-model="isOpen">
      <UCard
        :ui="{
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
        class="bg-deep rounded border-0"
      >
        <div class="relative w-full h-full max-h-[100vh] pt-4">
          <div class="absolute top-0 pt-4 inset-x-0 z-[105]">
            <div class="w-full flex justify-between px-3">
              <div>
                <p class="text-gray-50 font-bold text-xl">Add member</p>
              </div>
            </div>

            <div class="relative pt-5">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pt-[22px] pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                class="block w-full px-4 pb-4 pt-3.5 ps-12 pr-11 h-10 outline-none text-gray-300 text-sm rounded-lg bg-light"
                placeholder="Search"
                required
              />
              <!-- <button
                type="submit"
                class="text-gray-400 hidden absolute end-2.5 top-[1.7rem] bottom-2.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 13.4l-2.9 2.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l2.9-2.9l-2.9-2.875q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l2.9 2.9l2.875-2.9q.275-.275.7-.275t.7.275q.3.3.3.713t-.3.687L13.375 12l2.9 2.9q.275.275.275.7t-.275.7q-.3.3-.712.3t-.688-.3z"
                  />
                </svg>
              </button>
              <button
                type="submit"
                class="text-gray-400 absolute end-4 top-[1.9rem] bottom-2.5"
              >
                <svg
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
                  </g>
                </svg>
              </button> -->
            </div>
          </div>

          <div
            class="w-full mt-[5.5rem] pt-5 overflow-y-auto overflow-x-hidden sidebar"
          >
            <AddUser
              v-for="user in users"
              :key="user.id"
              :user="user"
              @close-modal="showModal"
            />
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
