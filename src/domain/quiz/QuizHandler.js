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

  initStoreValues(quizData) {
    let questionsRandomIds = this.randomizeQuestionsIds(quizData);
    let answers = [];

    this.store.commit("changeQuizState", quizStates.START);
    this.store.commit("changeQuizData", quizData);
    this.store.commit("changeQuestionsRandomIds", questionsRandomIds);
    this.store.commit("changeAnswers", answers);
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

  getAnsweredQuestionsNumber() {
    return this.store.state.answers.length;
  }

  getAllQuestionsNumber(quizData) {
    return quizData["questions"].length;
  }

  getDisplayedQuestionsNumber(quizData) {
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
    let allQuestionsNumb = this.getAllQuestionsNumber(quizData);
    let displayedQuestionsNumber = this.getDisplayedQuestionsNumber(quizData);
    let ids_pool = Array.from(Array(allQuestionsNumb).keys());
    let random_ids = [];
    for (let i = 0; i < displayedQuestionsNumber; i++) {
      random_ids.push(
        ids_pool.splice(Math.floor(Math.random() * ids_pool.length), 1)[0]
      );
    }
    return random_ids;
  }

  startQuiz() {
    this.store.commit("changeQuizState", quizStates.ASK);
  }

  getQuestionsNumberInfo() {
    let quizData = this.store.state.quizData;
    let allQuestionsNumb = this.getAllQuestionsNumber(quizData);
    let displayedQuestionsNumber = this.getDisplayedQuestionsNumber(quizData);

    let infoText = "";
    if (allQuestionsNumb === displayedQuestionsNumber) {
      infoText = allQuestionsNumb;
    } else {
      infoText = `${displayedQuestionsNumber} of ${allQuestionsNumb}`;
    }
    return infoText;
  }
}
