<template>
  <div>
    <v-row class="mb-3">
      <v-col>{{ question }}</v-col>
    </v-row>
    <v-row id="answers">
      <v-col>
        <v-radio-group v-model="checkedAnswer">
          <v-radio
            v-for="(answer, index) in answers"
            :key="index"
            :value="index + 1"
            class="align-start"
          >
            <div slot="label">
              <v-card outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    {{ answer }}
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "QuizQuestion",
  props: {
    quizHandler: Object
  },
  computed: {
    quizTitle: function() {
      return this.quizHandler.getQuizTitle();
    },
    question: function() {
      return this.quizHandler.getQuestion();
    },
    answers: function() {
      return this.quizHandler.getAnswers();
    },
    checkedAnswer: {
      get() {
        return this.$store.state.checkedAnswer;
      },
      set(value) {
        this.$store.commit("changeCheckedAnswer", value);
      }
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
