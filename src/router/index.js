import Vue from 'vue'
import Router from 'vue-router'
import ListRestaurant from '@/components/index/ListRestaurant'
import Restaurant from '@/components/restaurant/Restaurant'
import Login from '@/components/login/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'listRestaurant',
      component: ListRestaurant
    },
    {
      path: '/restaurant/:id/:menu',
      name: 'restaurant',
      component: Restaurant
    },
    {
      path: '/login/:type',
      name: 'login',
      component: Login
    }
  ]
})
