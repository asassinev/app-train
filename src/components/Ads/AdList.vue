<template>
  <v-container>
    <v-layout v-if="!loading && myAds.length !== 0">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="secondary--text text-center mt-3 mb-3">My ads</h1>
        <v-card elevation="10" class="mb-4"
          v-for="ad in myAds" :key="ad.id">
          <v-layout>
            <v-flex xs4>
              <v-img
                height="152px"
                :src="ad.src">
              </v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="primary--text">{{ ad.title }}</h2>
                <p>{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :to="'/ad/' + ad.id"
                  class="info"
                >Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && myAds.length === 0">
      <v-flex xs12 class="text-center">
        <h1 class="secondary--text">You have no ads</h1>
      </v-flex>
    </v-layout>
    <v-layout v-else>
     <v-flex xs12 class="text-center pt-5">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds () {
      return this.$store.getters.myAds
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
