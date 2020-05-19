import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  quizState: null,
  quizData: null,
  questionsRandomIds: null,
  options: null,
  selectedSingleAnswer: null,
  typedTextAnswer: "",
  isQuestionLoading: false
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
  changeOptions(state, value) {
    state.options = value;
  },
  changeSelectedSingleAnswer(state, value) {
    state.selectedSingleAnswer = value;
  },
  changeTypedTextAnswer(state, value) {
    state.typedTextAnswer = value;
  },
  changeIsQuestionLoading(state, value) {
    state.isQuestionLoading = value;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
