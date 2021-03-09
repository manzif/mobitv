<template>
  <v-app>
    <nav>
      <v-app-bar :clipped-left="clipped" fixed app light flat>
        <v-spacer />

        <nuxt-link to="/"
          ><v-img
            height="50px"
            width="150px"
            contain
            src="/images/mobich.png"
          ></v-img
        ></nuxt-link>

        <v-spacer />

        <v-menu bottom center>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon color="primary">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <UserDropdown />
        </v-menu>
      </v-app-bar>
      <!-- <NavigationDrawer /> -->
    </nav>
    <v-main>
      <nuxt />
    </v-main>
    <VFooter />
  </v-app>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import VFooter from '@/components/VFooter'
import UserDropdown from '@/components/UserDropdown'
import NavigationDrawer from '@/components/NavigationDrawer'
export default {
  components: {
    VFooter,
    UserDropdown,
    NavigationDrawer
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      mini: true,
      right: true,

      title: null
    }
  },
  // middleware: ['auth', 'check-auth'],
  computed: {
    authUser() {
      return this.$store.getters['users/loggedInUser']
    },
    ...mapGetters({
      isMessageVisible: 'helper/isMessageVisible',
      isMessage: 'helper/isMessage'
    })
  },
  watch: {
    $route(val) {
      this.title = val.name
    },
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
.alink {
  text-decoration: none;
  color: #000;
}
* {
  text-transform: none !important;
}
</style>
