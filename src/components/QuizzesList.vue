<template>
  <div>
    <h1>{{ listName }}</h1>
    <p>
      <a href="/quiz">This is an example quiz</a>
    </p>
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
