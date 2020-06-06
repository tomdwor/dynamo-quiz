import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  quizState: null,
  quizData: null,
  questionsRandomIds: null,
  questionOptions: null,
  userSingleChoice: null,
  userMultiChoice: [],
  userTextAnswer: "",
  isQuestionLoading: false,
  currentQuestionShuffledOptions: [],
  userAnswerHistory: null
};

const mutations = {
  changeQuizState(state, value) {
    state.quizState = value;
  },
  changeQuizData(state, value) {
    state.quizData = value;
  },
  changeQuestionsRandomIds(state, value) {
    state.questionsRandomIds = value;
  },
  changeQuestionOptions(state, value) {
    state.questionOptions = value;
  },
  changeUserSingleChoice(state, value) {
    state.userSingleChoice = value;
  },
  changeUserMultiChoice(state, value) {
    state.userMultiChoice = value;
  },
  changeUserTextAnswer(state, value) {
    state.userTextAnswer = value;
  },
  changeIsQuestionLoading(state, value) {
    state.isQuestionLoading = value;
  },
  changeCurrentQuestionShuffledOptions(state, value) {
    state.currentQuestionShuffledOptions = value;
  },
  changeUserAnswerHistory(state, value) {
    state.userAnswerHistory = value;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
