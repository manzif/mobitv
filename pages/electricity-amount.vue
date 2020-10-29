<template>
  <v-container fill-height fluid>
    <div class="mx-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="7" sm="6">
          <h2 class="pb-1" color="#0087ff">Electricity Amount.</h2>
          <div class="line"></div>
          <h4 class="my-6">
            Please check your names and the meter number. If they are correct
            provide the amount and proceed. Thanks!
          </h4>
          <!-- <v-btn class="" color="#0087ff" outlined to="/view-apps" nuxt
            ><v-icon>mdi-play</v-icon> See all applications</v-btn
          > -->
        </v-col>
        <v-col cols="12" md="5" sm="6">
          <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
            <v-flex xs12 md12 class="pb-7">
              <h2 class="headline black--text pb-1 font-weight-bold">
                Add Amount
              </h2>
              <div class="line"></div>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="name"
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
                :rules="[(v) => !!v || 'Amount is required']"
                label="Amount"
                required
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-btn to="/receipt" color="primary" block>Submit</v-btn>
            </v-flex>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import meterData from '@/assets/meteramount.json'
export default {
  data() {
    return {
      clientName: '',
      amount: '',
      isFormValid: false,
      meterNumber: ''
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    },
    meterInfo() {
      return meterData
    },
    infoMeter() {
      return this.$store.getters['electricity/userMeter']
    }
  },
  created() {
    if (this.$route.params.clientName) {
      this.clientName = this.$route.params.clientName
    }
    if (this.$route.params.meterNumber) {
      this.meterNumber = this.$route.params.meterNumber
    }
  }
}
</script>
<style scoped>
.line {
  width: 63px;
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
