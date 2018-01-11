<template>
    <div class="links">
      <router-link v-bind:to="item.url" v-for="item in menus">
        <br>{{item.label}}
      </router-link>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
          return {
            menus: {
              // home: {
              //   url: '/',
              //   label: "Home"
              // },
              // customer: {
              //   url: '/customer',
              //   label: "Customer"
              // },
              // address: {
              //   url: '/address',
              //   label: "Address"
              // }
            }
          }
        }
    }
</script>

<style scoped>

</style>
