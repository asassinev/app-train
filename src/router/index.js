import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Ad from '../components/Ads/Ad'
import Adlist from '../components/Ads/AdList'
import NewAd from '../components/Ads/NewAdd'
import Login from '../components/Auth/Login'
import Registration from '../components/Auth/Registration'
import Ordeds from '../components/User/Orders'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: Ad
    },
    {
      path: '/list',
      name: 'list',
      component: Adlist,
      beforeCreate: AuthGuard
    },
    {
      path: '/new',
      name: 'newAd',
      component: NewAd,
      beforeCreate: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    },
    {
      path: '/orders',
      name: 'orders',
      component: Ordeds,
      beforeCreate: AuthGuard
    }
  ],
  mode: 'history'
})
