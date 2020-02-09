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

    this.store.commit("changeCheckedAnswer", null);
    this.store.commit("changeIsQuestionLoading", false);
  }

  initStoreValues(quizData) {
    let questionsRandomIds = this.randomizeQuestionsIds(quizData);
    let answers = [];

    this.store.commit("changeQuizState", quizStates.START);
    this.store.commit("changeQuizData", quizData);
    this.store.commit("changeQuestionsRandomIds", questionsRandomIds);
    this.store.commit("changeAnswers", answers);

    this.store.commit("changeCheckedAnswer", null);
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

  checkAnswer() {
    let currentQuestionData = this._getCurrentQuestionData();
    let answers = this.store.state.answers;
    let currentQuestionId = this._getCurrentQuestionId();

    if (this.store.state.checkedAnswer === currentQuestionData["correct"][0]) {
      answers.push({ id: currentQuestionId, isCorrect: true });
    } else {
      answers.push({ id: currentQuestionId, isCorrect: false });
    }

    this.store.commit("changeAnswers", answers);
    this.store.commit("changeQuizState", quizStates.CHECK);
  }

  nextQuestion() {
    let quizData = this.store.state.quizData;
    let displayedQuestionsNumber = this._getDisplayedQuestionsNumber(quizData);
    this.store.commit("changeCheckedAnswer", null);

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

  getQuestion() {
    let currentQuestionData = this._getCurrentQuestionData();
    return currentQuestionData["question"];
  }

  getAnswers() {
    let currentQuestionData = this._getCurrentQuestionData();
    let answers = [];
    for (let i = 0; i < currentQuestionData["answers"].length; i++) {
      answers.push({
        value: currentQuestionData["answers"][i],
        is_correct: currentQuestionData["correct"].includes(i + 1)
      });
    }
    return answers;
  }

  getQuestionNote() {
    let currentQuestionData = this._getCurrentQuestionData();
    let note = null;
    if ("note" in currentQuestionData && currentQuestionData["note"] !== "") {
      note = currentQuestionData["note"];
    }
    return note;
  }

  getQuestionsNumber() {
    let quizData = this.store.state.quizData;
    return this._getDisplayedQuestionsNumber(quizData);
  }

  getAnswersNumber() {
    return this.store.state.answers.length;
  }

  getCurrentQuestionNumber() {
    let index = this.store.state.answers.length;
    if (this.store.state.quizState === quizStates.CHECK) {
      index--;
    }
    return index + 1;
  }

  getCorrectAnswersNumber() {
    let correctNumber = 0;
    for (let i = 0; i < this.store.state.answers.length; i++) {
      if (this.store.state.answers[i]["isCorrect"]) {
        correctNumber++;
      }
    }
    return correctNumber;
  }

  getQuestionsNumberInfo() {
    let quizData = this.store.state.quizData;
    let allQuestionsNumb = this._getAllQuestionsNumber(quizData);
    let displayedQuestionsNumber = this._getDisplayedQuestionsNumber(quizData);

    let infoText = "";
    if (allQuestionsNumb === displayedQuestionsNumber) {
      infoText = allQuestionsNumb;
    } else {
      infoText = `${displayedQuestionsNumber} of ${allQuestionsNumb}`;
    }
    return infoText;
  }

  repeatQuiz() {
    let quizData = this.store.state.quizData;
    this.initQuiz(quizData);
    this.startQuiz();
  }
}
