<template>
  <div>
    <h1>{{ listName }}</h1>
    This is home page.
  </div>
</template>

<script>
export default {
  name: "QuizzesList",
  props: {
    listName: String
  }
};
</script>
