<template>
  <v-footer padless fixed>
    <v-row justify="center" class="grey lighten-3" no-gutters>
      <v-col class="py-4 text-center" cols="6">
        <span style="font-weight: bold;">13 / 14 of 25</span>
        <v-progress-linear
          v-model="quizProgress"
          color="blue-grey"
          height="25"
          reactive
          style="width: 33%; min-width: 160px; margin: 0 auto;"
          value="25"
        >
          <template v-slot="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
      </v-col>
      <v-col class="py-4 text-center" cols="6">
        <v-btn large color="primary" style="width: 33%; min-width: 160px;"
          >CHECK</v-btn
        >
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "QuizBottomNavi",
  data: () => ({
    quizProgress: 40
  })
};
</script>
