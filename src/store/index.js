import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  quizState: {}, // 'start', 'ask', 'check', 'review'
  quizData: {},
  questionsRandomList: {},
  answers: {}
};

const mutations = {
  changeQuizState(state, payload) {
    state.quizState = payload.value;
  },
  changeQuizData(state, payload) {
    state.quizData = payload.value;
  },
  changeQuestionsRandomList(state, payload) {
    state.questionsRandomList = payload.value;
  },
  changeAnswers(state, payload) {
    state.answers = payload.value;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
