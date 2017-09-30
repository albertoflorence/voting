<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar class="white--text light-blue" dark>
          <v-toolbar-title>My Polls</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(poll, index) in polls">
            <v-list-tile avatar ripple v-bind:key="poll.id">
              <v-list-tile-content @click="viewPoll(poll.id)">
                <v-list-tile-title>{{ poll.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{countPolls[poll.id]}} votes</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text></v-list-tile-action-text>
                <v-btn 
                  icon light
                  @click="deletePoll(poll.id)">
                  <v-icon class="red--text">delete_forever</v-icon>
                </v-btn>
                <v-icon></v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < polls.length"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Polls from '@/components/Polls/index'
import PollService from '@/services/PollService'
import VoteService from '@/services/VoteService'
export default {
  data () {
    return {
      fromUser: true,
      polls: [],
      countPolls: []
    }
  },
  components: {
    Polls
  },
  async mounted () {
    this.polls = (await PollService.userPolls()).data
    const pollId = this.polls.map(poll => poll.id)
    this.countPolls = (await VoteService.count({pollId})).data
  },
  methods: {
    async deletePoll (pollId) {
      const deletedPoll = (await PollService.delete(pollId)).data
      this.polls = this.polls.filter(poll => poll.id !== deletedPoll.id)
    },
    async viewPoll (pollId) {
      this.$router.push({
        name: 'poll-view',
        params: {pollId}
      })
    }
  }
}
</script>

<style scoped>

</style>
