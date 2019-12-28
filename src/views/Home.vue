<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <QuizzesList listName="My Quizzes List" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import QuizzesList from "@/components/QuizzesList.vue";

export default {
  name: "home",
  components: {
    QuizzesList
  }
};
</script>
