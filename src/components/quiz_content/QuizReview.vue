<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <h2>Quiz review</h2>
        <p>Quantum mechanics</p>
        <v-card
          v-if="true"
          outlined
          color="green lighten-4"
          class="mt-5"
        >
          <v-list-item three-line>
            <v-list-item-content>
              PASS - 77%
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card
          v-else
          outlined
          color="red lighten-4"
          class="mt-5"
        >
          <v-list-item three-line>
            <v-list-item-content>
              FAIL - 55%
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <h3 class="mt-6">Stats:</h3>
        <p class="mt-2">
          All questions: <strong>13</strong><br>
          Correct: <strong>10</strong><br>
          Incorrect: <strong>3</strong><br>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "QuizReview"
};
</script>

<style>
#answers .v-item--active .v-card {
  box-shadow: 0 0 1px 2px #82b1ff;
}

#answers .v-input--selection-controls__input {
  margin-top: 32px;
}

#answers label,
#answers label div {
  width: 100%;
}
</style>
