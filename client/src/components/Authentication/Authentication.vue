<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel :title="title">
        <v-form>
          <v-text-field
            label="Email"
            v-model="email"
            required
          ></v-text-field>
          <v-text-field
            label="Passwowrd"
            type="password"
            v-model="password"
            required
          ></v-text-field>
          <div 
            v-if="error"
            class="red--text" 
            v-html="error"/>
          <v-btn 
            class="light-blue" 
            dark
            @click="action">
            {{title}}
          </v-btn>
        </v-form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  props: [
    'title',
    'act'
  ],
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async action () {
      try {
        this.error = null
        const response = await AuthenticationService[this.act]({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'index'
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style scoped>
p {
  margin-bottom: 0px;
}
</style>
