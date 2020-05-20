import md5 from "crypto-js/md5";
import { shuffle } from "@/domain/utils/array.js";

const quizStates = {
  START: "start",
  ASK: "ask",
  CHECK: "check",
  REVIEW: "review"
};

export default class QuizHandler {
  constructor(store) {
    this.store = store;
  }

  initQuiz(quizData) {
    this.initStoreValues(quizData);
  }

  resetStoreValues() {
    this.store.commit("changeQuizState", null);
    this.store.commit("changeQuizData", null);
    this.store.commit("changeQuestionsRandomIds", null);
    this.store.commit("changeAnswers", null);

    this.store.commit("changeUserSingleChoice", null);
    this.store.commit("changeUserMultiChoice", null);
    this.store.commit("changeUserTextAnswer", "");
    this.store.commit("changeIsQuestionLoading", false);
  }

  initStoreValues(quizData) {
    let questionsRandomIds = this.randomizeQuestionsIds(quizData);
    let options = [];

    this.store.commit("changeQuizState", quizStates.START);
    this.store.commit("changeQuizData", quizData);
    this.store.commit("changeQuestionsRandomIds", questionsRandomIds);
    this.store.commit("changeAnswers", options);

    this.store.commit("changeUserSingleChoice", null);
    this.store.commit("changeUserMultiChoice", null);
    this.store.commit("changeUserTextAnswer", "");
    this.store.commit("changeIsQuestionLoading", false);
  }

  getQuizState() {
    return this.store.state.quizState;
  }

  getQuizTitle() {
    return this.store.state.quizData["title"];
  }

  getQuizDescription() {
    return this.store.state.quizData["description"];
  }

  getPassThreshold() {
    return this.store.state.quizData["pass_threshold"];
  }

  _getAllQuestionsNumber(quizData) {
    return quizData["questions"].length;
  }

  _getDisplayedQuestionsNumber(quizData) {
    let displayedQuestionsNumber = quizData["questions"].length;
    if (
      "questions_numb" in quizData &&
      quizData["questions_numb"] < displayedQuestionsNumber
    ) {
      displayedQuestionsNumber = quizData["questions_numb"];
    }
    return displayedQuestionsNumber;
  }

  randomizeQuestionsIds(quizData) {
    let allQuestionsNumb = this._getAllQuestionsNumber(quizData);
    let displayedQuestionsNumber = this._getDisplayedQuestionsNumber(quizData);
    let ids_pool = Array.from(Array(allQuestionsNumb).keys());
    let random_ids = [];
    for (let i = 0; i < displayedQuestionsNumber; i++) {
      random_ids.push(
        ids_pool.splice(Math.floor(Math.random() * ids_pool.length), 1)[0]
      );
    }
    return random_ids;
  }

  _getCurrentQuestionId() {
    let index = this.store.state.answers.length;
    if (this.store.state.quizState === quizStates.CHECK) {
      index--;
    }
    return this.store.state.questionsRandomIds[index];
  }

  _getCurrentQuestionData() {
    let currentQuestionId = this._getCurrentQuestionId();
    return this.store.state.quizData.questions[currentQuestionId];
  }

  startQuiz() {
    this.store.commit("changeIsQuestionLoading", true);
    let that = this;
    setTimeout(function() {
      that.store.commit("changeQuizState", quizStates.ASK);
      that.store.commit("changeIsQuestionLoading", false);
    }, 500);
  }

  repeatQuiz() {
    let quizData = this.store.state.quizData;
    this.initQuiz(quizData);
    this.startQuiz();
  }

  checkAnswer() {
    let currentQuestionData = this._getCurrentQuestionData();
    let options = this.store.state.answers;
    let currentQuestionId = this._getCurrentQuestionId();

    let userAnswer = null;
    let correctAnswer = null;
    let result = null;

    if ("single" === currentQuestionData["type"]) {
      userAnswer = this.store.state.userSingleChoice.toString();
      let correctAnswerIndex = currentQuestionData["correct"][0] - 1;
      correctAnswer = md5(
        currentQuestionData["options"][correctAnswerIndex]
      ).toString();
      result = userAnswer === correctAnswer;
    }

    if ("multi" === currentQuestionData["type"]) {
      let userAnswers = [];
      for (let i = 0; i < this.store.state.userMultiChoice.length; i++) {
        if (this.store.state.userMultiChoice[i].value === true) {
          userAnswers.push(
            this.store.state.userMultiChoice[i].checksum.toString()
          );
        }
      }
      let correctAnswers = [];
      for (let i = 0; i < currentQuestionData["correct"].length; i++) {
        let correctAnswerIndex = currentQuestionData["correct"][i] - 1;
        correctAnswers.push(
          md5(currentQuestionData["options"][correctAnswerIndex]).toString()
        );
      }
      result =
        JSON.stringify(userAnswers.sort()) ===
        JSON.stringify(correctAnswers.sort());
    }

    if ("text" === currentQuestionData["type"]) {
      userAnswer = this.store.state.userTextAnswer.trim().toLowerCase();
      correctAnswer = currentQuestionData["answer"].trim().toLowerCase();
      result = userAnswer === correctAnswer;
    }

    if (result) {
      options.push({ id: currentQuestionId, isCorrect: true });
    } else {
      options.push({ id: currentQuestionId, isCorrect: false });
    }

    this.store.commit("changeAnswers", options);
    this.store.commit("changeQuizState", quizStates.CHECK);
  }

