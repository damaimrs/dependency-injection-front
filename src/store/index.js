import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    customers: [],
    addresses: []
  },
  mutations: {
    customers(state, response) {
      state.customers = response;
    },
    addresses(state, response) {
      state.addresses = response
    }
  },
  getters: {
    getCustomers: (state) => {
      return state.customers
    },
    getAddresses: (state) => {
      return state.addresses
    }
  },
  actions: {
    doGetCustomers: ({commit}) => {
      const URL ='/api/customers'
      axios.get(URL)
        .then( response => {
          commit('customers', response.data)
        })
        .catch( error => {
          alert("your request error!")
        })
    },
    doGetAddresses: ({commit}, customerId) => {
      const URL ='/api/customer/' + customerId + '/address'
      axios.get(URL)
        .then( response => {
          commit('addresses', response.data)
        })
        .catch( error => {
          alert("your request error!")
        })
    }
  }
})

export default store
