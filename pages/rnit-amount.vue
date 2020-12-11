<template>
  <v-item-group active-class="secondary">
    <div>
      <v-row justify="center">
        <v-col cols="12" md="10" sm="6">
          <v-item>
            <v-container grid-list-md>
              <v-card text class="pa-5">
                <v-form
                  ref="form"
                  v-model="isFormValid"
                  :lazy-validation="lazy"
                >
                  <v-layout row wrap class="pa-3">
                    <v-flex xs12 md12 class="pb-3">
                      <h2 class="headline black--text pb-1 font-weight-bold">
                        Check Details and Pay
                      </h2>
                      <div class="line"></div>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">National Id</div>
                      <v-text-field
                        v-model="Name"
                        label="1221123412"
                        disabled
                        required
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">Full Name</div>
                      <v-text-field
                        v-model="lastName"
                        label="1199580042383"
                        disabled
                        required
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">Phone Number</div>
                      <v-text-field
                        v-model="username"
                        label="12300"
                        disabled
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">Email</div>
                      <v-text-field
                        v-model="email"
                        label="fabrice@mobicore.app"
                        disabled
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text text--primary pb-1">
                        Occupation
                      </div>
                      <v-text-field
                        v-model="companyName"
                        label="12300"
                        dense
                        disabled
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text text--primary pb-1">
                        Bank Account
                      </div>
                      <v-text-field
                        v-model="companyName"
                        label="10/13/2020"
                        disabled
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text text--primary pb-1">
                        Amount
                      </div>
                      <v-text-field
                        v-model="companyName"
                        label="078435343"
                        dense
                        disabled
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">Pin</div>
                      <v-text-field
                        v-model="pin"
                        :label="Pin"
                        :rules="[(v) => !!v || 'Pin is required']"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-btn color="cancel" block>Cancel</v-btn>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-btn color="primary" block>Submit</v-btn>
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
    companyName: '',
    companyId: '',
    companySector: '',
    lastName: '',
    username: '',
    callBackUrl: '',
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    companyRegistrationNumber: '',
    companyRegistrationNumberRules: [
      (v) => !!v || 'Company registration number',
      (v) => (v && v.length <= 10) || 'must be less than 10 characters'
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    selectedSector: null,
    sectors: ['E-commerce', 'Online delivery', 'Online store'],
    lazy: false
  }),
  computed: {
    companyNam() {
      return this.$store.getters['users/companyName']
    },
    companyI() {
      return this.$store.getters['users/companyId']
    },
    companySecto() {
      return this.$store.getters['users/companySector']
    },
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    },
    authUser() {
      return this.$store.getters['users/loggedInUser']
    },
    isProgressLoader() {
      return this.$store.getters['helper/isProgressLoader']
    },
    userProfile() {
      return this.$store.getters['users/userProfile']
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
    checkEmpty(value, field) {
      if (!value.trim()) {
        this.field = this.userProfile.firstName
      }
    },
    async profileEdit(id) {
      this.$store.dispatch('helper/loading')
      try {
        const personalData = {
          username: this.username,
          email: this.email
        }
        const userData = {
          firstName: this.firstName,
          lastName: this.lastName,
          callBackUrl: this.callBackUrl
        }
        id = this.authUser._id
        await this.$store.dispatch('users/profileEdit', {
          userData
        })
        await this.$store.dispatch('users/personalEdit', {
          id,
          personalData
        })
        this.$store.dispatch('helper/loading')
        this.firstName = null
        this.lastName = null
        this.companyName = null
        this.companySector = null
        this.companyId = null
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
  width: 63px;
  border-bottom: 5px solid #98989d;
  position: absolute;
}
</style>