  nextQuestion() {
    let quizData = this.store.state.quizData;
    let displayedQuestionsNumber = this._getDisplayedQuestionsNumber(quizData);
    this.store.commit("changeUserSingleChoice", null);
    this.store.commit("changeUserMultiChoice", null);
    this.store.commit("changeUserTextAnswer", "");
    this.store.commit("changeCurrentQuestionShuffledOptions", []);

    this.store.commit("changeIsQuestionLoading", true);
    let that = this;
    setTimeout(function() {
      if (that.store.state.answers.length === displayedQuestionsNumber) {
        that.store.commit("changeQuizState", quizStates.REVIEW);
      } else {
        that.store.commit("changeQuizState", quizStates.ASK);
      }
      that.store.commit("changeIsQuestionLoading", false);
    }, 500);
  }

  _shuffledCurrentQuestionOptions(currentQuestionData) {
    let options = [];
    if (["single", "multi"].includes(currentQuestionData["type"])) {
      for (let i = 0; i < currentQuestionData["options"].length; i++) {
        options.push({
          value: currentQuestionData["options"][i],
          is_correct: currentQuestionData["correct"].includes(i + 1),
          checksum: md5(currentQuestionData["options"][i])
        });
      }
    }
    return shuffle(options);
  }

  _prepareUserMultiChoice(currentQuestionData) {
    let userMultiChoice = [];
    for (let i = 0; i < currentQuestionData["options"].length; i++) {
      userMultiChoice.push({ id: i + 1, value: false, checksum: null });
    }
    return userMultiChoice;
  }

  getCurrentQuestion() {
    let currentQuestionData = this._getCurrentQuestionData();

    let options = [];
    if (["single", "multi"].includes(currentQuestionData["type"])) {
      options = this.store.state.currentQuestionShuffledOptions;
      if (options.length === 0) {
        options = this._shuffledCurrentQuestionOptions(currentQuestionData);
        this.store.commit("changeCurrentQuestionShuffledOptions", options);
        if ("multi" === currentQuestionData["type"]) {
          let userMultiChoice = this._prepareUserMultiChoice(
            currentQuestionData
          );
          this.store.commit("changeUserMultiChoice", userMultiChoice);
        }
      }
    }

    return {
      type: currentQuestionData["type"],
      question: currentQuestionData["question"],
      options: this.store.state.currentQuestionShuffledOptions,
      answer:
        "text" === currentQuestionData["type"]
          ? currentQuestionData["answer"]
          : "",
      note: "note" in currentQuestionData ? currentQuestionData["note"] : ""
    };
  }

  getQuizStatistics() {
    let quizData = this.store.state.quizData;
    let index =
      this.store.state.answers.length +
      (this.store.state.quizState !== quizStates.CHECK ? 1 : 0);
    let displayedQuestionsNumber = this._getDisplayedQuestionsNumber(quizData);

    let correctNumber = 0;
    for (let i = 0; i < this.store.state.answers.length; i++) {
      if (this.store.state.answers[i]["isCorrect"]) {
        correctNumber++;
      }
    }

    let allQuestionsNumb = this._getAllQuestionsNumber(quizData);
    let infoText = "";
    if (allQuestionsNumb === displayedQuestionsNumber) {
      infoText = `${displayedQuestionsNumber} questions`;
    } else {
      infoText = `${displayedQuestionsNumber} of ${allQuestionsNumb} questions`;
    }

    return {
      questionsNumber: displayedQuestionsNumber,
      questionsBaseSize: allQuestionsNumb,
      answersNumber: this.store.state.answers.length,
      currentQuestionNumber: index,
      correctAnswersNumber: correctNumber,
      incorrectAnswersNumber: displayedQuestionsNumber - correctNumber,
      correctPercentage: Math.round(
        (100 * correctNumber) / displayedQuestionsNumber
      ),
      questionsNumberInfo: infoText,
      progress: Math.round(
        (100 * this.store.state.answers.length) / displayedQuestionsNumber
      )
    };
  }
}
