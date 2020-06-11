<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <h2>{{ quizTitle }}</h2>
        <p class="mt-2">
          <i>{{ quizStatistics.questionsNumberInfo }}</i>
        </p>
        <p class="mt-6">
          <vue-mathjax
            :options="mathJaxOptions"
            :formula="quizDescription"
          ></vue-mathjax>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";
import { mathJaxOptions } from "@/config.js";

export default {
  components: {
    "vue-mathjax": VueMathjax
  },
  name: "QuizStart",
  props: {
    quizHandler: Object
  },
  data() {
    return {
      mathJaxOptions: mathJaxOptions
    };
  },
  computed: {
    quizState: function() {
      return this.quizHandler.getQuizState();
    },
    quizTitle: function() {
      return this.quizHandler.getQuizTitle();
    },
    quizDescription: function() {
      return this.quizHandler.getQuizDescription();
    },
    quizStatistics() {
      return this.quizHandler.getQuizStatistics();
    }
  },
  methods: {
    clickElementIfExists(element) {
      if (typeof element != "undefined" && element != null) {
        element.click();
      }
    },
    handleKeyDownEnter() {
      if ("start" === this.quizState) {
        let elem = document.getElementById(`start-quiz-btn`);
        this.clickElementIfExists(elem);
      }
    },
    handleKeyDown(e) {
      if (e.code === "Enter") {
        this.handleKeyDownEnter();
      }
    }
  },
  created() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
};
</script>
