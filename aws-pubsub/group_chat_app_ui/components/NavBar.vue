<template>
  <div
    class="bg-light max-md:w-full max-md:py-2 max-md:absolute max-md:z-[105] bottom-0 md:min-w-[3.8rem] md:border-r md:border-gray-700 md:p-2"
  >
    <div class="md:h-full w-full md:relative flex items-center">
      <div
        class="md:absolute md:top-0 md:left-0 md:right-0 flex justify-center p-2 max-md:w-full max-md:-mr-8"
      >
        <div
          class="md:space-y-3 max-md:flex max-md:items-center max-md:w-full max-md:justify-evenly"
        >
          <div
            title="groups"
            :class="
              store.currentSceen == 'groups' ? 'bg-gray-500' : 'bg-transparent'
            "
            class="relative hover:cursor-pointer text-text-primary rounded-full h-10 w-10 flex justify-center items-center"
            @click="store.setCurrentScreen('groups')"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M1 18q-.425 0-.712-.288T0 17v-.575q0-1.075 1.1-1.75T4 14q.325 0 .625.013t.575.062q-.35.525-.525 1.1t-.175 1.2V18zm6 0q-.425 0-.712-.288T6 17v-.625q0-.8.438-1.463t1.237-1.162T9.588 13T12 12.75q1.325 0 2.438.25t1.912.75t1.225 1.163t.425 1.462V17q0 .425-.287.713T17 18zm12.5 0v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14q1.8 0 2.9.663t1.1 1.762V17q0 .425-.288.713T23 18zM4 13q-.825 0-1.412-.587T2 11q0-.85.588-1.425T4 9q.85 0 1.425.575T6 11q0 .825-.575 1.413T4 13m16 0q-.825 0-1.412-.587T18 11q0-.85.588-1.425T20 9q.85 0 1.425.575T22 11q0 .825-.575 1.413T20 13m-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.137T12 6q1.275 0 2.138.863T15 9q0 1.25-.862 2.125T12 12"
                />
              </svg>
            </div>

            <div
              class="bg-primary hidden absolute -top-1 -right-1 rounded-full h-[1.4rem] w-[1.4rem] flex justify-center items-center text-gray-300"
            >
              <p class="text-[13px]">10</p>
            </div>
          </div>

          <div
            title="chats"
            :class="
              store.currentSceen == 'chats' ? 'bg-gray-500' : 'bg-transparent'
            "
            class="relative hover:cursor-pointer text-text-primary rounded-full h-10 w-10 flex justify-center items-center"
            @click="store.setCurrentScreen('chats')"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-3 12H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1m0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1m0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1"
                />
              </svg>
            </div>

            <div
              class="bg-primary hidden absolute -top-1 -right-1 rounded-full h-[1.4rem] w-[1.4rem] flex justify-center items-center text-gray-300"
            >
              <p class="text-[13px]">10</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="md:absolute md:bottom-0 md:left-0 md:right-0 flex justify-center max-md:-ml-8 p-2 md:pb-4 max-md:w-full"
      >
        <div
          class="md:space-y-3 max-md:flex max-md:items-center max-md:w-full max-md:justify-evenly"
        >
          <div
            title="settings"
            :class="
              store.currentSceen == 'settings'
                ? 'bg-gray-500'
                : 'bg-transparent'
            "
            class="relative hover:cursor-pointer text-text-primary rounded-full h-10 w-10 flex justify-center items-center"
            @click="store.setCurrentScreen('settings')"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.49.49 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.6.6 0 0 0-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1q.09.03.18.03c.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64zm-1.98-1.71c.04.31.05.52.05.73s-.02.43-.05.73l-.14 1.13l.89.7l1.08.84l-.7 1.21l-1.27-.51l-1.04-.42l-.9.68c-.43.32-.84.56-1.25.73l-1.06.43l-.16 1.13l-.2 1.35h-1.4l-.19-1.35l-.16-1.13l-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7l-1.06.43l-1.27.51l-.7-1.21l1.08-.84l.89-.7l-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13l-.89-.7l-1.08-.84l.7-1.21l1.27.51l1.04.42l.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43l.16-1.13l.2-1.35h1.39l.19 1.35l.16 1.13l1.06.43c.43.18.83.41 1.23.71l.91.7l1.06-.43l1.27-.51l.7 1.21l-1.07.85l-.89.7zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"
                />
              </svg>
            </div>
          </div>
          <div
            title="profile"
            :class="store.currentSceen == 'profile' && 'ring-2 ring-violet-400'"
            class="relative hover:cursor-pointer text-text-primary rounded-full h-10 w-10 flex justify-center items-center"
            @click="store.setCurrentScreen('profile')"
          >
            <div>
              <img
                class="w-8 h-8 rounded-full"
                src="/profile.webp"
                alt="Rounded avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useScreenStore();
</script>
