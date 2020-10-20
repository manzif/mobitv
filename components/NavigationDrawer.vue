<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-avatar size="55">
          <img src="~/static/images/defaultProfile.png" alt="John" />
        </v-avatar>

        <v-list-item-title>@{{ userInfo.details.agentName }}</v-list-item-title>

        <v-btn @click.stop="mini = !mini" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item to="/create-cbhi">
          <v-list-item-icon>
            <v-icon>mdi-hospital-marker</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-hospital-marker">
            <v-list-item-title>CBHI</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/create-rra">
          <v-list-item-icon>
            <v-icon>mdi-cash-100</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-home-city">
            <v-list-item-title>RRA</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/create-alectricity">
          <v-list-item-icon>
            <v-icon>mdi-fire-hydrant</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-home-city">
            <v-list-item-title>Electricity</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/create-rnit">
          <v-list-item-icon>
            <v-icon>mdi-fire-hydrant</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-home-city">
            <v-list-item-title>RNIT</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/transactionview">
          <v-list-item-icon>
            <v-icon>mdi-stack-exchange</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-home-city">
            <v-list-item-title>Transaction</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import userData from '@/assets/users.json'
export default {
  data() {
    return {
      drawer: true,
      urlImage: 'https://client-api.transax.rw/uploads/',
      itemss: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' }
      ],
      mini: true
    }
  },
  computed: {
    authUser() {
      return this.$store.getters['users/loggedInUser']
    },
    userInfo() {
      return userData
    }
  }
}
</script>
