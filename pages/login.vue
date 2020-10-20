<template>
  <v-row align="center" justify="center">
    <v-container py-3>
      <div class="authentication">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <div class="create-center mb-1 ma-2">
              <v-img :src="myImage"></v-img>
            </div>
          </v-flex>
          <v-flex xs12 sm8 md6>
            <div class="pa-10">
              <v-layout class="mb-2">
                <div class="text-center">
                  <h2>Login</h2>
                </div>
              </v-layout>
              <div class="line" />
              <div class="mb-5"></div>
              <v-layout v-if="errorMessage">
                <div class="mb-3 text-center">
                  <v-card class="pa-2">
                    <h4 class="red--text">{{ errorMessage }}</h4>
                  </v-card>
                </div>
              </v-layout>
              <v-form v-model="isFormValid" :lazy-validation="lazy">
                <v-card-text class="px-0">
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    name="login"
                    label="Username"
                    type="text"
                    outlined
                    dense
                    required
                  />
                  <v-text-field
                    v-model="pin"
                    :rules="pinRules"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    name="pin"
                    label="Pin"
                    required
                    dense
                    outlined
                  />
                </v-card-text>
                <v-card-actions class="px-0">
                  <v-btn to="/" large block color="primary mb-1">Submit</v-btn>
                </v-card-actions>
              </v-form>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'register',
  data() {
    return {
      username: '',
      myImage: require('@/static/images/mobich.png'),
      isFormValid: false,
      lazy: false,
      showPassword: false,
      usernameRules: [(v) => !!v || 'Username is required'],
      pin: '',
      pinRules: [(v) => !!v || 'Pin is required']
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'helper/isLoading',
      isDisabled: 'helper/isDisabled'
    }),
    errorMessage() {
      return this.$store.getters['users/errorMessage']
    }
  },
  methods: {
    async login() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('users/login', {
          username: this.username,
          pin: this.pin
        })
        this.email = null
        this.password = null
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
      } catch (e) {
        // TODO: remove this log
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
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
