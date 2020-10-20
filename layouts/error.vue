<template>
  <v-app dark>
    <v-row align="center" justify="center">
      <v-container py-5>
        <v-layout align-center justify-center py-3>
          <v-flex xs12 sm8 md4>
            <v-row align="center" justify="center" class="px-2 pb-12">
              <h1 v-if="error.statusCode === 404">
                {{ pageNotFound }}
              </h1>
              <h1 v-else>
                {{ otherError }}
              </h1>
            </v-row>
            <v-card class="px-2 pb-12">
              <v-card-text class="px-12">
                <v-layout justify-center py-3>
                  <v-row align="center" justify="center">
                    <v-icon size="100" color="primary"
                      >mdi-alert-circle-outline</v-icon
                    >
                  </v-row>
                </v-layout>
              </v-card-text>
              <v-card-actions class="pa-12">
                <v-btn large block color="primary" light>
                  <NuxtLink to="/" class="white--text">
                    Go Home page
                  </NuxtLink></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
