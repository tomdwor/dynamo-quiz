<template>
  <v-container id="quizContainer" bg fill-height>
    <v-layout
      row
      wrap
      align-md-center
      class="mx-3"
      style="padding-bottom: 80px;"
    >
      <transition name="fade">
        <div v-if="!isLoading && !isQuestionLoading" style="width: 100%;">
          <div v-if="quizState === 'ask' || quizState === 'check'">
            <v-row>
              <v-col class="pt-4 text-left" cols="8">
                <h2>
                  Question {{ quizStatistics.currentQuestionNumber }} of
                  {{ quizStatistics.questionsNumber }}
                </h2>
                {{ quizTitle }}
              </v-col>
              <v-col class="pt-4 text-right" cols="4">
                <v-dialog v-model="dialog" persistent max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on">Exit quiz</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">Exit quiz</v-card-title>
                    <v-card-text
                      >Are you sure you want to exit quiz?</v-card-text
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="grey darken-1" text @click="dialog = false"
                        >Cancel</v-btn
                      >
                      <v-btn color="red darken-1" text @click="exitQuiz"
                        >EXIT</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
            <hr class="mt-0 mb-6" />
          </div>
          <QuizStart v-if="quizState === 'start'" :quizHandler="quizHandler" />
          <QuizQuestion
            v-if="quizState === 'ask' || quizState === 'check'"
            :quizHandler="quizHandler"
          />
          <QuizReview
            v-if="quizState === 'review'"
            :quizHandler="quizHandler"
          />
        </div>
      </transition>
      <Loader :isLoading="isLoading" />
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store/index";
import axios from "axios";
import QuizHandler from "@/domain/quiz/QuizHandler.js";
import { QUIZ_DATA_URL_PREFIX } from "@/config.js";
import Loader from "@/components/Loader.vue";
import QuizStart from "@/components/quiz_content/QuizStart.vue";
import QuizQuestion from "@/components/quiz_content/QuizQuestion.vue";
import QuizReview from "@/components/quiz_content/QuizReview.vue";

export default {
  name: "quiz",
  components: {
    Loader,
    QuizStart,
    QuizQuestion,
    QuizReview
  },
  store,
  data() {
    let quizHandler = new QuizHandler(store);
    return {
      dialog: false,
      quizId: this.$route.params.id,
      isLoading: true,
      quizHandler
    };
  },
  computed: {
    quizState: function() {
      return this.quizHandler.getQuizState();
    },
    quizTitle: function() {
      return this.quizHandler.getQuizTitle();
    },
    isQuestionLoading: function() {
      return this.$store.state.isQuestionLoading;
    },
    quizStatistics: function() {
      return this.quizHandler.getQuizStatistics();
    }
  },
  methods: {
    exitQuiz: function() {
      this.quizHandler.resetStoreValues();
      window.location.href = "/";
    },
    validQuizID: function(quizID) {
      let patt = new RegExp("^[a-z][a-z0-9]*(\\-[a-z0-9]+)*$");
      return patt.test(quizID);
    }
  },
  mounted() {
    let that = this;
    if (this.validQuizID(that.quizId)) {
      let file_name = `${that.quizId}.json`;
      axios.get(`${QUIZ_DATA_URL_PREFIX}${file_name}`).then(function(response) {
        that.isLoading = false;
        that.quizHandler.initQuiz(response.data);
      });
      // TODO: handle not-found / error cases
    } else {
      alert("Invalid quiz ID");
      window.location.href = "/";
    }
  }
};
</script>

<style>
#quizContainer {
  max-width: 1200px;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  margin: 1em 0;
  padding: 0;
}
</style>
