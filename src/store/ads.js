import { Object } from 'core-js'
import firebase from 'firebase/app'
import 'firebase/firebase-database'
import 'firebase/firebase-storage'

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
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    async fetchAds ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const resultAds = []

      try {
        const fbVal = await firebase.database().ref('ads').once('value')
        const ads = fbVal.val()
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(new Ad(
            ad.title,
            ad.description,
            ad.ownerId,
            ad.src,
            ad.promo,
            key
          ))
        })
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image
      console.log(image)
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )
        const ad = await firebase.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await firebase.storage().ref(`ads/${ad.key}${imageExt}`).put(image)
        const src = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await firebase.database().ref('ads').child(ad.key).update({
          src
        })
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key,
          src
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
