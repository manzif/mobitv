<template>
  <v-container fluid>
    <div class="mx-12 my-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="9" sm="6">
          <v-card text class="pa-7">
            <v-col cols="12" md="12" sm="6">
              <h2 class="pb-1" color="#0087ff">
                This page is under construction.
              </h2>
              <div class="line"></div>
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
