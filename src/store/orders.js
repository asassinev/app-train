export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder (state, payload) {
      state.orders.push(payload)
    }
  },
  actions: {
    async CreateOrder () {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 4000)
      })
    }
  },
  getters: {}
}
