import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  quizState: {},
  quizData: {},
  questionsRandomIds: {},
  answers: {}
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
  }
};

export default new Vuex.Store({
  state,
  mutations
});
