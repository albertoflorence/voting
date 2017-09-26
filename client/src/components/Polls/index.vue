<template>
  <div>
    <div
    v-for="poll in polls"
    :key="poll.id">
    <v-layout>
      <v-flex>
        <div>
          {{poll.title}}
          <div
            v-for="option in poll.options">
            <v-layout>
              <v-flex>
                <div>
                  <v-btn
                    @click="vote(option.id)">
                    {{option.name}}
                </v-btn>
                </div>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-flex>
    </v-layout>
    </div>
    </div>
</template>

<script>
import PollService from '@/services/PollService'
export default {
  data () {
    return {
      polls: []
    }
  },
  methods: {
    vote (id) {
      console.log(id)
    }
  },
  async mounted () {
    const polls = (await PollService.index()).data
    this.polls = polls
    console.log(polls)
  }
}
</script>

<style scoped>
</style>
