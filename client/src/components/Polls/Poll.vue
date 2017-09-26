<template>
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
                {{option}}
              </div>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </v-flex>
  </v-layout>
    
  </div>
</template>

<script>
export default {
  data() {
    polls: []
  }
  async mounted () {
    const polls = (await PollService.index()).data
    this.polls = polls
  }
}
</script>

<style scoped>
</style>
