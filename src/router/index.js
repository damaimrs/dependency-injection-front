import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Customer from '@/pages/Customer'
import Address from '@/pages/Address'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    }
  ]
})
