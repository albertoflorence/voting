<template>
  <v-toolbar fixed class="light-blue" dark>
    <v-toolbar-title>
      <router-link
        class="home"
        tag="span"
        :to="{
          name: 'index'
        }">
        Voting APP
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items
      v-if="!isUserLoggedIn">
      <v-btn 
        flat
        :to="{name: 'register'}">
        Sign In
      </v-btn>
      <v-btn flat
        :to="{name: 'login'}">
        Log In
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn flat
       v-if="isUserLoggedIn"
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'index'
      })
    }
  }
}
</script>

<style scoped>
</style>