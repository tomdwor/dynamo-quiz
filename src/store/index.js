import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  quizState: null,
  quizData: null,
  questionsRandomIds: null,
  answers: null,
  userSingleChoice: null,
  userTextAnswer: "",
  isQuestionLoading: false,
  currentQuestionShuffledOptions: []
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
  changeAnswers(state, value) {
    state.answers = value;
  },
  changeUserSingleChoice(state, value) {
    state.userSingleChoice = value;
  },
  changeUserTextAnswer(state, value) {
    state.userTextAnswer = value;
  },
  changeIsQuestionLoading(state, value) {
    state.isQuestionLoading = value;
  },
  changeCurrentQuestionShuffledOptions(state, value) {
    state.currentQuestionShuffledOptions = value;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
