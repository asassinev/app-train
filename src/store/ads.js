import firebase from 'firebase/app'
import 'firebase/firebase-database'

class Ad {
  constructor (
    title,
    description,
    ownerId,
    src = '',
    promo = false,
    id = null
  ) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.src = src
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: [
      {
        title: 'First ad',
        description: 'Description',
        promo: false,
        id: '1',
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
      },
      {
        title: 'Second ad',
        description: 'Description',
        promo: true,
        id: '2',
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
      },
      {
        title: 'Third ad',
        description: 'Description',
        promo: true,
        id: '3',
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
      },
      {
        title: 'Four ad',
        description: 'Description',
        promo: true,
        id: '4',
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.src,
          payload.promo
        )
        const ad = await firebase.database().ref('ads').push(newAd)

        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
