<template>
  <div>
    <VSubHeader header="Wallet" />
    <v-item-group active-class="secondary">
      <div class="mx-md-12">
        <v-row justify="center">
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4 class="pb-2">Wallet</h4>
                    <v-list-item-title class="headline">{{
                      userInfo.details.float
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="indigo" right>mdi-wallet-travel</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <!-- <h4 class="indigo--text">+3.12%</h4> -->
                  <v-btn class="disable-events" to="/transactionview" text
                    >View latest transaction</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </div>
    </v-item-group>
    <VSubHeader header="Quick Services" />
    <v-item-group active-class="secondary">
      <div class="mx-md-12">
        <v-row align="center" justify="center">
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>mdi-hospital-marker</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  CBHI
                </v-row>

                <v-card-text class="text-center">
                  Use this action to pay CHBI
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('/create-cbhi')"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>Make</span>
                    <v-icon right small>mdi-hospital-marker</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>mdi-cash-100</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  RRA
                </v-row>

                <v-card-text class="text-center">
                  Use this action to pay RRA
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('/create-rra')"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>Make</span>
                    <v-icon right small>mdi-cash-100</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>mdi-fire-hydrant</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  Electricity
                </v-row>

                <v-card-text class="text-center">
                  Use this action to pay Electricity
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('/create-electricity')"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>Make</span>
                    <v-icon right small>mdi-fire-hydrant</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>mdi-fire-hydrant</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  RNIT
                </v-row>

                <v-card-text class="text-center">
                  Use this action to pay RNIT
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('/create-rnit')"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>Make</span>
                    <v-icon right small>mdi-fire-hydrant</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </div>
    </v-item-group>
  </div>
</template>

<script>
/* eslint-disable no-console */
import userData from '@/assets/users.json'
export default {
  data: () => ({
    pageActions: [
      {
        name: ' Create Admin',
        punchline: 'Create',
        description: 'Use this action to create an admin',
        action: '/admin/register',
        icon: 'fa-user-secret'
      },
      {
        name: 'Create Developer',
        punchline: 'Create',
        description: 'Use this action to create a developer',
        action: '/admin/add-developer',
        icon: 'fa-user-tie'
      },
      {
        name: 'Create Guest',
        punchline: 'Create',
        description: 'Use this action to create a guest for mobi-documentatin',
        action: '/admin/add-guest',
        icon: 'fa-user-plus'
      },
      {
        name: 'View Users',
        punchline: 'View',
        description: 'Use this action to view all available users',
        action: '/admin/usersview',
        icon: 'fa-users'
      }
    ]
  }),
  computed: {
    authUser() {
      return this.$store.getters['users/loggedInUser']
    },
    userInfo() {
      return userData
    }
  },
  methods: {
    goToAction(action) {
      console.log(this)
      this.$router.push(action)
    }
  }
}
</script>

<style></style>
