<template>
  <div>
    <v-btn
      id="to-top"
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
    <v-row class="mb-3">
      <v-col>
        <h1>Quiz review</h1>
        <p>{{ quizTitle }}</p>
        <v-card v-if="isPassed" outlined color="green lighten-4" class="mt-5">
          <v-list-item three-line>
            <v-list-item-content class="mx-4">
              <strong>PASS - {{ quizStatistics.correctPercentage }}%</strong>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card v-else outlined color="red lighten-4" class="mt-5">
          <v-list-item three-line>
            <v-list-item-content class="mx-4">
              <strong>FAIL - {{ quizStatistics.correctPercentage }}%</strong>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <p class="mt-2 grey--text">Pass threshold: {{ passThreshold }}%</p>
        <h3 class="mt-6">Stats:</h3>
        <p class="mt-2">
          All questions: <strong>{{ quizStatistics.questionsNumber }}</strong
          ><br />
          Correct: <strong>{{ quizStatistics.correctAnswersNumber }}</strong
          ><br />
          Incorrect: <strong>{{ quizStatistics.incorrectAnswersNumber }}</strong
          ><br />
        </p>
        <p>
          <v-btn
            large
            id="show-answers-btn"
            v-bind:class="{ 'v-btn--active': showAnswers }"
            v-on:click="toggleShowAnswers"
            >{{ showAnswersBtnText }}</v-btn
          >
        </p>
        <div id="answers-wrapper" v-if="showAnswers">
          <h2 class="mt-6">Answers:</h2>
          <p id="list-filter" class="my-6">
            <v-btn-toggle v-model="toggleFilter">
              <v-btn id="filter-all" color="white">
                All
              </v-btn>
              <v-btn id="filter-correct" color="white">
                Correct
              </v-btn>
              <v-btn id="filter-incorrect" color="white">
                Incorrect
              </v-btn>
            </v-btn-toggle>
          </p>
          <div v-for="(item, index) in userAnswerHistory" :key="item.id">
            <div
              v-if="
                toggleFilter === 0 ||
                  (toggleFilter === 1 && item.isCorrect) ||
                  (toggleFilter === 2 && !item.isCorrect)
              "
            >
              <p class="title question-title">
                <v-icon v-if="item.isCorrect" class="green--text"
                  >check_circle</v-icon
                >
                <v-icon v-else class="red--text">cancel</v-icon>
                Question {{ index + 1 }}
              </p>
              <p class="my-6">
                <markdown-it-vue class="md-body" :content="item.question" />
              </p>
              <div v-if="'single' === item.type" class="my-6">
                <p class="font-weight-bold">Selected answer:</p>
                <ul>
                  <li>
                    <markdown-it-vue
                      class="md-body"
                      :content="item.userAnswer"
                    />
                  </li>
                </ul>
              </div>
              <div v-if="'multi' === item.type" class="my-6">
                <p class="font-weight-bold">Selected answers:</p>
                <ul>
                  <li v-for="answer in item.userAnswer" :key="answer">
                    <markdown-it-vue class="md-body" :content="answer" />
                  </li>
                </ul>
              </div>
              <div v-if="'text' === item.type" class="my-6">
                <p class="font-weight-bold">User answer:</p>
                <p class="pl-6 font-italic">{{ item.userAnswer }}</p>
              </div>
              <div
                v-if="
                  !item.isCorrect ||
                    ('text' === item.type &&
                      item.userAnswer !== item.correctAnswer)
                "
              >
                <div v-if="'single' === item.type" class="my-6">
                  <p class="font-weight-bold">Correct answer:</p>
                  <ul>
                    <li>
                      <markdown-it-vue
                        class="md-body"
                        :content="item.correctAnswer"
                      />
                    </li>
                  </ul>
                </div>
                <div v-if="'multi' === item.type" class="my-6">
                  <p class="font-weight-bold">Correct answers:</p>
                  <ul>
                    <li v-for="answer in item.correctAnswer" :key="answer">
                      <markdown-it-vue class="md-body" :content="answer" />
                    </li>
                  </ul>
                </div>
                <div v-if="'text' === item.type" class="my-6">
                  <p class="font-weight-bold">Correct answer:</p>
                  <p class="pl-6 font-italic">{{ item.correctAnswer }}</p>
                </div>
              </div>
              <div v-if="item.note !== null" class="my-6">
                <p class="font-weight-bold">Note:</p>
                <p class="mb-6">
                  <markdown-it-vue class="md-body" :content="item.note" />
                </p>
              </div>
            </div>
          </div>
        </div>
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
  name: "QuizReview",
  props: {
    quizHandler: Object
  },
  data() {
    return {
      showAnswers: false,
      toggleFilter: 0,
      fab: false
    };
  },
  computed: {
    quizTitle: function() {
      return this.quizHandler.getQuizTitle();
    },
    passThreshold: function() {
      return this.quizHandler.getPassThreshold();
    },
    isPassed: function() {
      let quizStatistics = this.quizHandler.getQuizStatistics();
      let passThreshold = this.quizHandler.getPassThreshold();
      let percentage = quizStatistics.correctPercentage;
      return percentage >= passThreshold;
    },
    quizStatistics() {
      return this.quizHandler.getQuizStatistics();
    },
    userAnswerHistory() {
      return this.quizHandler.getUserAnswerHistory();
    },
    showAnswersBtnText() {
      return this.showAnswers ? "Hide answers" : "Show answers";
    }
  },
  methods: {
    toggleShowAnswers() {
      this.showAnswers = !this.showAnswers;
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>

<style>
#options .v-item--active .v-card {
  box-shadow: 0 0 1px 2px #82b1ff;
}

#options .v-input--selection-controls__input {
  margin-top: 24px;
}

#options label,
#options label div {
  width: 100%;
}

#show-answers-btn {
  margin-top: 32px;
  margin-bottom: 32px;
}

.question-title {
  border-bottom: 2px #eeeeee solid !important;
  margin-top: 50px;
}

#answers-wrapper {
  margin-bottom: 96px;
}

#list-filter button {
  min-width: 100px;
  height: 32px;
}

#to-top {
  bottom: 120px;
}
</style>
