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
            :disabled="quizState === 'check'"
            class="align-start"
          >
            <div slot="label">
              <v-card
                outlined
                v-bind:class="{
                  correct: quizState === 'check' && answer.is_correct,
                  incorrect: quizState === 'check' && !answer.is_correct
                }"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    {{ answer.value }}
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </v-radio>
        </v-radio-group>
        <div v-if="isNote && quizState === 'check'" class="mt-6">
          <h3 class="mb-4">Note</h3>
          <p>{{ noteText }}</p>
        </div>
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
    quizState: function() {
      return this.quizHandler.getQuizState();
    },
    quizTitle: function() {
      return this.quizHandler.getQuizTitle();
    },
    question: function() {
      return this.quizHandler.getQuestion();
    },
    answers: function() {
      return this.quizHandler.getAnswers();
    },
    isNote: function() {
      let note = this.quizHandler.getQuestionNote();
      return note !== null;
    },
    noteText: function() {
      let note = this.quizHandler.getQuestionNote();
      let noteText = "";
      if (note !== null) {
        noteText = note;
      }
      return noteText;
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

.v-item--active .correct {
  background-color: #a5d6a7 !important;
}

.correct {
  background-color: #c8e6c9 !important;
}

.v-item--active .incorrect {
  background-color: #ffcdd2 !important;
}
</style>
