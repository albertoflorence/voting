<template>
  <div>
    <poll
      v-for="poll in polls"
      :key="poll.id"
      :poll="poll"
      >
    </poll>
  </div>
</template>

<script>
import PollService from '@/services/PollService'
import Poll from './Poll'
export default {
  data () {
    return {
      polls: []
    }
  },
  async mounted () {
    this.polls = (await PollService.index()).data
  },
  components: {
    Poll
  }
}
</script>

<style scoped>

</style>
