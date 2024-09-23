<template>
  <div
    class="flex w-screen h-screen overflow-hidden bg-deeper min-[800px]:p-5 transition-all ease-in-out duration-700"
  >
    <div
      class="min-[1200px]:min-w-[500px] transition-all ease-in-out duration-700 min-[900px]:min-w-[400px] border-r border-gray-800 min-[767px]:min-w-[350px] max-md:w-full bg-deep flex h-full"
    >
      <Navbar />
      <div
        class="bg-transparent w-full transition-all ease-in-out duration-700"
      >
        <Profile v-if="store.currentSceen == 'profile'" />
        <Groups v-if="store.currentSceen == 'groups'" />
        <Chats v-if="store.currentSceen == 'chats'" />
      </div>
    </div>
    <div
      class="w-full max-md:hidden relative border-y transition-all ease-in-out duration-700"
    >
      <div
        class="h-full w-full relative transition-all ease-in-out duration-700"
      >
        <div class="h-full w-full pt-20 flex justify-center items-center">
          <div class="-mt-32 text-gray-300">
            <p>Click on any group</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useScreenStore();
import Chats from "~/components/Chats.vue";
import Groups from "~/components/Groups.vue";
import Navbar from "~/components/NavBar.vue";
import Profile from "~/components/Profile.vue";
</script>
