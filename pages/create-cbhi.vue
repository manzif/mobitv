<template>
  <v-container fluid>
    <div class="mx-12 my-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="9" sm="6">
          <v-card text class="pa-7">
            <v-col cols="12" md="12" sm="6">
              <h2 class="pb-1" color="#0087ff">Pay CBHI.</h2>
              <div class="line"></div>
              <h4 class="my-6">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut,
                suscipit a. Debitis placeat asperiores corrupti dolores? Vel
                voluptatibus aut animi, quas doloribus, itaque molestiae ipsum
                officia at natus mollitia iure?
              </h4>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="nid"
                    :rules="[(v) => !!v || 'House Hold Number is required']"
                    label="House Hold"
                    required
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
                <v-flex xs12 md12>
                  <v-btn
                    :loading="isLoading"
                    :disabled="!isFormValid"
                    @click="nidValidation"
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
      nid: '',
      paymentYear: '',
      isFormValid: false,
      typeItems: ['2020', '2021'],
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
  methods: {
    async nidValidation() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('cbhi/nidValidation', {
          nid: this.nid,
          paymentYear: this.paymentYear
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
