<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
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
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
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
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum. It
                    was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
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
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "QuizQuestion"
};
</script>

<style>
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
</style>
