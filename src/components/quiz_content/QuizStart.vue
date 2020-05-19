<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <h2>{{ quizTitle }}</h2>
        <p class="mt-2">
          <i>{{ quizStatistics.questionsNumberInfo }}</i>
        </p>
        <p class="mt-6">
          <vue-mathjax :formula="quizDescription"></vue-mathjax>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";
export default {
  components: {
    "vue-mathjax": VueMathjax
  },
  name: "QuizStart",
  props: {
    quizHandler: Object
  },
  computed: {
    quizTitle: function() {
      return this.quizHandler.getQuizTitle();
    },
    quizDescription: function() {
      return this.quizHandler.getQuizDescription();
    },
    quizStatistics() {
      return this.quizHandler.getQuizStatistics();
    }
  }
};
</script>
