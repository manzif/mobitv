<template>
  <v-footer :fixed="fixed" app>
    <span class="subtitle-1">&copy; 2020 Mobicash</span>
    <v-spacer />
    <a href="https://www.mobicashonline.com/" class="alink" target="_blank">
      <span class="font-weight-medium subtitle-1">Developed by Mobicash</span>
    </a>
    <v-spacer />

    <!-- <a href="https://www.transax.rw" class="alink">
      <span class="font-weight-thin caption">Developed by Transax</span>
    </a> -->
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
