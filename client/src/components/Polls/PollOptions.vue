<template>
  <v-layout>
    <v-flex>
      <div>
        <v-btn
          v-bind:class="{purple: isVoted}"
          :dark="isVoted"
          @click="vote(option.id)">
          {{option.name}} / {{count}}
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    'option',
    'isVoted',
    'vote',
    'count'
  ]
}
</script>

<style scoped>

</style>
