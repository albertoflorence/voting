<template>
  <v-layout>
      <v-flex xs6 offset-xs3>
        <panel :title="poll.title">
          <poll-options
            v-for="option in poll.options"
            :option="option"
            :isVoted="option.id === votedOption"
            :count="countOptions[option.id] || 0"
            :vote="vote"
            :key="option.id">
          </poll-options>
          <span>Created by: {{poll.User.email}} </span>
          <span>Votes: {{countPoll}} </span>
        </panel>
      </v-flex>
    </v-layout>
</template>

<script>
import PollOptions from './PollOptions'
import VoteService from '@/services/VoteService'

export default {
  props: [
    'poll'
  ],
  data () {
    return {
      countPoll: null,
      countOptions: {},
      votedOption: null
    }
  },
  methods: {
    async vote (optionId) {
      const vote = (await VoteService.vote({
        optionId: optionId
      })).data
      this.votedOption = vote.OptionId

      const response = (await VoteService.count({
        pollId: this.poll.id
      })).data
      this.countPoll = response.countPoll
      this.countOptions = response.countOptions
    }
  },
  async mounted () {
    const vote = (await VoteService.index({
      pollId: this.poll.id
    })).data
    this.votedOption = vote.OptionId

    const response = (await VoteService.count({
      pollId: this.poll.id
    })).data
    this.countPoll = response.countPoll
    this.countOptions = response.countOptions
  },
  components: {
    PollOptions
  }
}
</script>

<style scoped>

</style>
