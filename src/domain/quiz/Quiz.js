const quizStates = {
  START: "start",
  ASK: "ask",
  CHECK: "check",
  REVIEW: "review"
};

export default class Quiz {
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

  getAnsweredQuestionsNumber() {
    return this.store.state.answers.length;
  }

  randomizeQuestionsIds(quizData) {
    let all_questions_numb = quizData["questions"].length;
    let show_questions_numb = all_questions_numb;
    if (
      "questions_numb" in quizData &&
      quizData["questions_numb"] < show_questions_numb
    ) {
      show_questions_numb = quizData["questions_numb"];
    }
    let ids_pool = Array.from(Array(all_questions_numb).keys());
    let random_ids = [];
    for (let i = 0; i < show_questions_numb; i++) {
      random_ids.push(
        ids_pool.splice(Math.floor(Math.random() * ids_pool.length), 1)[0]
      );
    }
    return random_ids;
  }
}
