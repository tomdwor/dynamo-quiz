<template>
  <v-footer class="font-weight-medium grey lighten-3">
    <v-col class="text-center" cols="12">
      {{ quizPageFooter }}
    </v-col>
  </v-footer>
</template>

<script>
import { QUIZ_PAGE_FOOTER } from "@/config.js";

export default {
  name: "CommonFooter",
  data() {
    return {
      quizPageFooter: QUIZ_PAGE_FOOTER
    };
  }
};
</script>
