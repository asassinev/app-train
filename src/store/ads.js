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
  },
  actions: {
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
    }
  }
}
