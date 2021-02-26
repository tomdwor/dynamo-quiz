<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <markdown-it-vue class="md-body" :content="currentQuestion.question" />
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
            :id="'single-option-' + index"
            :value="option.checksum"
            :disabled="quizState === 'check'"
            class="align-start"
          >
            <div slot="label">
              <v-card
                outlined
                v-bind:class="{
                  correct: quizState === 'check' && option.is_correct,
                  incorrect: quizState === 'check' && !option.is_correct,
                  optionFocus: focusedOption === index
                }"
                v-on:click="updateFocusedOption(index)"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <markdown-it-vue class="md-body" :content="option.value" />
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </v-radio>
        </v-radio-group>
        <div v-if="currentQuestion.type === 'multi'">
          <div class="title my-4" id="howManySelectInfo">
            {{ howManySelectInfo }}
          </div>
          <v-checkbox
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :id="'multi-option-' + index"
            :disabled="quizState === 'check'"
            :checked="userMultiChoice[index].value"
            :value="option.checksum"
            @change="
              toggleMultiOption(
                index,
                userMultiChoice[index].value,
                option.checksum
              )
            "
            class="align-start"
          >
            <div slot="label">
              <v-card
                outlined
                v-bind:class="{
                  correct: quizState === 'check' && option.is_correct,
                  incorrect: quizState === 'check' && !option.is_correct,
                  optionFocus: focusedOption === index
                }"
                v-on:click="updateFocusedOption(index)"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <markdown-it-vue class="md-body" :content="option.value" />
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </v-checkbox>
        </div>
        <div v-if="currentQuestion.type === 'text'">
          <input
            id="textAnswerInput"
            v-model="userTextAnswer"
            autocomplete="off"
            v-bind:class="{ [textAnswerCheckResult]: quizState === 'check' }"
            v-focus
            @focus="handleTextAnswerInputFocus()"
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
            <markdown-it-vue class="md-body" :content="currentQuestion.note" />
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
import { isMobileDevice } from "@/helpers/browser.js";

export default {
  components: {
    MarkdownItVue
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
    howManySelectInfo: function() {
      let currentQuestion = this.quizHandler.getCurrentQuestion();
      if ("multi" !== currentQuestion.type) {
        return "";
      }
      let howMany = currentQuestion.correct.length;
      let what = howMany > 1 ? "answers" : "answer";
      return `Select ${howMany} ${what}:`;
    },
    userSingleChoice: {
      get() {
        return this.$store.state.userSingleChoice;
      },
      set(value) {
        this.$store.commit("changeUserSingleChoice", value);
      }
    },
    userMultiChoice: function() {
      return this.$store.state.userMultiChoice;
    },
    userTextAnswer: {
      get() {
        return this.$store.state.userTextAnswer;
      },
      set(value) {
        this.$store.commit("changeUserTextAnswer", value);
      }
    },
    focusedOption: function() {
      return this.$store.state.focusedOption;
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
  },
  methods: {
    toggleMultiOption(index, value, checksum) {
      this.userMultiChoice[index].value = !value;
      this.userMultiChoice[index].checksum = !value ? checksum : null;
      this.$store.commit("changeUserMultiChoice", this.userMultiChoice);
    },
    updateFocusedOption(index) {
      this.$store.commit("changeFocusedOption", index);
    },
    mod(n, m) {
      return ((n % m) + m) % m;
    },
    handleOptionFocusMove(isUp) {
      if (!["single", "multi"].includes(this.currentQuestion.type)) {
        return;
      }
      let delta = isUp ? -1 : 1;
      let oldFocusedOption = this.$store.state.focusedOption;
      let optionsNumb = this.currentQuestion.options.length;
      let newFocusedOption = this.mod(oldFocusedOption + delta, optionsNumb);
      this.$store.commit("changeFocusedOption", newFocusedOption);
    },
    handleKeyDownSpace() {
      if ("single" === this.currentQuestion.type) {
        let index = this.$store.state.focusedOption;
        document.getElementById(`single-option-${index}`).click();
      }
      if ("multi" === this.currentQuestion.type) {
        let index = this.$store.state.focusedOption;
        document.getElementById(`multi-option-${index}`).click();
      }
    },
    clickElementIfExists(element) {
      if (typeof element != "undefined" && element != null) {
        element.click();
      }
    },
    handleKeyDownEnter() {
      if ("ask" === this.quizState) {
        let elem = document.getElementById(`check-answer-btn`);
        this.clickElementIfExists(elem);
      }
      if ("check" === this.quizState) {
        let elem = document.getElementById(`next-question-btn`);
        this.clickElementIfExists(elem);
      }
    },
    handleKeyDown(e) {
      if (e.code === "Enter") {
        this.handleKeyDownEnter();
      }
      if (e.code === "Space") {
        this.handleKeyDownSpace();
      }
      if (e.code === "ArrowUp") {
        this.handleOptionFocusMove(true);
      }
      if (e.code === "ArrowDown") {
        this.handleOptionFocusMove(false);
      }
    },
    handleTextAnswerInputFocus() {
      if(isMobileDevice()) {
        window.scrollTo(0,document.body.scrollHeight);
      }
    }
  },
  created() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  directives: {
    focus: {
      inserted: function(el) {
        if (!isMobileDevice()) {
          el.focus();
        }
      }
    }
  }
};
</script>

<style>
#answer .v-item--active .v-card {
  box-shadow: 0 0 1px 2px #82b1ff;
}

#answer .v-input--checkbox.v-input--is-label-active .v-card {
  box-shadow: 0 0 1px 2px #82b1ff;
}

#answer .v-input--selection-controls__input {
  margin-top: 32px;
}

#answer .v-input__slot {
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
}

#answer .v-input--selection-controls {
  margin-top: 0;
}

#answer .v-input__control .v-messages {
  display: none !important;
}

#answer .v-input__slot {
  margin-bottom: 4px;
}

#answer label,
#answer label div {
  width: 100%;
}

.v-item--active .correct,
.v-input--checkbox.v-input--is-label-active .correct {
  background-color: #a5d6a7 !important;
}

.correct {
  background-color: #c8e6c9 !important;
}

.v-item--active .incorrect,
.v-input--checkbox.v-input--is-label-active .incorrect {
  background-color: #ffcdd2 !important;
}

@media only screen and (min-width: 960px) {
  .optionFocus {
    border: 2px dotted #aaa !important;
    margin: -1px;
  }
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
