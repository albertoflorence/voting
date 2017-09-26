<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="New Poll">
        <v-form>
          <v-text-field
            label="Title"
            v-model="title"
            required
          ></v-text-field>
          <v-text-field
            label="Options"
            v-model="options"
            required
          ></v-text-field>
          <v-btn 
            class="light-blue" 
            dark
            @click="create">
            Create
          </v-btn>
        </v-form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import PollService from '@/services/PollService'
export default {
  data () {
    return {
      title: '',
      options: ''
    }
  },
  methods: {
    async create () {
      const poll = (await PollService.create({
        userId: 1,
        title: this.title,
        options: this.options
      })).data
      console.log(poll)
    }
  }
}
</script>

<style scoped>
</style>
