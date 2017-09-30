<template>
  <v-dialog absolute v-model="dialog">
    <v-card>
      <v-card-text>
        <v-text-field readyonly label="File name"></v-text-field>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [
    'label'
  ]
}
</script>

<style scoped>
</style>