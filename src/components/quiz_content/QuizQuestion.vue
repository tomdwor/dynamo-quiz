<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <vue-mathjax :formula="question"></vue-mathjax>
      </v-col>
    </v-row>
    <v-row id="answers">
      <v-col>
        <v-radio-group v-if="type === 'single'" v-model="selectedSingleAnswer">
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
                    <vue-mathjax :formula="answer.value"></vue-mathjax>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </v-radio>
        </v-radio-group>
        <div v-if="type === 'text'">
          <input
            id="textAnswerInput"
            v-model="typedTextAnswer"
            autocomplete="off"
            v-bind:class="{
              correct: quizState === 'check' && isCorrectTextAnswer,
              incorrect: quizState === 'check' && !isCorrectTextAnswer,
              identical: quizState === 'check' && isIdenticalTextAnswer
            }"
          />
          <div
            v-if="quizState === 'check' && !isIdenticalTextAnswer"
            class="mt-6"
          >
            <h3 class="mb-4">Correct answer:</h3>
            <p>{{ correctTextAnswer }}</p>
          </div>
        </div>
        <div v-if="isNote && quizState === 'check'" class="mt-6">
          <h3 class="mb-4">Note</h3>
          <p>
            <vue-mathjax :formula="noteText"></vue-mathjax>
          </p>
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
    type: function() {
      return this.quizHandler.getType();
    },
    question: function() {
      return this.quizHandler.getQuestion();
    },
    answers: function() {
      return this.quizHandler.getAnswers();
    },
    correctTextAnswer() {
      return this.quizHandler.getCorrectTextAnswer();
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
    selectedSingleAnswer: {
      get() {
        return this.$store.state.selectedSingleAnswer;
      },
      set(value) {
        this.$store.commit("changeSelectedSingleAnswer", value);
      }
    },
    typedTextAnswer: {
      get() {
        return this.$store.state.typedTextAnswer;
      },
      set(value) {
        this.$store.commit("changeTypedTextAnswer", value);
      }
    },
    isCorrectTextAnswer: function() {
      let userAnswer = this.typedTextAnswer.trim().toLowerCase();
      let correctAnswer = this.correctTextAnswer.trim().toLowerCase();

      return userAnswer === correctAnswer;
    },
    isIdenticalTextAnswer: function() {
      let userAnswer = this.typedTextAnswer.trim();
      let correctAnswer = this.correctTextAnswer.trim();

      return userAnswer === correctAnswer;
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

#textAnswerInput {
  border: 1px solid #ccc;
  padding: 5px;
}

#textAnswerInput.correct.identical {
  background-color: #a5d6a7 !important;
}

#textAnswerInput.correct {
  background-color: #c8e6c9 !important;
}

#textAnswerInput.incorrect {
  background-color: #ffcdd2 !important;
}
</style>
