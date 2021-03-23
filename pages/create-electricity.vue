<template>
  <v-container fluid>
    <div class="mx-12 my-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="9" sm="6">
          <v-card text class="pa-7">
            <v-col cols="12" md="12" sm="6">
              <h2 class="pb-1" color="#0087ff">Buy Electricity</h2>
              <div class="line"></div>
              <p class="my-6">
                Please provide your electricity meter number. We will verify it
                and see if it is valid, but before you click on submit check if
                the meter number is correct.
              </p>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="meterNumber"
                    :rules="[(v) => !!v || 'Meter Number is required']"
                    label="Meter Number"
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
                    @click="getElectricity"
                    color="primary"
                    block
                    >Submit</v-btn
                  >
                </v-flex>
              </v-form>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      meterNumber: '',
      isFormValid: false,
      lazy: false
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    }
  },
  created() {
    if (this.$route.query.clid === undefined) {
      this.$store.dispatch('users/logout')
    }
  },
  methods: {
    async getElectricity() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        const meterNumber = this.meterNumber
        await this.$store.dispatch('electricity/getElectricity', {
          meterNumber,
          clientId: this.$route.query.clid,
          msisdn: this.$route.query.phone
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
.line {
  width: 63px;
  border-bottom: 5px solid #ff8c00;
  position: absolute;
}
</style>
