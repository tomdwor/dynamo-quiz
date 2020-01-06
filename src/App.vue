<template>
  <v-app>
    <TopNavi v-if="this.$router.currentRoute.name !== 'quiz'" />
    <v-content>
      <router-view />
    </v-content>
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
  }
};
</script>
