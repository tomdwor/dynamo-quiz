const QUIZZES_LIST_DATA_URL = "/data/quizzes-list.json";
const QUIZ_DATA_URL_PREFIX = "/data/quiz/";

const mathJaxOptions = {
  tex2jax: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true
  }
};

export { QUIZZES_LIST_DATA_URL, QUIZ_DATA_URL_PREFIX, mathJaxOptions };
