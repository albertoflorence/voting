<template>
  <v-card>
    <div class="white elevation-2">
      <v-toolbar flat dense class="light-blue" dark>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="action"> </slot>
      </v-toolbar>
      <div class="pl-4 pr-4 pt-2 pb-2">
        <slot>
          No slot content defined.
        </slot>
      </div>
    </div>        
  </v-card>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>

</style>