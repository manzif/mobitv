<template>
  <v-app>
    <nav>
      <v-app-bar color="#ff8c00" fixed app light flat>
        <v-spacer />
        <marquee behavior="scroll" class="marqueTitle" direction="left"
          >Accept QR Code payment instantly with Mobicash-TV10 QR</marquee
        >
        <!-- <nuxt-link to="/"
          ><v-img
            height="50px"
            width="150px"
            contain
            src="/images/mobich.png"
          ></v-img
        ></nuxt-link> -->

        <v-spacer />

        <!-- <span>Manzi</span>
        <v-badge avatar bordered overlap>
          <template v-slot:badge>
            <v-avatar>
              <span>1</span>
            </v-avatar>
          </template>

          <v-avatar size="35">
            <v-img src="/images/profile.svg"></v-img>
          </v-avatar>
        </v-badge> -->
      </v-app-bar>
    </nav>
    <nuxt />
    <RegisterFooter />
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import RegisterFooter from '@/components/RegisterFooter'
export default {
  components: {
    RegisterFooter
  },
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
.marqueTitle {
  color: #ffffff;
}
</style>
