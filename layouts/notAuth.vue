<template>
  <v-app dark>
    <nuxt />

    <VFooter />
  </v-app>
</template>

<script>
import VFooter from '../components/VFooter'
export default {
  components: {
    VFooter
  },
  data() {
    return {}
  }
}
</script>
<style>
* {
  text-transform: none !important;
}
</style>
