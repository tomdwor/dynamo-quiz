<template>
  <v-container>
    <v-layout text-center wrap>
      <transition name="fade">
        <v-flex mb-4 v-if="!isLoading">
          <v-card id="quizzesList" class="mt-6">
            <v-card-title>
              Quizzes list
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
                </tr>
              </template>
              <template slot="item" slot-scope="props">
                <tr>
                  <td class="text-left">
                    <a :href="'/quiz/' + props.item.id">{{
                      props.item.name
                    }}</a>
                  </td>
                  <td class="text-left">{{ props.item.category }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </transition>
      <Loader :isLoading="isLoading" />
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { QUIZZES_LIST_DATA_URL } from "@/config.js";
import Loader from "@/components/Loader.vue";

export default {
  name: "home",
  components: {
    Loader
  },
  data() {
    return {
      search: "",
      isLoading: true,
      headers: [
        { text: "Quiz name", value: "name", align: "left" },
        { text: "Category", value: "category" },
        { text: "", sortable: false }
      ],
      items: []
    };
  },
  mounted() {
    let that = this;
    axios.get(QUIZZES_LIST_DATA_URL).then(function(response) {
      that.isLoading = false;
      that.items = response.data;
    });
    // TODO: handle not-found / error cases
  }
};
</script>

<style>
#quizzesList table td,
#quizzesList table th {
  font-size: 16px !important;
}

#quizzesList table th {
  padding: 12px 16px;
  text-align: left;
}
</style>
