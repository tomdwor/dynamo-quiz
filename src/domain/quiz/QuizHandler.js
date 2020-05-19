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

    if ("single" === currentQuestionData["type"]) {
      userAnswer = this.store.state.userSingleChoice;
      correctAnswer = currentQuestionData["correct"][0];
    }

    if ("text" === currentQuestionData["type"]) {
      userAnswer = this.store.state.userTextAnswer.trim().toLowerCase();
      correctAnswer = currentQuestionData["answer"].trim().toLowerCase();
    }

    if (userAnswer === correctAnswer) {
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
    this.store.commit("changeUserTextAnswer", "");

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

  getCurrentQuestion() {
    let currentQuestionData = this._getCurrentQuestionData();

    let options = [];
    if (["single", "multi"].includes(currentQuestionData["type"])) {
      for (let i = 0; i < currentQuestionData["options"].length; i++) {
        options.push({
          value: currentQuestionData["options"][i],
          is_correct: currentQuestionData["correct"].includes(i + 1)
        });
      }
    }

    return {
      type: currentQuestionData["type"],
      question: currentQuestionData["question"],
      options: options,
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
      infoText = allQuestionsNumb;
    } else {
      infoText = `${displayedQuestionsNumber} of ${allQuestionsNumb}`;
    }

    return {
      questionsNumber: displayedQuestionsNumber,
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
