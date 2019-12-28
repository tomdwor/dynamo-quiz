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
        <v-btn text to="/quiz">Quiz</v-btn>
        <v-btn text to="/about">About</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-bottom-navigation
      v-if="$route.fullPath.startsWith('/quiz')"
      fixed
      v-model="bottomNav"
    >
      <v-btn value="recent" href="/">
        <span>Exit</span>
        <v-icon>mdi-cancel</v-icon>
      </v-btn>

      <v-btn value="favorites">
        <span>Restart</span>
        <v-icon>mdi-replay</v-icon>
      </v-btn>

      <v-btn value="nearby">
        <span>Submit</span>
        <v-icon>mdi-play</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
