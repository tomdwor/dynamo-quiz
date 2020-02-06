<template>
  <transition name="fade">
    <div id="loader" v-if="isLoading">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Loader",
  props: {
    isLoading: Boolean
  }
};
</script>

<style>
#loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
