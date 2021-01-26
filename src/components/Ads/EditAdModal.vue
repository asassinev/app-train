<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="warning"
        v-on="on"
        v-bind="attrs">
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-card-title>
              <h1 class="primary--text">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="title"
                type="text"
                v-model="editedTitle"
              ></v-text-field>
              <v-textarea
                name="description"
                label="description"
                type="text"
                v-model="editedDescription"
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="onCancel" text>Cancel</v-btn>
              <v-btn class="success" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      dialog: false,
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },
  methods: {
    onCancel () {
      this.title = this.ad.title
      this.editedDescription = this.ad.description
      this.dialog = false
    },
    onSave () {
      if (this.editedDescription !== '' && this.editedTitle !== '') {
        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })
        this.dialog = false
      }
    }
  }
}
</script>
