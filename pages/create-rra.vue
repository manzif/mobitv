<template>
  <v-container fluid>
    <div class="mx-12 my-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="9" sm="6">
          <v-card text class="pa-7">
            <v-col cols="12" md="12" sm="6">
              <h2 class="pb-1" color="#0087ff">Pay RRA.</h2>
              <div class="line"></div>
              <p class="my-6">
                To pay RRA, you need to provide the Declaration ID. This must
                always have 10-16 characters. This field is mandatory, please do
                not leave it empty.
              </p>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="rraRef"
                    :rules="[(v) => !!v || 'Declaration Id is required']"
                    label="Declaration Id"
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
                    @click="docIdValidation"
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
      rraRef: '',
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
  methods: {
    async docIdValidation() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        const rraRef = this.rraRef
        await this.$store.dispatch('rra/docIdValidation', rraRef)
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
