<template>
  <v-footer :fixed="fixed" app>
    <span class="caption">&copy; 2020 Kare</span>
    <v-spacer />
    <span class="font-weight-thin caption">V1.0</span>
    <v-spacer />

    <a href="https://www.transax.rw" class="alink">
      <span class="font-weight-thin caption">Developed by Transax</span>
    </a>
  </v-footer>
</template>

<script>
export default {
  data() {
    return { fixed: false }
  }
}
</script>

<style scoped>
.alink {
  text-decoration: none;
  color: #000;
}
</style>
