<template>
  <v-container fluid>
    <div class="mx-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="9" sm="6">
          <v-card text class="pa-7">
            <v-col cols="12" md="12" sm="6">
              <h2 class="pb-1" color="#0087ff">Electricity Amount.</h2>
              <div class="line"></div>
              <p class="my-6">
                Please check your names and the meter number. If they are
                correct provide the amount and proceed. Thanks!
              </p>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
                <v-flex xs12 md12>
                  <v-text-field
                    :label="clientName"
                    required
                    dense
                    disabled
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    :label="meterNumber"
                    required
                    disabled
                    dense
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="amount"
                    :rules="amountRules"
                    label="Amount"
                    required
                    dense
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-btn
                    :loading="isLoading"
                    :disabled="!isFormValid"
                    @click="payElectricity"
                    color="primary"
                    block
                    >Pay Electricity</v-btn
                  >
                </v-flex>
              </v-form>
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="12" md="5" sm="6"> </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      clientName: '',
      amount: '',
      isFormValid: false,
      amountRules: [
        (v) => !!v || 'Amount is required',
        (v) => v > 100 || 'Amount must be more than 100',
        (v) => v < 500000 || 'Amount must be less than 500 000'
      ],
      meterNumber: '',
      lazy: false
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    },
    authUser() {
      return this.$store.getters['users/loggedInUser']
    }
  },
  created() {
    if (this.$route.params.clientName) {
      this.clientName = this.$route.params.clientName
    }
    if (this.$route.params.meterNumber) {
      this.meterNumber = this.$route.params.meterNumber
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    async payElectricity() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('electricity/payElectricity', {
          meterNumber: this.$route.params.meterNumber,
          clientId: this.$route.params.clientId,
          msisdn: this.$route.params.msisdn,
          amount: this.amount
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.amount = null
      } catch (e) {
        return e
      }
    }
  }
}
</script>
<style scoped>
.line {
  width: 63px;
  border-bottom: 5px solid #ff8c00;
  position: absolute;
}
</style>
