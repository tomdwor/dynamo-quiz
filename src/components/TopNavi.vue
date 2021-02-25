<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/dynamoquiz_logo.png"
        transition="scale-transition"
        width="40"
      />
      <span
        id="pageName"
        class="shrink mt-0 hidden-sm-and-down"
        contain
        min-width="160"
        width="160"
        >{{ quizPageName }}</span
      >
    </div>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { QUIZ_PAGE_NAME } from "@/config.js";

export default {
  name: "TopNavi",
  data() {
    return {
      quizPageName: QUIZ_PAGE_NAME
    };
  }
};
</script>

<style>
#pageName {
  margin-left: 10px;
  font-size: 22px;
  font-weight: bold;
}
</style>
