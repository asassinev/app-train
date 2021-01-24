<template>
  <v-container >
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="secondary--text text-center mt-3">Create new ad</h1>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            name="title"
            label="Ad title"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>
          <v-textarea
            name="description"
            label="Ad description"
            type="text"
            v-model="description"
            required
            :rules="[v => !!v || 'Description is required']"
          ></v-textarea>
        </v-form>
        <v-layout class="mb-5 mt-5">
          <v-flex>
            <v-btn
              class="warning">
              Upload
              <v-icon right dark>
                mdi-cloud-upload
              </v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex v-show="src">
            <img src="" height="100">
          </v-flex>
        </v-layout>
        <v-layout
          class="px-0"
          fluid>
          <v-switch
            color="primary"
            v-model="promo"
            label="Add to promo?"
          ></v-switch>
        </v-layout>
        <v-layout
          class="row mt-3 px-0">
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              class="success ml-3"
              @click="createAd">Create ad</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      src: false
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo
        }
        console.log(ad)
      }
    }
  }
}
</script>
