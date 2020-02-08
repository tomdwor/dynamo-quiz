<template>
  <v-footer padless fixed class="grey lighten-3">
    <v-container style="max-width: 1200px;">
      <v-layout>
        <v-row
          v-if="quizState === 'start'"
          class="mx-3"
          justify="center"
          no-gutters
        >
          <v-col class="py-4 text-left" cols="6">
            <v-btn class="navi-btn" large :href="'/'">Cancel</v-btn>
          </v-col>
          <v-col class="py-4 text-right" cols="6">
            <v-btn class="navi-btn" large color="primary" v-on:click="startQuiz"
              >Start quiz</v-btn
            >
          </v-col>
        </v-row>
        <v-row
          v-if="quizState === 'ask' || quizState === 'check'"
          class="mx-3"
          justify="center"
          no-gutters
        >
          <v-col class="pt-3 text-center" cols="6">
            <div style="width: calc(100% - 12px);">
              <span style="font-weight: bold;"
                >{{ correctAnswersNumber }} / {{ answersNumber }} of
                {{ questionsNumber }}</span
              >
              <v-progress-linear
                v-model="quizProgress"
                color="blue-grey"
                height="25"
                reactive
                style="width: 100%;"
                value="25"
              >
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
            </div>
          </v-col>
          <v-col class="py-4 text-right" cols="6">
            <v-btn
              v-if="quizState === 'ask'"
              class="navi-btn"
              large
              color="primary"
              v-on:click="checkAnswer"
              :disabled="isDisabledCheckBtn"
              >CHECK</v-btn
            >
            <v-btn
              v-if="quizState === 'check'"
              class="navi-btn"
              large
              color="primary"
              v-on:click="nextQuestion"
              >NEXT</v-btn
            >
          </v-col>
        </v-row>
        <v-row
          v-if="quizState === 'review'"
          class="mx-3"
          justify="center"
          no-gutters
        >
          <v-col class="py-4 text-left" cols="6">
            <v-btn class="navi-btn" large v-on:click="repeatQuiz"
              >Repeat quiz</v-btn
            >
          </v-col>
          <v-col class="py-4 text-right" cols="6">
            <v-btn class="navi-btn" large color="primary" :href="'/'"
              >Finish quiz</v-btn
            >
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
import store from "@/store/index";
import QuizHandler from "@/domain/quiz/QuizHandler.js";

export default {
  name: "QuizBottomNavi",
  store,
  data() {
    let quizHandler = new QuizHandler(store);
    return {
      quizHandler
    };
  },
  computed: {
    quizState: function() {
      return this.quizHandler.getQuizState();
    },
    answersNumber: function() {
      return this.quizHandler.getAnswersNumber();
    },
    correctAnswersNumber: function() {
      return this.quizHandler.getCorrectAnswersNumber();
    },
    questionsNumber: function() {
      return this.quizHandler.getQuestionsNumber();
    },
    quizProgress: function() {
      let answersNumb = this.quizHandler.getAnswersNumber();
      let questionsNumb = this.quizHandler.getQuestionsNumber();
      let progress = Math.round((100 * answersNumb) / questionsNumb);
      return progress;
    },
    isDisabledCheckBtn: function() {
      return this.$store.state.checkedAnswer === null;
    }
  },
  methods: {
    startQuiz: function() {
      this.quizHandler.startQuiz();
    },
    checkAnswer: function() {
      this.quizHandler.checkAnswer();
    },
    nextQuestion: function() {
      this.quizHandler.nextQuestion();
    },
    repeatQuiz: function() {
      this.quizHandler.repeatQuiz();
    }
  }
};
</script>

<style>
.navi-btn {
  width: 50%;
}

@media (max-width: 959px) {
  .navi-btn {
    width: calc(75% - 12px);
  }
}

@media (max-width: 599px) {
  .navi-btn {
    width: calc(100% - 12px);
  }
}
</style>
