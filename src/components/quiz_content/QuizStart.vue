<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <h2>{{ quizTitle }}</h2>
        <p class="mt-2">
          <i>{{ questionsNumberInfo }} questions</i>
        </p>
        <p class="mt-6">
          {{ quizDescription }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
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
    questionsNumberInfo() {
      return this.quizHandler.getQuestionsNumberInfo();
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
