<template>
  <div>
    <poll
      v-if="poll"
     :initialPoll="poll" />
  </div>
</template>

<script>
import Poll from './Poll'
import PollService from '@/services/PollService'
export default {
  components: {
    Poll
  },
  data () {
    return {
      poll: null
    }
  },
  async mounted () {
    if (!this.poll) {
      const pollId = this.$route.params.pollId
      this.poll = (await PollService.show(pollId)).data
    }
  }
}
</script>

<style scoped>
</style>
