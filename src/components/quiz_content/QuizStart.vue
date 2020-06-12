<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <h2>{{ quizTitle }}</h2>
        <p class="mt-2">
          <i>{{ quizStatistics.questionsNumberInfo }}</i>
        </p>
        <p class="mt-6">
          <markdown-it-vue class="md-body" :content="content" />
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";

export default {
  components: {
    MarkdownItVue
  },
  name: "QuizStart",
  props: {
    quizHandler: Object
  },
  computed: {
    quizState: function() {
      return this.quizHandler.getQuizState();
    },
    quizTitle: function() {
      return this.quizHandler.getQuizTitle();
    },
    content: function() {
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
