<template>
  <v-footer padless fixed class="grey lighten-3">
    <v-container style="max-width: 1200px;">
      <v-layout>
        <v-row class="mx-3" justify="center" no-gutters>
          <v-col class="pt-3 text-center" cols="6">
            <div style="width: calc(100% - 12px);">
              <span style="font-weight: bold;">13 / 14 of 25</span>
              <v-progress-linear
                v-model="quizProgress"
                color="blue-grey"
                height="25"
                reactive
                style="width: 100%;"
                value="25"
              >
                <template v-slot="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
            </div>
          </v-col>
          <v-col class="py-4 text-right" cols="6">
            <v-btn id="submitBtn" large color="primary">CHECK</v-btn>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
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

<style>
#submitBtn {
  width: 50%;
}

@media (max-width: 959px) {
  #submitBtn {
    width: calc(75% - 12px);
  }
}

@media (max-width: 599px) {
  #submitBtn {
    width: calc(100% - 12px);
  }
}
</style>
