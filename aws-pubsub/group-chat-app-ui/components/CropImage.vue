<script lang="ts">
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  name: "CropImage",
  components: {
    Cropper,
    // eslint-disable-next-line vue/no-unused-components
    CircleStencil,
  },
  props: {
    isOpen: Boolean,
    imageurl: { type: String, required: true },
  },
  emits: ["cropped-image", "close-modal"],
  data() {
    return {
      status: false,
      success: true,
      deleteError: "",
      croppedImage: "",
      open: true,
    };
  },

  methods: {
    crop() {
      this.$emit("cropped-image", this.croppedImage);
      this.$emit("close-modal");
    },

    change({ canvas }: any) {
      this.croppedImage = canvas.toDataURL();
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper {
  height: 400px;
  width: 700px;
  background: white;
}
</style>

<template>
  <div v-if="isOpen">
    <UModal v-model="open" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100',
        }"
        class="bg-light"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-300">
              Crop profile image
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1 text-gray-300 hover:bg-deep hover:text-white"
              @click="$emit('close-modal')"
            />
          </div>
        </template>

        <div class="">
          <div class="relative h-full w-full max-w-md md:h-auto">
            <div v-if="!success" class="text-lg font-light text-red-500">
              {{ deleteError }}
            </div>
            <div class="relative bg-light">
              <div class="text-center">
                <cropper
                  class="cropper"
                  :src="imageurl"
                  :stencil-component="$options.components?.CircleStencil"
                  :stencil-props="{
                    movable: true,
                    resizable: true,
                  }"
                  @change="change"
                />
                <button
                  v-if="!status"
                  data-modal-hide="popup-modal"
                  type="button"
                  class="btn-gradient mr-2 mt-5 inline-flex items-center rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300"
                  @click="crop"
                >
                  Crop image
                </button>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
