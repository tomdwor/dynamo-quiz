<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12 class="mt-6">
        <h1>About</h1>
        <p id="aboutContent" v-html="aboutContent"></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { ABOUT_PAGE_CONTENT } from "@/config.js";

export default {
  name: "About",
  data() {
    return {
      aboutContent: ABOUT_PAGE_CONTENT
    };
  }
};
</script>

<style>
#aboutContent {
  margin-top: 30px;
}
</style>
