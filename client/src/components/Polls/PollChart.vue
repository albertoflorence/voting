<template>
  <div class="wrapper">
    <canvas id="pollChart" ref="pollChart">
    </canvas>
  </div>
</template>

<script>
import VoteService from '@/services/VoteService'
import Chart from 'chart.js'
import RandomColor from '@/helpers/RandomColor'

export default {
  props: [
    'poll'
  ],
  data () {
    return {
      votedOption: null,
      votesTotal: null,
      votesByOption: null,
      chart: null
    }
  },
  methods: {
    drawChart () {
      const labels = this.poll.options.map(option => option.name)
      const data = {
        labels: labels,
        datasets: [{
          data: this.poll.options.map(option => this.votesByOption[option.id] || 0),
          backgroundColor: RandomColor.get(this.poll.options.length)
        }]
      }
      const ctx = this.$refs.pollChart.getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
          title: {
            display: true,
            text: this.poll.title
          }
        }
      })
    }
  },
  async mounted () {
    const pollId = this.poll.id
    const vote = (await VoteService.index({pollId})).data
    const response = (await VoteService.count({pollId})).data
    this.votedOption = vote.OptionId
    this.votesTotal = response.countPoll
    this.votesByOption = response.countOptions
    this.drawChart()
  }
}
</script>

<style scoped>
.wrapper {
  width: 500;
  height: 500px;
  margin-top: 100px;
}
</style>
