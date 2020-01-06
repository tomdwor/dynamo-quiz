<template>
  <v-card id="quizzesList" class="mt-6">
    <v-card-title>
      {{ listName }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      sort-field="name"
      disable-pagination
      hide-default-header
      hide-default-footer
    >
      <template slot="header">
        <tr class="grey lighten-4">
          <th>Quiz name</th>
          <th>Category</th>
          <th>&nbsp;</th>
        </tr>
      </template>
      <template slot="item" slot-scope="props">
        <tr>
          <td class="text-left">
            <a :href="'/quiz/' + props.item.id">{{ props.item.name }}</a>
          </td>
          <td class="text-left">{{ props.item.category }}</td>
          <td class="text-right">
            <v-btn
              icon
              class="primary--text ma-0"
              :href="'/quiz/' + props.item.id"
            >
              <v-icon>remove_red_eye</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "QuizzesList",
  props: {
    listName: String
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Quiz name", value: "name", align: "left" },
        { text: "Category", value: "category" },
        { text: "", sortable: false }
      ],
      items: [
        {
          name: "Quantum physics",
          category: "Physics",
          id: "quantum-physics"
        },
        {
          name: "Special relativity",
          category: "Physics",
          id: "special-relativity"
        },
        {
          name: "General relativity",
          category: "Physics",
          id: "general-relativity"
        }
      ]
    };
  }
};
</script>

<style>
#quizzesList table td,
#quizzesList table th {
  font-size: 16px !important;
}
</style>
