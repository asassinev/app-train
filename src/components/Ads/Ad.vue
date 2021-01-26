<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card v-if="!loading">
                  <v-img
                    :src="ad.src"
                    height="300px"></v-img>
                  <v-card-text>
                    <h1 class="primary--text mb-2">{{ ad.title }}</h1>
                    <p>{{ ad.description }}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <editAdModel :ad="ad"></editAdModel>
                    <v-btn class="success">Buy</v-btn>
                  </v-card-actions>
                </v-card>
                <div v-else class="text-center">
                  <v-progress-circular
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
                  ></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import editAdModel from './EditAdModal'

export default {
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  components: {
    editAdModel
  }
}
</script>
