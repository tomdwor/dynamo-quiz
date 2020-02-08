<template>
  <v-container id="quizContainer" bg fill-height>
    <v-layout
      row
      wrap
      align-md-center
      class="mx-3"
      style="padding-bottom: 80px;"
    >
      <transition name="fade">
        <div v-if="!isLoading">
          <v-row>
            <v-col class="py-4 text-left" cols="8">
              <h2>Question 15 of 25</h2>
            </v-col>
            <v-col class="py-4 text-right" cols="4">
              <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on">Exit quiz</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Exit quiz</v-card-title>
                  <v-card-text>Are you sure you want to exit quiz?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" text @click="dialog = false"
                      >Cancel</v-btn
                    >
                    <v-btn color="red darken-1" text @click="exitQuiz"
                      >EXIT</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>

          <hr class="mt-2 mb-6" />

          <v-row class="mb-3">
            <v-col>
              (Quiz ID: {{ quizId }})<br /><br />

              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </v-col>
          </v-row>
          <v-row id="answers">
            <v-col>
              <v-radio-group>
                <v-radio value="1" class="align-start">
                  <div slot="label">
                    <v-card outlined>
                      <v-list-item three-line>
                        <v-list-item-content>
                          Lorem Ipsum is simply dummy text.
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </div>
                </v-radio>
                <v-radio value="2" class="align-start">
                  <div slot="label" width="100%">
                    <v-card outlined>
                      <v-list-item three-line>
                        <v-list-item-content>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </div>
                </v-radio>
                <v-radio value="3" class="align-start">
                  <div slot="label">
                    <v-card outlined>
                      <v-list-item three-line>
                        <v-list-item-content>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </div>
                </v-radio>
                <v-radio value="4" class="align-start">
                  <div slot="label">
                    <v-card outlined>
                      <v-list-item three-line>
                        <v-list-item-content>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged.
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </div>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </div>
      </transition>
      <Loader :isLoading="isLoading" />
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store/index";
import axios from "axios";
import { QUIZ_DATA_URL_PREFIX } from "@/config.js";
import Loader from "@/components/Loader.vue";
import Quiz from "@/domain/quiz/Quiz.js";

export default {
  name: "quiz",
  components: {
    Loader
  },
  store,
  data() {
    let quiz = new Quiz(store);
    return {
      dialog: false,
      quizId: this.$route.params.id,
      isLoading: true,
      quiz
    };
  },
  methods: {
    exitQuiz: function() {
      window.location.href = "/";
    },
    validQuizID: function(quizID) {
      let patt = new RegExp("^[a-z][a-z0-9]*(\\-[a-z0-9]+)*$");
      return patt.test(quizID);
    }
  },
  mounted() {
    let that = this;
    if (this.validQuizID(that.quizId)) {
      let file_name = `${that.quizId}.json`;
      axios.get(`${QUIZ_DATA_URL_PREFIX}${file_name}`).then(function(response) {
        that.isLoading = false;
        that.quiz.initQuiz(response.data);
      });
      // TODO: handle not-found / error cases
    } else {
      alert("Invalid quiz ID");
      window.location.href = "/";
    }
  }
};
</script>

<style>
#quizContainer {
  max-width: 1200px;
}

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

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  margin: 1em 0;
  padding: 0;
}
</style>
