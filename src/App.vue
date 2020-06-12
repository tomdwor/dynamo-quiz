<template>
  <v-app
    id="appContent"
    v-bind:class="{
      'hide-controls': hideControls,
      'quiz-in-progress': isQuizInProgress
    }"
  >
    <TopNavi v-if="this.$router.currentRoute.name !== 'quiz'" />
    <v-main>
      <router-view />
    </v-main>
    <QuizBottomNavi v-if="this.$router.currentRoute.name === 'quiz'" />
    <CommonFooter v-else />
  </v-app>
</template>

<script>
import TopNavi from "@/components/TopNavi.vue";
import CommonFooter from "@/components/CommonFooter.vue";
import QuizBottomNavi from "@/components/QuizBottomNavi.vue";

export default {
  name: "App",
  components: {
    TopNavi,
    CommonFooter,
    QuizBottomNavi
  },
  data() {
    return {
      hideControls: false
    };
  },
  computed: {
    isQuizInProgress() {
      let quizState = this.$store.state.quizState;
      return ["ask", "check"].includes(quizState);
    }
  },
  methods: {
    hideControlsAfterInterval() {
      this.hideControls = false;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.hideControls = true;
      }, 3000);
    }
  },
  mounted() {
    this.timer = null;
    window.addEventListener("mousemove", this.hideControlsAfterInterval);
    this.hideControlsAfterInterval();
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.MathJax_Display {
  margin: 20px 0 !important;
}

#appContent.hide-controls.quiz-in-progress * {
  cursor: none !important;
}
</style>
