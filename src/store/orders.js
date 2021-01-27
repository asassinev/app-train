import firebase from 'firebase/app'
import 'firebase/firebase-database'

class Orders {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder (state, payload) {
      state.orders.push(payload)
    },
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({ commit }, { name, phone, adId, ownerId }) {
      const order = new Orders(name, phone, adId)
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders ({ commit, getters }) {
      commit('setLoading', true)
      commit('clearError')

      const resultOrders = []

      try {
        const fbVal = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        Object.keys(orders).forEach(key => {
          const o = orders[key]
          resultOrders.push(
            new Orders(o.name, o.phone, o.adId, o.done, key)
          )
        })
        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async markOrderDone ({ commit, getters }, { id, done }) {
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${getters.user.id}/orders`).child(id).update({
          done: done
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(o => o.done)
    },
    unDoneOrders (state) {
      return state.orders.filter(o => !o.done)
    },
    orders (state, getters) {
      return getters.unDoneOrders.concat(getters.doneOrders)
    }
  }
}
