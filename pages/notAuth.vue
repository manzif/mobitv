<template>
  <v-row align="center" justify="center">
    <v-container py-5>
      <v-layout align-center justify-center py-3>
        <v-flex xs12 sm8 md4>
          <span>Your are not authenticated</span>

          <v-btn @click="goToLogin" large block color="primary"
            >Authenticate again</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </v-row>
</template>

<script>
/* eslint-disable no-console */
export default {
  layout: 'notAuth',
  name: 'NotAuth',
  data() {
    return {}
  },
  methods: {
    goToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>
