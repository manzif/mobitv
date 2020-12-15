<template>
  <div>
    <VSubHeader header="Mobicash Quick Services" />
    <v-item-group active-class="secondary">
      <div class="mx-md-12">
        <v-row align="center" justify="center">
          <v-col
            v-for="item in pageActions"
            :key="item.action"
            cols="12"
            md="3"
            sm="6"
          >
            <v-item>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-card v-bind="attrs" v-on="on" :ripple="false" class="pa-6">
                    <v-row
                      align="center"
                      justify="center"
                      class="primary--text font-weight-black"
                    >
                      <img :src="item.image" />
                    </v-row>
                    <v-card-actions class="white justify-center">
                      <v-btn
                        :to="item.action"
                        color="primary"
                        block
                        class="ma-2 white--text"
                      >
                        <span>Pay</span>
                        <v-icon right small>{{ item.icon }}</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
                <span>{{ item.message }}</span>
              </v-tooltip>
            </v-item>
          </v-col>
        </v-row>
      </div>
    </v-item-group>
  </div>
</template>

<script>
import userData from '@/assets/users.json'
import Rnit from '@/static/images/rnit.jpeg'
import Mitiweli from '@/static/images/mutuweli.jpg'
import Reg from '@/static/images/regrwanda.jpg'
import Rra from '@/static/images/rraauth.png'

export default {
  data: () => ({
    pageActions: [
      {
        action: '/create-cbhi',
        icon: 'mdi-hospital-marker',
        message: 'Please click here to pay MITUWELI',
        image: Mitiweli
      },
      {
        message: 'Please click here to pay RRA',
        action: '/create-rra',
        icon: 'mdi-cash-100',
        image: Rra
      },
      {
        message: 'Please click here to pay for ELECTRICITY',
        action: '/create-electricity',
        icon: 'mdi-fire-hydrant',
        image: Reg
      },
      {
        message: 'Please click here to pay RNIT Iterambere Fund',
        action: '/create-rnit',
        icon: 'fa-users',
        image: Rnit
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
  }
}
</script>

<style></style>
