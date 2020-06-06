<template>
  <div>
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
          <v-btn id="show-answers-btn" large v-on:click="toggleShowAnswers">{{
            showAnswersBtnText
          }}</v-btn>
        </p>
        <div v-if="showAnswers">
          <h2 class="mt-6">Answers:</h2>
          <div v-for="(item, index) in userAnswerHistory" :key="item.id">
            <p class="title question-title">
              Question {{ index + 1 }} -
              <span
                v-bind:class="{
                  'green--text': item.isCorrect,
                  'red--text': !item.isCorrect
                }"
                >{{ item.isCorrect ? "Correct" : "Incorrect" }}</span
              >
            </p>
            <p class="my-6">
              <vue-mathjax :formula="item.question"></vue-mathjax>
            </p>
            <div v-if="'single' === item.type">
              <p class="font-weight-bold">Selected answer:</p>
              <ul>
                <li><vue-mathjax :formula="item.userAnswer"></vue-mathjax></li>
              </ul>
            </div>
            <div v-if="'multi' === item.type">
              <p class="font-weight-bold">Selected answers:</p>
              <ul>
                <li v-for="answer in item.userAnswer" :key="answer">
                  <vue-mathjax :formula="answer"></vue-mathjax>
                </li>
              </ul>
            </div>
            <div v-if="'text' === item.type">
              <p class="font-weight-bold">User answer:</p>
              <p class="pl-6 font-italic">{{ item.userAnswer }}</p>
            </div>
            <div v-if="!item.isCorrect">
              <div v-if="'single' === item.type">
                <p class="font-weight-bold">Correct answer:</p>
                <ul>
                  <li>
                    <vue-mathjax :formula="item.correctAnswer"></vue-mathjax>
                  </li>
                </ul>
              </div>
              <div v-if="'multi' === item.type">
                <p class="font-weight-bold">Correct answers:</p>
                <ul>
                  <li v-for="answer in item.correctAnswer" :key="answer">
                    <vue-mathjax :formula="answer"></vue-mathjax>
                  </li>
                </ul>
              </div>
              <div v-if="'text' === item.type">
                <p class="font-weight-bold">Correct answer:</p>
                <p class="pl-6 font-italic">{{ item.correctAnswer }}</p>
              </div>
            </div>
          </div>
        </div>
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
  name: "QuizReview",
  props: {
    quizHandler: Object
  },
  data() {
    return {
      showAnswers: false
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
    }
  }
};
</script>

<style>
#options .v-item--active .v-card {
  box-shadow: 0 0 1px 2px #82b1ff;
}

#options .v-input--selection-controls__input {
  margin-top: 32px;
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
</style>
