<template>
  <v-container grid-list-md>
    <v-snackbar v-model="snackbar" :timeout="timeout" top>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" @click="snackbar = false" color="blue" text>
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <div class="mb-4 create-center">
      <v-btn class="disable-events" rounded x-large dark block color="indigo"
        ><v-icon outlined class="mr-10">mdi-account-circle-outline </v-icon>View
        leo<v-spacer></v-spacer><v-icon>fa-question</v-icon></v-btn
      >
    </div>
    <v-item-group active-class="secondary">
      <v-layout row wrap class="pa-2">
        <v-flex xs12 md4>
          <v-card :ripple="false" class="pa-1">
            <div class="create-center mb-1">
              <v-avatar size="144" class="mb-1">
                <img src="~/static/images/defaultProfile.png" alt="John" />
              </v-avatar>
              <v-list-item-content class="pb-0 mb-0">
                <h4 class="mb-1">@leo</h4>
              </v-list-item-content>
            </div>
            <v-divider class="mx-2"></v-divider>
            <v-divider class="mx-2"></v-divider>
            <v-card-actions>
              <v-btn to="/editprofile" block class="primary" nuxt
                >Edit Profile</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 md8>
          <v-card :ripple="false" class="pa-1" max-height="600">
            <v-layout row wrap class="pa-5">
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  FirstName
                </div>
                <v-text-field
                  label="Leo"
                  disabled
                  dense
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  LastName
                </div>
                <v-text-field
                  label="Messi"
                  dense
                  disabled
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  Email
                </div>
                <v-text-field
                  label="fabrice@mobicore.app"
                  dense
                  disabled
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  Username
                </div>
                <v-text-field
                  label="leo"
                  dense
                  disabled
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-item-group>
  </v-container>
</template>
<script>
/* eslint-disable no-console */
export default {
  data: () => ({
    isFormValid: false,
    page: 1,
    dialog1: false,
    pageCount: 0,
    snackbar: false,
    urlImage: 'https://client-api.transax.rw/uploads/',
    search: '',
    timeout: 3000,
    text: 'Key copied.',
    name: '',
    limit_by: 2,
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
    selectedRole: null,
    roles: ['Superadmin', 'Manager admin', 'Manager', 'client'],
    selectedSector: null,
    sectors: ['E-commerce', 'Online delivery', 'Online store'],
    checkbox: false,
    lazy: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'key', value: 'key' },
      { text: 'Clients', value: 'actions', sortable: false }
    ]
  }),
  // middleware: ['check-auth'],
  computed: {
    authUser() {
      return this.$store.getters['users/loggedInUser']
    },
    isProgressLoader() {
      return this.$store.getters['helper/isProgressLoader']
    },
    apiKeys() {
      return this.$store.getters['keys/allKeys']
    },
    visibleKeys() {
      return this.$store.getters['keys/visibleKeys']
    },
    userProfile() {
      return this.$store.getters['users/userProfile']
    },
    allCompany() {
      return this.$store.getters['users/allCompany']
    }
  },
  created() {
    try {
      if (this.allCompany.length === 0) {
        this.$store.dispatch('users/fetchCompany')
      }
    } catch (e) {
      return e
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
    copyText() {
      const textToCopy = this.$refs.textToCopy.$el.querySelector('textToCopy')
      textToCopy.select()
      document.execCommand('copy')
    },
    async copySign(index) {
      try {
        await this.$copyText(index)
      } catch (e) {
        return e
      }
    },
    async createKey() {
      this.$store.dispatch('helper/isProgressLoader')
      try {
        await this.$store.dispatch('keys/createKey', {
          name: this.name,
          app: this.app
        })
        this.$store.dispatch('keys/fetchKeys')
        this.$store.dispatch('helper/isProgressLoader')
        this.visibleKeys = this.visibleKeys + 1
        this.dialog1 = false
        this.name = null
        this.app = null
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('You are not Authorized to perform this action')
        }
        throw error
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
</style>
