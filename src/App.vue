<template>
  <v-app>
    <v-app-bar
      v-if="!$route.fullPath.startsWith('/quiz')"
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer
      v-if="$route.fullPath.startsWith('/quiz')"
      color="primary lighten-2"
      padless
      fixed
    >
      <v-row justify="center" class="grey lighten-2" no-gutters>
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
            >SUBMIT</v-btn
          >
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    quizProgress: 40
  })
};
</script>
