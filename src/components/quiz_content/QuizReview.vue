<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <h2>Quiz review</h2>
        <p>{{ quizTitle }}</p>
        <v-card v-if="isPassed" outlined color="green lighten-4" class="mt-5">
          <v-list-item three-line>
            <v-list-item-content class="mx-4">
              <strong>PASS - {{ correctPercentage }}%</strong>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card v-else outlined color="red lighten-4" class="mt-5">
          <v-list-item three-line>
            <v-list-item-content class="mx-4">
              <strong>FAIL - {{ correctPercentage }}%</strong>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <p class="mt-2 grey--text">Pass threshold: {{ passThreshold }}%</p>
        <h3 class="mt-6">Stats:</h3>
        <p class="mt-2">
          All questions: <strong>{{ questionsNumber }}</strong
          ><br />
          Correct: <strong>{{ correctAnswersNumber }}</strong
          ><br />
          Incorrect: <strong>{{ incorrectAnswersNumber }}</strong
          ><br />
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "QuizReview",
  props: {
    quizHandler: Object
  },
  computed: {
    quizTitle: function() {
      return this.quizHandler.getQuizTitle();
    },
    questionsNumber() {
      return this.quizHandler.getQuestionsNumber();
    },
    correctAnswersNumber: function() {
      return this.quizHandler.getCorrectAnswersNumber();
    },
    incorrectAnswersNumber: function() {
      let all = this.quizHandler.getQuestionsNumber();
      let correct = this.quizHandler.getCorrectAnswersNumber();
      let incorrect = all - correct;
      return incorrect;
    },
    correctPercentage: function() {
      let all = this.quizHandler.getQuestionsNumber();
      let correct = this.quizHandler.getCorrectAnswersNumber();
      let percentage = Math.round((100 * correct) / all);
      return percentage;
    },
    passThreshold: function() {
      return this.quizHandler.getPassThreshold();
    },
    isPassed: function() {
      let passThreshold = this.quizHandler.getPassThreshold();
      let all = this.quizHandler.getQuestionsNumber();
      let correct = this.quizHandler.getCorrectAnswersNumber();
      let percentage = (100 * correct) / all;
      return percentage >= passThreshold;
    }
  }
};
</script>

<style>
#answers .v-item--active .v-card {
  box-shadow: 0 0 1px 2px #82b1ff;
}

#answers .v-input--selection-controls__input {
  margin-top: 32px;
}

#answers label,
#answers label div {
  width: 100%;
}
</style>
