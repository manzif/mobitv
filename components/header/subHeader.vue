<template>
  <div>
    <v-container class="my-5">
      <h2 class="primary--text">{{ header }}</h2>

      <v-divider :inset="true"></v-divider>
    </v-container>
  </div>
</template>

<script>
export default {
  props: { header: { type: String, required: true } }
}
</script>

<style></style>
