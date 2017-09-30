<template>
  <div>
    <poll
      v-if="poll"
      :initialPoll="poll">
    </poll>
    <v-btn
      class="randomPoll light-blue"
      dark
      v-if="poll" 
      @click="getRandom"> 
      Random Poll
    </v-btn>
  </div>
</template>

<script>
import PollService from '@/services/PollService'
import Poll from './Poll'
export default {
  data () {
    return {
      poll: null
    }
  },
  methods: {
    async getRandom () {
      this.poll = (await PollService.show('random')).data
    }
  },
  async mounted () {
    this.poll = (await PollService.show('random')).data
  },
  components: {
    Poll
  }
}
</script>

<style scoped>
.randomPoll {
  margin-top: 50px;
  width: 300px;
  height: 80px;
}

</style>
