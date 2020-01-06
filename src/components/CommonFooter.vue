<template>
  <v-footer class="font-weight-medium grey lighten-3">
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} - <strong>Dynamo Quiz</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "CommonFooter"
};
</script>
