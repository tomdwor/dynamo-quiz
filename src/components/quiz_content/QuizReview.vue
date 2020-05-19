<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <h2>Quiz review</h2>
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
    quizStatistics() {
      return this.quizHandler.getQuizStatistics();
    },
    passThreshold: function() {
      return this.quizHandler.getPassThreshold();
    },
    isPassed: function() {
      let quizStatistics = this.quizHandler.getQuizStatistics();
      let passThreshold = this.quizHandler.getPassThreshold();
      let percentage = quizStatistics.correctPercentage;
      return percentage >= passThreshold;
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
</style>
