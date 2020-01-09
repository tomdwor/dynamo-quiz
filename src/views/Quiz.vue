<template>
  <v-container id="quizContainer" bg fill-height>
    <v-layout
      row
      wrap
      align-md-center
      class="mx-3"
      style="padding-bottom: 80px;"
    >
      <div>
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
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-radio-group>
              <v-radio value="1" class="align-start">
                <div slot="label">
                  <v-card outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </div>
              </v-radio>
              <v-radio value="2" class="align-start">
                <div slot="label">
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
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum. It
                        was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
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
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </div>
              </v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "quiz",
  data() {
    return {
      dialog: false,
      quizId: this.$route.params.id
    };
  },
  methods: {
    exitQuiz: function() {
      window.location.href = "/";
    }
  }
};
</script>

<style>
#quizContainer {
  max-width: 1200px;
}

.v-item--active .v-card {
  box-shadow: 0 0 1px 2px #82b1ff;
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
