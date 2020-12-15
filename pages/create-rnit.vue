<template>
  <v-container fluid>
    <div class="mx-12 my-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="9" sm="6">
          <v-card text class="pa-7">
            <v-col cols="12" md="12" sm="6">
              <h2 class="pb-1" color="#0087ff">Pay RNIT.</h2>
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
                    v-model="title"
                    :rules="[(v) => !!v || 'National Id is required']"
                    label="National Id"
                    required
                    dense
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-btn to="/rnit-amount" color="primary" block>Submit</v-btn>
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
      title: '',
      userName: '',
      isFormValid: false,
      typeItems: ['2019', '2020', '2021'],
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
  border-bottom: 5px solid #ff8c00;
  position: absolute;
}
</style>
