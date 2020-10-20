<template>
  <v-item-group active-class="secondary">
    <div>
      <v-row justify="center">
        <v-col cols="12" md="10" sm="6">
          <v-item>
            <v-container grid-list-md>
              <v-card text class="pa-10">
                <v-form
                  ref="form"
                  v-model="isFormValid"
                  :lazy-validation="lazy"
                >
                  <v-layout row wrap class="pa-5">
                    <v-flex xs12 md12 class="pb-3">
                      <h2 class="headline black--text pb-1 font-weight-bold">
                        Edit Profile
                      </h2>
                      <div class="line"></div>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">FirstName</div>
                      <v-text-field
                        v-model="firstName"
                        label="ex: Ishimwe Felix"
                        required
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">LastName</div>
                      <v-text-field
                        v-model="lastName"
                        label="ex: felix@transax.rw"
                        required
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">Username</div>
                      <v-text-field
                        v-model="username"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">Password</div>
                      <v-text-field
                        v-model="password"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text text--primary pb-1">
                        Company Name
                      </div>
                      <v-text-field
                        v-model="companyName"
                        :counter="10"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">
                        Company Registration Number
                      </div>
                      <v-text-field
                        v-model="companyRegistrationNumber"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">CallBack Url</div>
                      <v-text-field
                        v-model="callback"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">Sector</div>
                      <v-select :items="sectors" dense outlined></v-select>
                    </v-flex>
                    <v-flex xs12 12>
                      <v-btn
                        :disabled="!isFormValid"
                        :loading="isLoading"
                        @click="profileEdit"
                        color="primary"
                        block
                        >Save</v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card>
            </v-container>
          </v-item>
        </v-col>
      </v-row>
    </div>
  </v-item-group>
</template>
<script>
export default {
  data: () => ({
    isFormValid: false,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    callback: '',
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    companyName: '',
    companyNameRules: [
      (v) => !!v || 'Company name',
      (v) => (v && v.length <= 10) || 'must be less than 10 characters'
    ],
    companyRegistrationNumber: '',
    companyRegistrationNumberRules: [
      (v) => !!v || 'Company registration number',
      (v) => (v && v.length <= 10) || 'must be less than 10 characters'
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [(v) => !!v || 'Password is required'],
    selectedRole: null,
    roles: ['Superadmin', 'Manager admin', 'Manager', 'client'],
    selectedSector: null,
    sectors: ['E-commerce', 'Online delivery', 'Online store'],
    checkbox: false,
    lazy: false
  }),
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async profileEdit(id) {
      this.$store.dispatch('helper/loading')
      try {
        const userData = {
          firstName: this.firstName,
          lastName: this.lastName
        }
        await this.$store.dispatch('users/profileEdit', {
          userData
        })
        this.$store.dispatch('helper/loading')
        this.firstName = null
        this.lastName = null
      } catch (e) {
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
  width: 50px;
  border-bottom: 3px solid #0087ff;
  position: absolute;
}
</style>
