<template>
  <v-container fill-height fluid>
    <div class="mx-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="7" sm="6">
          <h2 class="pb-1" color="#0087ff">Electricity Amount.</h2>
          <div class="line"></div>
          <h4 class="my-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut,
            suscipit a. Debitis placeat asperiores corrupti dolores? Vel
            voluptatibus aut animi, quas doloribus, itaque molestiae ipsum
            officia at natus mollitia iure?
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
                :label="meterInfo.name"
                required
                dense
                disabled
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                :label="meterInfo.meter"
                required
                disabled
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="title"
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
      title: '',
      userName: '',
      isFormValid: false,
      description: '',
      userId: ''
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
    }
  },
  methods: {
    async createApp() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('app/createApp', {
          title: this.title,
          userName: this.userName,
          userId: this.userId,
          description: this.description
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.title = null
        this.userId = null
        this.userName = null
        this.description = null
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
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
