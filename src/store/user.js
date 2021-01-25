import firebase from 'firebase/app'
import 'firebase/auth'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    reqisterUser ({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setUser', new User(user.uid))
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
