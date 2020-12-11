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
              <v-form v-model="isFormValid" :lazy-validation="lazy">
                <v-card-text class="px-0">
                  <v-text-field
                    v-model="principal"
                    :rules="usernameRules"
                    name="login"
                    label="principal"
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
                  <v-btn
                    @click="login"
                    :loading="isLoading"
                    :disabled="!isFormValid"
                    block
                    color="primary mb-1"
                    >Submit</v-btn
                  >
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
      principal: '',
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
    })
  },
  methods: {
    async login() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('users/login', {
          principal: this.principal,
          pin: this.pin
        })
        this.principal = null
        this.pin = null
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
      } catch (e) {
        // TODO: remove this log
        return e
      }
    },
    goToAction() {
      this.$router.push({
        name: '/'
      })
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
  border-bottom: 5px solid#98989d;
  position: absolute;
}
</style>
