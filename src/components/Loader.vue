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
