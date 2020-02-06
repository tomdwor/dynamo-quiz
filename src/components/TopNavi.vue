<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/dynamoquiz_logo.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-0 hidden-sm-and-down"
        contain
        min-width="160"
        src="@/assets/dynamoquiz_name.png"
        width="160"
      />
    </div>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "TopNavi"
};
</script>
