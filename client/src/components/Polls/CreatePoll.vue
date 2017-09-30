<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="New Poll">
        <v-form>
          <v-text-field
            label="Name your poll"
            autofocus
            v-model="title"
            placeholder="Who is the strongest?"
            required
          ></v-text-field>
          <div  v-for="(option, index) in options">
            <v-text-field
              label="option"
              @focus="addOption(index, option)"
              v-model="option.name"
              :placeholder="placeholders[index] || 'isn\'t that enough?'"
            ></v-text-field>
          </div>
          <p class="red--text">{{error}}</p>
        </v-form>
        <v-btn 
          class="light-blue" 
          dark
          @click="create">
          Create
        </v-btn>
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
      options: [
        {name: ''},
        {name: ''}
      ],
      placeholders: [
        'Supermann',
        'Hulk',
        'Saitama',
        'Goku',
        'Thor',
        'You',
        'Me'
      ],
      error: null
    }
  },
  methods: {
    async create () {
      const response = (await PollService.create({
        userId: 1,
        title: this.title,
        options: this.options
      })).data
      const {error, poll} = response
      if (error) {
        this.error = error
        return
      }
      this.error = null
      this.$router.push({
        name: 'poll-view',
        params: {
          pollId: poll.id
        }
      })
    },
    addOption (a, b) {
      if (a > this.options.length - 2 && this.options[a - 1].name) {
        this.options.push({
          name: ''
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
