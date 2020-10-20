<template>
  <v-app id="register">
    <nuxt />
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      isMessageVisible: 'helper/isMessageVisible',
      isMessage: 'helper/isMessage'
    })
  },
  watch: {
    isMessageVisible() {
      if (this.isMessageVisible === true) {
        this.showMessage(this.isMessage)
      }
    }
  },
  methods: {
    showMessage(message) {
      this.$dialog.notify[message.type](message.content, {
        position: 'top-right',
        timeout: 5000
      })

      this.$store.dispatch('helper/initializeMessage')
    }
  }
}
</script>
<style scoped>
/* background-image: url('~@/static/images/undraw.svg') !important;
  background-size: cover !important; */
/* background-color: #0087ff !important; */
/* background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.9) 75%,
      #0087ff 25%
    ),
    url('~@/static/images/newone.jpg') !important;
  background-size: cover !important; */
/* clip-path: polygon(0% 0%, 50% 0, 50% 100%, 0 100%); */
</style>
