<template>
  <v-item-group active-class="secondary">
    <div>
      <v-row justify="center">
        <v-col cols="12" md="10" sm="6">
          <v-item>
            <v-container grid-list-md>
              <v-card text class="pa-5">
                <v-form
                  ref="form"
                  v-model="isFormValid"
                  :lazy-validation="lazy"
                >
                  <v-layout row wrap class="pa-3">
                    <v-flex xs12 md12 class="pb-3">
                      <h2 class="headline black--text pb-1 font-weight-bold">
                        Check Details and Pay
                      </h2>
                      <div class="line"></div>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">Name</div>
                      <v-text-field
                        :label="names"
                        disabled
                        required
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">
                        House Hold Number
                      </div>
                      <v-text-field
                        :label="nid"
                        disabled
                        required
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">
                        Total Premium
                      </div>
                      <v-text-field
                        :label="totalPremium"
                        disabled
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">
                        Already Payed
                      </div>
                      <v-text-field
                        :label="alreadyPaid"
                        disabled
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text text--primary pb-1">
                        Pay Phone number
                      </div>
                      <v-text-field
                        :label="clientPhone"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">invoice</div>
                      <v-text-field
                        :label="invoice"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md12>
                      <v-select
                        v-model="paymentYear"
                        :rules="[(v) => !!v || 'Year of Payment is required']"
                        :items="typeItems"
                        placeholder="Year of Payment"
                        dense
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-btn color="cancel" block>Cancel</v-btn>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-btn
                        :loading="isLoading"
                        :disabled="isDisabled"
                        @click="payCBHI"
                        color="primary"
                        block
                        >Pay</v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card>
            </v-container>
          </v-item>
        </v-col>
      </v-row>
    </div>
  </v-item-group>
</template>
<script>
export default {
  data: () => ({
    isFormValid: false,
    lazy: false,
    alreadyPaid: '',
    names: '',
    totalPremium: '',
    clientPhone: '',
    typeItems: ['2020', '2021'],
    invoice: '',
    nid: '',
    paymentYear: ''
  }),
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    },
    authUser() {
      return this.$store.getters['users/loggedInUser']
    },
    isProgressLoader() {
      return this.$store.getters['helper/isProgressLoader']
    }
  },
  created() {
    if (this.$route.params.data) {
      this.alreadyPaid = JSON.stringify(
        this.$route.params.data.rssbRssbResponse.alreadyPaid
      )
      this.names = this.$route.params.data.rssbRssbResponse.name
      this.nid = this.$route.params.data.rssbRssbResponse.householdNID
      this.totalPremium = JSON.stringify(
        this.$route.params.data.rssbRssbResponse.totalPremium
      )
      this.invoice = JSON.stringify(
        this.$route.params.data.rssbRssbResponse.invoice
      )
      this.clientPhone = this.authUser.clientNumber
    } else {
      this.$store.dispatch('users/logout')
    }
  },
  methods: {
    async payCBHI() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('cbhi/payCBHI', {
          clientId: this.$route.params.clientId,
          clientPhone: this.$route.params.clientPhone,
          name: this.names,
          invoice: this.invoice,
          amountPaid: this.alreadyPaid,
          paymentYear: this.paymentYear,
          nid: this.nid
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
      } catch (e) {
        return e
      }
    }
  }
}
</script>
<style scoped>
.disable-events {
  pointer-events: none;
}
.create-center {
  text-align: center;
}
.line {
  width: 63px;
  border-bottom: 5px solid #ff8c00;
  position: absolute;
}
</style>
