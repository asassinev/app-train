<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="primary"
        v-on="on"
        v-bind="attrs">
        Buy
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-card-title>
              <h1 class="primary--text">Do you wan't to buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="name"
                label="Your name"
                type="text"
                v-model="name"
              ></v-text-field>
              <v-text-field
                name="phone"
                label="Your phone"
                type="phone"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
               @click="onCancel"
               text
               :disabled="localLoading"
              >
                Close
              </v-btn>
              <v-btn
                class="success"
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
              >
                Buy it!
              </v-btn>
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
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = ''
      this.dialog = false
    },
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id
          // ownerId: this.ad.ownerId
        })
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.dialog = false
          })
      }
    }
  }
}
</script>
