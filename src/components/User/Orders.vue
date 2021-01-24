<template>
    <v-container>
        <v-layout row mt-2>
            <v-flex xs12 md6 offset-sm3>
              <h1 class="secondary--text text-center">Orders</h1>
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
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      orders: [
        {
          id: '1',
          name: 'Evgeny',
          phone: '7-999-213-231-22',
          adId: '11',
          done: false
        },
        {
          id: '2',
          name: 'Evgeny2',
          phone: '7-999-213-231-22',
          adId: '12',
          done: false
        },
        {
          id: '3',
          name: 'Evgeny3',
          phone: '7-999-213-231-22',
          adId: '13',
          done: true
        }
      ]
    }
  },
  methods: {
    markDone (order) {
      order.done = true
      console.log(order.done)
    }
  }
}
</script>
