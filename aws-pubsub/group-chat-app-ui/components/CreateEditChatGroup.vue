<template>
  <div class="mx-4">
    <UModal v-model="isOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
        class="bg-deep rounded"
      >
        <div
          class="text-gray-300 font-bold text-lg flex items-center justify-end"
        >
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1 text-gray-300 hover:bg-deep hover:text-white"
            @click="isOpen = false"
          />
        </div>

        <div class="text-center text-gray-300 font-bold mb-6 -mt-2 text-lg">
          <p v-if="action == 'add'">Create group</p>
          <p v-else>Update group</p>
        </div>

        <Form
          v-slot="{ errors }"
          :initial-values="initialValues"
          :validation-schema="schema"
          @submit="handleSubmit"
        >
          <div class="-mt-2.5 mb-2 space-y-2 flex flex-wrap text-gray-900">
            <div class="mb-2 w-full">
              <label
                class="mb-2.5 block text-base font-bold tracking-wide text-gray-300"
                for="group_name"
              >
                Group name
              </label>
              <Field
                id="group_name"
                type="text"
                name="group_name"
                class="text- w-full rounded border px-4 py-3 font-light leading-tight focus:outline-none bg-deep text-gray-300"
                :class="
                  errors.group_name ? 'border-red-500' : 'border-gray-600'
                "
                placeholder="Enter group name"
              />
              <p
                v-if="errors.group_name"
                class="text-sm mt-2 font-light text-red-500"
              >
                {{ errors.group_name }}
              </p>
            </div>

            <div class="mb-2 w-full">
              <label
                class="mb-2.5 block font-bold tracking-wide text-gray-300"
                for="course"
              >
                Description
              </label>

              <Field
                as="textarea"
                rows="4"
                type="text"
                name="group_description"
                class="w-full rounded border px-4 py-3 font-thin leading-tight focus:outline-none bg-deep text-white"
                :class="
                  errors.group_description
                    ? 'border-red-500'
                    : 'border-gray-600'
                "
                placeholder="Enter group description"
              />

              <p
                v-if="errors.group_description"
                class="text-sm font-light text-red-500 mt-1"
              >
                {{ errors.group_description }}
              </p>
            </div>
          </div>

          <div class="mt-6">
            <button
              :disabled="isLoading"
              type="submit"
              class="bg-green-600 flex w-full items-center justify-center rounded px-7 py-3 text-center text-sm font-bold leading-snug text-white shadow-md transition duration-150 ease-in-out active:shadow-lg"
            >
              <svg
                v-if="isLoading"
                aria-hidden="true"
                role="isLoading"
                class="mr-1 inline h-3.5 w-3.5 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>

              <div v-if="action == 'add'">
                <span v-if="!pending">Create</span>
                <span v-else>Please wait...</span>
              </div>
              <div v-else>
                <span v-if="!pending">Update</span>
                <span v-else>Please wait...</span>
              </div>
            </button>
          </div>
        </Form>
      </UCard>
    </UModal>
  </div>
</template>
<script setup lang="ts">
import { Form, Field, configure } from "vee-validate";
import * as yup from "yup";

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

const schema = yup.object({
  group_name: yup.string().required("Required!"),
  group_url: yup.string(),
  group_description: yup.string().required("Required!"),
});

const image = ref("/profile.webp");
const pending = ref(false);
const isOpen = ref(false);
const isLoading = ref(false);
const store = useGroupStore();
const user: any = ref(null);
const initialValues = ref({
  group_name: "",
  creator_id: user?.id,
  group_description: "",
  group_url: "/profile.webp",
});

onMounted(async () => {
  if (process.client) {
    const currentUser = localStorage.getItem("group_chat_user");
    if (currentUser != null) {
      user.value = JSON.parse(currentUser);
    }
  }

  if (props?.id && props.action === "update") {
    const result = await store.getUserGroup(props?.id as string);
    const group: any = result.result;
    image.value = group.group_url;
    initialValues.value = {
      group_name: group.group_name,
      creator_id: group.creator_id,
      group_description: group.group_description,
      group_url: group.group_url,
    };
  }
});

const showModal = () => {
  isOpen.value = !isOpen.value;
};

const handleSubmit = async (inputs: any) => {
  pending.value = true;
  if (props.action != "update") {
    inputs.creator_id = user.value.id;
    const { data, error } = await useAsyncData("user", () =>
      store.createUserGroup(inputs).then((createGroupResult) => {
        pending.value = false;
        if (createGroupResult.success) {
          showModal();
        }
      })
    );
  }
};

defineExpose({ showModal });
</script>
