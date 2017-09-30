<template>
  <v-layout
    v-if="poll">
    <v-flex xs4 offset-xs5>
      <panel 
        :title="poll.title"
        v-if="!isVoted">
        <div
          slot="action">
          <v-btn
            icon
            v-if="isUserLoggedIn"
            :to="{
              name: 'poll-create'
            }">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn
            icon
            @click.native.stop="dialog = !dialog"
              >
            <v-icon>share</v-icon>
          </v-btn>
        </div>
        <poll-options 
          :options="poll.options"
          v-on:addOption="addOption"
          v-on:vote="vote"
        >
          <div class="right-text">
            <small class="grey--text">created by: {{poll.User.name}} </small>
          </div>
        </poll-options>
      </panel>
      <poll-chart 
        :poll="poll"
        v-if="isVoted"
      />
    </v-flex>
    <v-dialog
      absolute v-model="dialog">
      <v-card>
        <v-card-text>
          <v-text-field readonly v-model="url"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import PollOptions from './PollOptions'
import PollChart from './PollChart'
import VoteService from '@/services/VoteService'
import PollService from '@/services/PollService'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  props: [
    'initialPoll'
  ],
  data () {
    return {
      url: 'http://localhost:8080/#/polls/' + this.initialPoll.id,
      optionName: '',
      isVoted: false,
      poll: this.initialPoll,
      dialog: false
    }
  },
  methods: {
    async vote (optionId) {
      if (!optionId) {
        return
      }
      (await VoteService.vote({
        optionId: optionId
      })).data
      this.isVoted = true
    },
    async addOption (optionName) {
      this.poll = (await PollService.addOption(this.poll.id, optionName)).data
    }
  },
  components: {
    PollOptions,
    PollChart
  }
}
</script>

<style scoped>

.right-text {
  text-align: right;
}

</style>
