<template>
  <v-container fluid grid-list-md>
    <div class="mb-7 users-center">
      <v-btn class="disable-events" text dark x-large color="#0087ff">
        Users Overview
        <v-icon right>fa-angle-down</v-icon></v-btn
      >
    </div>
    <v-item-group active-class="secondary">
      <div class="mx-md-12">
        <v-row justify="center">
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4>Total Users</h4>
                    <v-list-item-title class="headline">{{
                      totalUser
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="indigo" right>fa-user-plus</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <h4 class="indigo--text">+3.12%</h4>
                  <v-btn class="disable-events" text>since last month</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4>Total Admin</h4>
                    <v-list-item-title class="headline">{{
                      totalAdmin
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="orange" right>fa-user-secret</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <h4 class="orange--text">+3.12%</h4>
                  <v-btn class="disable-events" text>since The beginning</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4>Total Developers</h4>
                    <v-list-item-title class="headline">{{
                      totalDeveloper
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="green" right>fa-code</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <h4 class="green--text">+3.12%</h4>
                  <v-btn class="disable-events" text>since last month</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4>Total Guests</h4>
                    <v-list-item-title class="headline">{{
                      totalGuest
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="red" right>fa-train</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <h4 class="red--text">+3.12%</h4>
                  <v-btn class="disable-events" text>since last month</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </div>
    </v-item-group>
    <v-item-group id="element" active-class="secondary">
      <div class="mx-md-12">
        <v-data-table
          :headers="headers"
          :items="allUsers"
          :single-expand="true"
          :expanded.sync="expanded"
          :search="search"
          item-key="id"
          show-expand
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>{{ totalUser }} Users</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog1" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" color="primary" dark class="mb-2"
                    >Add User</v-btn
                  >
                </template>
                <v-card>
                  <v-toolbar class="mb-6">
                    <v-spacer />
                    <h3>Create a user</h3>

                    <v-spacer />
                    <v-progress-linear
                      :active="isProgressLoader"
                      :indeterminate="isProgressLoader"
                      absolute
                      bottom
                      color="primary"
                    ></v-progress-linear>
                  </v-toolbar>
                  <v-card-text class="pb-0">
                    <v-form v-model="isFormValid">
                      <v-layout align-center justify-center>
                        <v-flex xs12 sm8>
                          <v-text-field
                            v-model="firstname"
                            :rules="[(v) => !!v || 'FirstName is required']"
                            label="FirstName"
                            outlined
                            clearable
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="lastname"
                            :rules="[(v) => !!v || 'LastName is required']"
                            label="LastName"
                            outlined
                            clearable
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="username"
                            :rules="[(v) => !!v || 'Username is required']"
                            label="Username"
                            outlined
                            clearable
                            dense
                          ></v-text-field>
                          <v-select
                            v-model="role"
                            :rules="[(v) => !!v || 'Type is required']"
                            :items="typeItems"
                            label="Type"
                            dense
                            outlined
                          ></v-select>
                          <v-text-field
                            ref="email"
                            v-model="email"
                            :rules="emailRules"
                            name="login"
                            label="Email Address"
                            type="text"
                            outlined
                            dense
                            required
                          />
                          <v-text-field
                            id="password"
                            ref="password"
                            v-model="password"
                            :rules="passwordRules"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="
                              showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append="showPassword = !showPassword"
                            name="Password"
                            label="Password"
                            required
                            dense
                            outlined
                          />
                        </v-flex>
                      </v-layout>

                      <v-divider></v-divider>

                      <v-card-actions class="justify-center">
                        <v-btn @click="dialog1 = false" color="cancel"
                          >Cancel</v-btn
                        >
                        <v-btn
                          @click="registerUser"
                          :disabled="!isFormValid"
                          color="success"
                          >Save</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length">
              <template>
                <v-card class="mx-auto mt-5 pl-3 mb-5" max-width="544">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1"
                        >Users Actions</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >The following are actions you can perform on this
                        user</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <template>
                    <v-dialog v-model="dialogDelete" persistent max-width="390">
                      <template v-slot:activator="{ on }">
                        <v-chip
                          v-on="on"
                          class="ma-2"
                          color="primary"
                          outlined
                          pill
                        >
                          User Delete
                          <v-icon right>mdi-delete</v-icon>
                        </v-chip>
                      </template>
                      <v-card>
                        <v-card-title class="headline"
                          >Delete {{ item.firstname }}</v-card-title
                        >
                        <v-card-text
                          >Are you sure you want to delete this
                          user</v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="dialogDelete = false" color="cancel"
                            >Cancel</v-btn
                          >
                          <v-btn
                            @click="deleteUser(item.id)"
                            :loading="isLoading"
                            :disabled="isDisabled"
                            color="success"
                            >Delete</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogEdit" max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-chip v-on="on" class="ma-2" color="success" outlined>
                          <v-icon left>mdi-pencil</v-icon>
                          User Edit
                        </v-chip>
                      </template>
                      <v-card>
                        <v-toolbar class="mb-6">
                          <v-spacer />
                          <h3 class="headline">
                            Edit {{ item.username }} info
                          </h3>
                          <v-progress-linear
                            :active="isProgressLoader"
                            :indeterminate="isProgressLoader"
                            absolute
                            bottom
                            color="primary"
                          ></v-progress-linear>
                          <v-spacer />
                        </v-toolbar>

                        <v-card-text class="pb-0">
                          <v-form v-model="isFormValid">
                            <v-layout align-center justify-center>
                              <v-flex xs12 sm8>
                                <v-text-field
                                  v-model="firstname"
                                  :rules="[
                                    (v) => !!v || 'FirstName is required'
                                  ]"
                                  label="FirstName"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                                <v-text-field
                                  v-model="lastname"
                                  :rules="[
                                    (v) => !!v || 'LastName is required'
                                  ]"
                                  label="LastName"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                                <v-text-field
                                  v-model="username"
                                  :rules="[
                                    (v) => !!v || 'Username is required'
                                  ]"
                                  label="Username"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                                <v-text-field
                                  ref="email"
                                  v-model="email"
                                  :rules="emailRules"
                                  name="login"
                                  label="Email Address"
                                  type="text"
                                  outlined
                                  dense
                                  required
                                />
                                <v-text-field
                                  id="password"
                                  ref="password"
                                  v-model="password"
                                  :rules="passwordRules"
                                  :type="showPassword ? 'text' : 'password'"
                                  :append-icon="
                                    showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  @click:append="showPassword = !showPassword"
                                  name="Password"
                                  label="Password"
                                  required
                                  dense
                                  outlined
                                />
                              </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                              <v-btn @click="dialogEdit = false" color="cancel">
                                Cancel</v-btn
                              >
                              <v-btn
                                @click="editUser(item._id)"
                                :disabled="!isFormValid"
                                color="success"
                                >Save</v-btn
                              >
                            </v-card-actions>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogBlock" max-width="500px">
                      <template v-slot:activator="{ on }">
                        <span v-if="item.isActive === true">
                          <v-btn v-on="on" outlined rounded color="red">
                            Block<v-icon right>fa-ban</v-icon>
                          </v-btn>
                        </span>
                        <span v-else>
                          <v-btn
                            v-on="on"
                            outlined
                            rounded
                            disabled
                            color="red"
                          >
                            Block<v-icon right>fa-ban</v-icon>
                          </v-btn>
                        </span>
                      </template>
                      <v-card>
                        <v-toolbar elevation="250" class="mb-8">
                          <v-spacer />
                          <h3>Block this Transaction</h3>
                          <v-progress-linear
                            :active="isProgressLoader"
                            :indeterminate="isProgressLoader"
                            absolute
                            bottom
                            color="primary"
                          ></v-progress-linear>
                          <v-spacer />
                        </v-toolbar>
                        <v-spacer></v-spacer>
                        <v-card-text class="pb-0">
                          <v-form v-model="isFormValid">
                            <v-layout align-center justify-center>
                              <v-flex xs12 sm8>
                                <v-text-field
                                  v-model="reason"
                                  :rules="[(v) => !!v || 'Reason is required']"
                                  label="Reason"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                              <v-btn @click="dialogBlock = false" color="cancel"
                                >Cancel</v-btn
                              >
                              <v-btn
                                @click="blockUser(item._id)"
                                :disabled="!isFormValid"
                                color="success"
                                >Save</v-btn
                              >
                            </v-card-actions>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-dialog>

                    <v-chip class="ma-2" color="indigo darken-3" outlined>
                      <v-icon left>mdi-fire</v-icon>
                      Reverse
                    </v-chip>
                  </template>
                </v-card>
              </template>
            </td>
          </template>
        </v-data-table>
      </div>
    </v-item-group>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      reason: '',
      dialogBlock: false,
      isFormValid: false,
      Delete: 'Delete',
      description: 'are you sure you want to delete this user',
      dialogEdit: false,
      dialog1: false,
      username: '',
      firstname: '',
      showPassword: false,
      lastname: '',
      password: '',
      typeItems: ['admin', 'developer'],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      dialogDelete: false,
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: 'firstName',
          align: 'start',
          sortable: false,
          value: 'firstname'
        },
        { text: 'LastName', value: 'lastname' },
        { text: 'username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'role' },
        { text: 'Created At', value: 'createdAt' },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },
  computed: {
    allUsers() {
      return this.$store.getters['users/allUsers']
    },
    totalUser() {
      return this.$store.getters['users/totalUser']
    },
    totalAdmin() {
      return this.$store.getters['users/totalAdmin']
    },
    totalGuest() {
      return this.$store.getters['users/totalGuest']
    },
    totalDeveloper() {
      return this.$store.getters['users/totalDeveloper']
    },
    isProgressLoader() {
      return this.$store.getters['helper/isProgressLoader']
    },
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    }
  },
  created() {
    try {
      if (this.allUsers.length === 0) {
        this.$store.dispatch('users/fetchUsers')
      }
    } catch (e) {
      return e
    }
  },
  methods: {
    async deleteUser(id) {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('users/deleteUser', id)
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.dialogDelete = false
      } catch (e) {
        return e
      }
    },
    async editUser(id) {
      this.$store.dispatch('helper/isProgressLoader')
      try {
        const userData = {
          email: this.email,
          master: this.master,
          privilege: this.privilege,
          username: this.username,
          password: this.password,
          type: this.type
        }
        await this.$store.dispatch('users/editUser', {
          userData,
          id
        })
        this.$store.dispatch('helper/isProgressLoader')
        this.dialogEdit = false
        this.email = null
        this.master = null
        this.privilege = null
        this.username = null
      } catch (e) {
        return e
      }
    },
    async registerUser() {
      this.$store.dispatch('helper/isProgressLoader')
      try {
        const userData = {
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          password: this.password,
          role: this.role
        }
        await this.$store.dispatch('users/registerUser', userData)
        await this.$store.dispatch('users/fetchUsers')
        this.$store.dispatch('helper/isProgressLoader')
        this.dialog1 = false
        this.email = null
        this.firstname = null
        this.lastname = null
        this.username = null
        this.role = null
        this.password = null
      } catch (e) {
        return e
      }
    },
    async blockUser(id) {
      this.$store.dispatch('helper/isProgressLoader')
      try {
        await this.$store.dispatch('users/blockUser', {
          reason: this.reason,
          userId: id
        })
        this.$store.dispatch('helper/isProgressLoader')
        this.reason = null
        this.dialogBlock = false
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
.users-center {
  text-align: center;
}
</style>
