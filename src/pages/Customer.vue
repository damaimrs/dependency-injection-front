<template>
  <div>
    <div class="register-customer">
      <div class="title is-2">Register Customer</div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" id="input-register" type="text" placeholder="insert your name.." v-model="name">
        </div>
      </div>
      <div>
        <a class="button is-primary" @click="doPost">Register</a>
      </div>
    </div>
    <br><br>
    <div class="list-customer">
      <div class="title is-2">Customer List</div>
      <table class="table is-striped">
        <thead>
          <th>Name</th>
          <th>Delete</th>
          <th>Edit</th>
          <th>Add Address</th>
          <th>Get Address</th>
        </thead>

        <tbody>
          <tr v-for="item in Customers" :key="item.idCustomer">
            <td>{{ item.name }}</td>
            <td><a class="button is-danger" @click="doDelete(item.idCustomer)">Delete</a></td>
            <td>
              <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                  <a aria-haspopup="true" aria-controls="dropdown-menu4">
                    <div class="button is-primary">Edit</div>
                    <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
                <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item">
                      <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                          <input class="input" type="text" placeholder="insert your name.." v-model="editName">
                        </div>
                      </div>
                      <div>
                        <a class="button is-warning" @click="doEditName(item.idCustomer)">Edit</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                  <a aria-haspopup="true" aria-controls="dropdown-menu4">
                    <div class="button is-primary">Add Address</div>
                    <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
                <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item">
                      <div class="field">
                        <label class="label">Street</label>
                        <div class="control">
                          <input class="input" type="text" placeholder="insert street.." v-model="registerStreet">
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Country</label>
                        <div class="control">
                          <input class="input" type="text" placeholder="insert country.." v-model="registerCountry">
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Province</label>
                        <div class="control">
                          <input class="input" type="text" placeholder="insert province.." v-model="registerProvince">
                        </div>
                      </div>
                      <div>
                        <a class="button is-warning" @click="doPostAddress(item.idCustomer)">Register</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td><a class="button is-primary" @click="getAddresses(item.idCustomer)">Get Address</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <br><br>
    <div class="list-address">
      <div class="title is-2">List Address</div>
      <table class="table is-striped">
        <thead>
          <th>Name</th>
          <th>Street</th>
          <th>Country</th>
          <th>Province</th>
          <th>Delete</th>
        </thead>
        <tbody>
          <tr v-for="item in Addresses" :key="item.idAddress">
            <td> {{item.customer.name}} </td>
            <td> {{item.street}} </td>
            <td> {{item.country}} </td>
            <td> {{item.province}} </td>
            <td><a class="button is-danger" @click="doDeleteAddress(item.customer.idCustomer, item.idAddress)">Delete</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <br><br><br><br><br><br>
    </div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "customer",
        data () {
          return {
            name : '',
            editName: '',
            editAddress: '',
            registerStreet: '',
            registerCountry: '',
            registerProvince: ''
          }
        },
        mounted () {
          this.getCustomers()
        },
        computed: {
          Customers: function () {
            return this.$store.getters.getCustomers
          },
          Addresses: function () {
            return this.$store.getters.getAddresses
          }
        },
        methods: {
          getCustomers: function () {
            this.$store.dispatch('doGetCustomers')
          },
          getAddresses: function (customerId) {
            this.$store.dispatch('doGetAddresses', customerId)
          },
          doPost: function () {
            const URL = '/api/customer'
            axios.post(URL,{name: this.name})
              .then( response => {
                this.getCustomers()
                alert("your request success!")
                this.name = ''
              })
              .catch( error => {
                alert("your request error!")
              })
          },
          doDelete: function (id) {
            const URL = '/api/customer/' + id
            axios.delete(URL)
              .then( response =>{
                this.getCustomers()
                alert("your request success!")
              })
              .catch( error => {
                alert("your request error!")
              })
          },
          doDeleteAddress: function (idCustomer, idAddress) {
            const URL = '/api/customer/' + idCustomer + '/address/' + idAddress
            axios.delete(URL)
              .then(response => {
                this.getAddresses(idCustomer)
                alert("your request succcess!")
              })
              .catch( error => {
                alert("your request error!")
              })
          },
          doEditName: function (id) {
            const URL = '/api/customers/' + id
            axios.put(URL,{name: this.editName})
              .then( response => {
                this.getCustomers()
                alert("your request success!")
                this.editName = ''
              })
              .catch( error => {
                alert("your request error!")
              })
          },
          doPostAddress: function (id) {
            const URL = '/api/customer/' + id + '/address'
            axios.post(URL,{street: this.registerStreet,
                            country: this.registerCountry,
                            province: this.registerProvince})
              .then( response => {
                alert("your request success!")
                this.registerStreet = ''
                this.registerCountry = ''
                this.registerProvince = ''
                this.getAddresses(id)
              })
              .catch( error => {
                alert("your request error!")
              })

          }
        }
    }
</script>

<style scoped>
  input {
    width: 100%;
  }

  .control {
    text-align: center !important;
  }

  table {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

  #input-register {
    width: 50%;
  }

</style>
