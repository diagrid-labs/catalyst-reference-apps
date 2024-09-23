// Dependencies ===============
export const useScreenStore = defineStore("screen", () => {
  // State =====================
  const currentSceen = ref("groups");
  const showGroupInfo = ref(false);

  // Actions ====================
  const setCurrentScreen = async (value: string) => {
    currentSceen.value = value;
  };
  const setShowGroupInfo = async (value: boolean) => {
    showGroupInfo.value = value;
  };
  return {
    currentSceen,
    showGroupInfo,
    setCurrentScreen,
    setShowGroupInfo,
  };
});
