<template>
  <div>
    <div v-if="!loading">
      <v-container fluid>
        <v-layout row>
            <v-flex xs12>
              <v-carousel>
                <v-carousel-item
                  v-for="(ad) in promoAds"
                  :key="ad.id"
                  :src="ad.src"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                >
                  <div class="car-link">
                    <v-btn class="error" :to="'/ad/' + ad.id"> {{ ad.title }}</v-btn>
                  </div>
                </v-carousel-item>
              </v-carousel>
            </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-lg>
        <v-layout row wrap>
              <v-flex xs12 sm6 md4 v-for="ad of ads" :key="ad.id">
                  <v-card
                  >
                    <v-img
                      class="white--text align-end"
                      height="300px"
                      :src="ad.src"
                    >
                      <v-card-title>{{ ad.title }}</v-card-title>
                    </v-img>
                    <v-card-subtitle class="pb-0">
                      {{ ad.description }}
                    </v-card-subtitle>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        :to="'/ad/' + ad.id"
                      >
                        Open
                      </v-btn>
                      <buy-modal :ad="ad"></buy-modal>
                    </v-card-actions>
                  </v-card>
              </v-flex>
          </v-layout>
      </v-container>
    </div>
    <div v-else>
      <v-container>
        <v-layout>
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
    </div>
  </div>
</template>

<script>
import BuyModal from './Shared/BuyModal.vue'
export default {
  components: { BuyModal },
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, 0.3);
    transform: translate(-50%, 0);
    padding: 8px 18px ;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }
</style>
