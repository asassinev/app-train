<template>
    <v-container>
        <v-layout>
            <v-flex xs12 class="text-center" v-if="loading">
              <v-progress-circular
                :size="70"
                :width="7"
                color="purple"
                indeterminate
              ></v-progress-circular>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
              <h1 class="secondary--text text-center mt-3">Orders</h1>
              <v-list
                flat
                two-line
              >
                <v-list-item v-for="order in orders" :key="order.id">
                  <template>
                    <v-list-item-action>
                      <v-checkbox
                        @change="markDone(order)"
                        :input-value="order.done"
                        color="success"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>{{ order.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        :to="'/ad/' + order.adId"
                        class="primary">
                        OPEN
                      </v-btn>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list>
            </v-flex>
            <v-flex xs12 class="text-center" v-else>
              <h1 class="secondary--text">You have no orders.</h1>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', {
        id: order.id,
        done: !order.done
      })
        .then(() => {
          order.done = !order.done
        }).catch(() => {})
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>
