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
                      <div class="subtitle-1 grey--text pb-1">
                        Declaration Id
                      </div>
                      <v-text-field
                        :label="declarationId"
                        disabled
                        required
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">Tin Number</div>
                      <v-text-field
                        :label="tinNumber"
                        disabled
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">
                        Tax Payer Name
                      </div>
                      <v-text-field
                        :label="taxPayerName"
                        disabled
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text text--primary pb-1">
                        Amount to Pay
                      </div>
                      <v-text-field
                        :label="amount"
                        dense
                        disabled
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text text--primary pb-1">
                        Declaration Date
                      </div>
                      <v-text-field
                        :label="date"
                        disabled
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text text--primary pb-1">
                        Tax Description
                      </div>
                      <v-text-field
                        :label="taxDescription"
                        dense
                        disabled
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-btn color="cancel" block>Cancel</v-btn>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-btn
                        :loading="isLoading"
                        :disabled="isDisabled"
                        @click="payRRA"
                        color="primary"
                        block
                        >Submit</v-btn
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
    declarationId: '',
    referenceNumber: '',
    tinNumber: '',
    taxPayerName: '',
    amount: '',
    date: '',
    taxDescription: ''
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
      this.declarationId = this.$route.params.data.DEC_ID
      this.referenceNumber = this.$route.params.data.RRA_REF
      this.tinNumber = this.$route.params.data.TIN
      this.taxPayerName = this.$route.params.data.TAX_PAYER_NAME
      this.amount = this.$route.params.data.AMOUNT_TO_PAY
      this.date = this.$route.params.data.DEC_DATE
      this.taxDescription = this.$route.params.data.TAX_TYPE_DESC
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    async payRRA() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('rra/payRRA', {
          clientId: this.$route.params.clientId,
          clientPhone: this.$route.params.clientPhone,
          bankName: this.$route.params.data.bank_name,
          referenceNumber: this.referenceNumber,
          taxPayerName: this.taxPayerName,
          taxDescription: this.taxDescription,
          taxCenterNumber: this.$route.params.data.TAX_CENTRE_NO,
          taxTypeNumber: this.$route.params.data.TAX_TYPE_NO,
          assessNumber: this.$route.params.data.ASSESS_NO,
          rraOriginNumber: this.$route.params.data.RRA_ORIGIN_NO,
          declarationId: this.declarationId,
          amount: this.amount,
          tinNumber: this.tinNumber
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
  border-bottom: 5px solid #98989d;
  position: absolute;
}
</style>
