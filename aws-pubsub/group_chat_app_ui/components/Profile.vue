<template>
  <div
    class="relative w-full h-full pt-4 transition-all ease-in-out duration-700"
  >
    <div class="md:px-3 absolute top-0 pt-5 inset-x-0 z-[105]">
      <div class="w-full flex justify-between px-3">
        <div class="flex items-center">
          <div class="md:hidden" @click="store.setCurrentScreen('groups')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 mr-3 text-gray-300 hover:cursor-pointer"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
              />
            </svg>
          </div>
          <p class="text-gray-50 font-bold text-xl">Profile</p>
        </div>
        <div class="flex items-center gap-4">
          <button
            type="submit"
            class="text-white items-center bg-red-700 hover:bg-red-800 outline-none font-medium rounded-full h-10 w-10 flex justify-center text-sm p-2"
            @click="showDelete()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div
      class="w-full px-8 mt-[3rem] pt-5 max-md:h-full md:h-[76vh] overflow-y-auto overflow-x-hidden sidebar"
    >
      <div class="w-full flex justify-center">
        <div class="flex-shrink-0">
          <img
            class="w-32 h-32 md:w-40 md:h-40 rounded-full"
            :src="user?.profile_pic_url"
            alt=""
          />
        </div>
      </div>

      <div class="w-full mt-10 space-y-5">
        <div class="w-full">
          <div><p class="text-primary">Name</p></div>
          <div class="relative mt-4">
            <input
              type="search"
              id="default-search"
              class="block w-full text-md text-text-primary focus:border-b border-primary outline-none bg-transparent"
              :placeholder="user?.username"
              required
            />
            <button
              type="submit"
              class="text-text-primary absolute end-1 bottom-2.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
                />
              </svg>
            </button>
            <!-- <button
              type="submit"
              class="text-text-primary absolute end-1 bottom-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#888888"
                  d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"
                />
              </svg>
            </button> -->
          </div>
        </div>
        <div class="w-full">
          <div><p class="text-primary">Email</p></div>
          <div class="relative mt-4">
            <input
              type="search"
              id="default-search"
              class="block w-full text-md text-text-primary focus:border-b border-primary outline-none bg-transparent"
              :placeholder="user?.email"
              required
            />
            <button
              type="submit"
              class="text-text-primary absolute end-1 bottom-2.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
                />
              </svg>
            </button>
            <!-- <button
              type="submit"
              class="text-text-primary absolute end-1 bottom-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#888888"
                  d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"
                />
              </svg>
            </button> -->
          </div>
        </div>
      </div>
    </div>
    <Delete ref="del" location="profile" />
  </div>
</template>

<script setup lang="ts">
import Delete from "./Delete.vue";
const store = useScreenStore();
const del = ref();

const user: any = ref({
  username: "Username",
  profile_pic_url: "/profile.webp",
  email: "example@gmail.com",
});

onMounted(() => {
  if (process.client) {
    const currentUser = localStorage.getItem("group_chat_user");
    if (currentUser != null) {
      user.value = JSON.parse(currentUser);
    }
  }
});

const showDelete = () => {
  del.value.showModal();
};
</script>
