<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <vue-mathjax :formula="currentQuestion.question"></vue-mathjax>
      </v-col>
    </v-row>
    <v-row id="answer">
      <v-col>
        <v-radio-group
          v-if="currentQuestion.type === 'single'"
          v-model="userSingleChoice"
        >
          <v-radio
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :value="option.checksum"
            :disabled="quizState === 'check'"
            class="align-start"
          >
            <div slot="label">
              <v-card
                outlined
                v-bind:class="{
                  correct: quizState === 'check' && option.is_correct,
                  incorrect: quizState === 'check' && !option.is_correct
                }"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <vue-mathjax :formula="option.value"></vue-mathjax>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </v-radio>
        </v-radio-group>
        <div v-if="currentQuestion.type === 'text'">
          <input
            id="textAnswerInput"
            v-model="userTextAnswer"
            autocomplete="off"
            v-bind:class="{ [textAnswerCheckResult]: quizState === 'check' }"
            ref="textAnswerInput"
          />
          <div
            v-if="
              quizState === 'check' && textAnswerCheckResult !== 'identical'
            "
            class="mt-6"
          >
            <h3 class="mb-4">Correct answer:</h3>
            <p>{{ currentQuestion.answer }}</p>
          </div>
        </div>
        <div
          v-if="currentQuestion.note !== '' && quizState === 'check'"
          class="mt-6"
        >
          <h3 class="mb-4">Note</h3>
          <p>
            <vue-mathjax :formula="currentQuestion.note"></vue-mathjax>
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
    currentQuestion: function() {
      return this.quizHandler.getCurrentQuestion();
    },
    userSingleChoice: {
      get() {
        return this.$store.state.userSingleChoice;
      },
      set(value) {
        this.$store.commit("changeUserSingleChoice", value);
      }
    },
    userTextAnswer: {
      get() {
        return this.$store.state.userTextAnswer;
      },
      set(value) {
        this.$store.commit("changeUserTextAnswer", value);
      }
    },
    textAnswerCheckResult: function() {
      let userAnswer = this.userTextAnswer.trim();
      let correctAnswer = this.currentQuestion.answer.trim();
      if (userAnswer === correctAnswer) {
        return "identical";
      }
      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        return "correct";
      }
      return "incorrect";
    }
  }
};
</script>

<style>
#answer .v-item--active .v-card {
  box-shadow: 0 0 1px 2px #82b1ff;
}

#answer .v-input--selection-controls__input {
  margin-top: 32px;
}

#answer label,
#answer label div {
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
  padding: 10px;
  width: 100%;
}

#textAnswerInput.identical {
  background-color: #a5d6a7 !important;
}

#textAnswerInput.correct {
  background-color: #c8e6c9 !important;
}

#textAnswerInput.incorrect {
  background-color: #ffcdd2 !important;
}
</style>
