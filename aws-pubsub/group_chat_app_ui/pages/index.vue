<template>
  <div class="w-full h-full bg-deeper">
    <div
      class="font-[sans-serif] bg-deeper max-w-4xl flex items-center mx-auto md:h-screen p-4"
    >
      <div
        class="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden"
      >
        <div
          class="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-violet-900 to-violet-700 lg:px-8 px-4 py-4"
        >
          <div>
            <h4 class="text-white text-lg font-semibold">
              Create Your Account
            </h4>
            <p class="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Welcome to our registration page! Get started by creating your
              account.
            </p>
          </div>
          <div>
            <h4 class="text-white text-lg font-semibold">
              Simple & Secure Registration
            </h4>
            <p class="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Our registration process is designed to be straightforward and
              secure. We prioritize your privacy and data security.
            </p>
          </div>
        </div>

        <Form
          v-slot="{ errors }"
          :initial-values="initialValues"
          :validation-schema="schema"
          @submit="handleSubmit"
          class="md:col-span-2 w-full py-6 px-6 sm:px-16 bg-deep"
        >
          <div class="mb-6 md:mb-4">
            <h3 class="text-gray-300 text-2xl font-bold">Create an account</h3>
          </div>

          <div class="space-y-6 md:space-y-4">
            <div>
              <label class="text-gray-300 text-sm mb-2 block">Username</label>
              <div class="relative flex items-center">
                <Field
                  name="username"
                  type="text"
                  class="text-gray-300 bg-deep border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-violet-600"
                  :class="errors.username && 'border-red-500'"
                  placeholder="Enter your username"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              <p
                v-if="errors.username"
                class="mt-2 text-sm font-light text-red-500"
              >
                {{ errors.username }}
              </p>
            </div>

            <div>
              <label class="text-gray-300 text-sm mb-2 block">Email</label>
              <div class="relative flex items-center">
                <Field
                  name="email"
                  type="email"
                  class="text-gray-300 bg-deep border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-violet-600"
                  :class="errors.email && 'border-red-500'"
                  placeholder="Enter your email"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-4 h-4 absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
              <p
                v-if="errors.email"
                class="mt-2 text-sm font-light text-red-500"
              >
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label
                class="mb-2 block text-base font-bold tracking-wide text-gray-300"
                for="name"
              >
                Profile picture
              </label>

              <div class="flex items-center">
                <div
                  id="Image"
                  class="mr-2 max-h-[50px] min-h-[50px] min-w-[50px] max-w-[50px] hover:cursor-pointer"
                >
                  <img
                    :src="image"
                    class="max-h-[45px] min-h-[45px] min-w-[45px] max-w-[45px] rounded-full object-cover p-[3px] text-violet-400 ring-[2px] ring-current"
                  />
                </div>
                <div class="w-full relative">
                  <Field
                    type="file"
                    name="profile_pic_url"
                    class="text-gray-300 bg-deep border hover:cursor-pointer border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-violet-600"
                    :class="errors.profile_pic_url && 'border-red-500'"
                    accept=".png, .jpeg, .jpg"
                    @change="onChange"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 absolute right-3.5 top-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#888888"
                      d="M3 21q-.825 0-1.412-.587T1 19V7q0-.825.588-1.412T3 5h3.15L8 3h6v2H8.875L7.05 7H3v12h16v-9h2v9q0 .825-.587 1.413T19 21zM19 7V5h-2V3h2V1h2v2h2v2h-2v2zm-8 10.5q1.875 0 3.188-1.312T15.5 13t-1.312-3.187T11 8.5T7.813 9.813T6.5 13t1.313 3.188T11 17.5m0-2q-1.05 0-1.775-.725T8.5 13t.725-1.775T11 10.5t1.775.725T13.5 13t-.725 1.775T11 15.5"
                    />
                  </svg>
                </div>
              </div>
              <p
                v-if="errors.profile_pic_url"
                class="mt-2 text-sm font-light text-red-500"
              >
                {{ errors.profile_pic_url }}
              </p>
            </div>
          </div>

          <div class="mt-8">
            <button
              :disabled="pending"
              type="submit"
              class="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-violet-700 hover:bg-violet-800 focus:outline-none"
            >
              <span v-if="pending">Please wait...</span>
              <span v-else>Create an account</span>
            </button>
          </div>
        </Form>
      </div>
      <CropImage
        :isOpen="crop"
        :imageurl="image"
        @cropped-image="croppedImage"
        @close-modal="crop = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, configure } from "vee-validate";
import { type CreateUserInput } from "~/src/types/amplify";
import * as yup from "yup";
import CropImage from "~/components/CropImage.vue";
import { v4 as uuidv4 } from "uuid";
const store = useAuthStore();

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const crop = ref(false);
const data = ref(false);
const image = ref("/profile.webp");
const croppedImg: any = ref("");
const pending = ref(false);
const initialValues: CreateUserInput = {
  username: "",
  email: "",
  profile_pic_url: "",
};
const schema = yup.object({
  username: yup.string().required("Required!"),
  email: yup.string().email("Not a valide email").required("Required!"),
  profile_pic_url: yup.string(),
});

onMounted(() => {
  if (process.client) {
    let user = localStorage.getItem("group_chat_user");
    if (user || user != null) {
      navigateTo("/dashboard");
    }
  }
});

const croppedImage = async (data: any) => {
  image.value = data;
  crop.value = false;
  const img = await fetchImage(data);
  if (img) {
    croppedImg.value = img;
  }
};

const fetchImage = async (imageUrl: string) => {
  const uuid = uuidv4();
  if (process.client) {
    let response;
    response = await fetch(imageUrl);
    response = await response.blob();
    response = new File([response], `group_chat_profile_${uuid}.png`);
    return response;
  }
};

const toBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const onChange = async (event: any) => {
  const img = await toBase64(event.target.files[0]);
  image.value = img as string;
  data.value = true;
  crop.value = true;
};

const handleSubmit = async (inputs: any) => {
  pending.value = true;
  let new_img = image.value;
  if (croppedImg.value != "") {
    new_img = croppedImg.value;
  } else if (inputs.profile_pic_url != "") {
    new_img = croppedImg.value;
  }
  const { data, error } = await useAsyncData("user", () =>
    store.createUser(inputs, new_img).then((createUserResult) => {
      pending.value = false;
      if (createUserResult.success) {
        navigateTo("/dashboard");
      }
    })
  );
};
</script>
