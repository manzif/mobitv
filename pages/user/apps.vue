<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="allApps.data"
      :search="search"
      :single-expand="true"
      :expanded.sync="expanded"
      show-expand
      class="elevation-1"
      item-key="_id"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ allApps.total }} Apps</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <template>
            <v-card class="mx-auto mt-5 pl-3 mb-5" max-width="402">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1"
                    >App Actions</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >The following are actions you can perform on this
                    App</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-dialog v-model="dialogDelete" persistent max-width="390">
                <template v-slot:activator="{ on }">
                  <v-chip v-on="on" class="ma-2" color="primary" outlined pill>
                    Delete
                    <v-icon right>mdi-delete</v-icon>
                  </v-chip>
                </template>
                <v-card>
                  <v-card-title class="headline"
                    >Delete {{ item.name }}</v-card-title
                  >
                  <v-card-text
                    >Are you sure you want to delete this App</v-card-text
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogDelete = false" color="cancel"
                      >Cancel</v-btn
                    >
                    <v-btn
                      @click="deleteApp(item._id)"
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
                    App Edit
                  </v-chip>
                </template>
                <v-card>
                  <v-toolbar class="mb-6">
                    <v-spacer />
                    <h3 class="headline">Edit App</h3>
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
                            v-model="name"
                            :rules="[(v) => !!v || 'Name is required']"
                            label="Name"
                            required
                            dense
                            single-line
                            outlined
                          ></v-text-field>
                          <v-select
                            v-model="type"
                            :rules="[(v) => !!v || 'Type is required']"
                            :items="typeItems"
                            label="type"
                            dense
                            outlined
                          ></v-select>
                          <v-text-field
                            v-model="description"
                            label="Description"
                            dense
                            single-line
                            outlined
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>
                      <v-card-actions class="justify-center">
                        <v-btn @click="dialogEdit = false" color="cancel">
                          Cancel</v-btn
                        >
                        <v-btn
                          @click="editApp(item._id)"
                          :disabled="!isFormValid"
                          color="success"
                          >Save</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card>
          </template>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" class="disable-events"
          >You don't have any App</v-btn
        >
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialogEdit: false,
    dialogDelete: false,
    isFormValid: false,
    typeItems: ['web app', 'mobile app', 'desktop app'],
    name: '',
    type: '',
    description: '',
    expanded: [],
    headers: [
      { text: 'isActive', value: 'isActive', align: 'start', sortable: false },
      { text: 'Name', value: 'name' },
      { text: 'Type', value: 'type' },
      { text: 'Description', value: 'description' },
      { text: '', value: 'data-table-expand' }
    ]
  }),
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    },
    allOperators() {
      return this.$store.getters['admin/allOperators']
    },
    isProgressLoader() {
      return this.$store.getters['helper/isProgressLoader']
    },
    allApps() {
      return this.$store.getters['apps/allApps']
    }
  },
  created() {
    try {
      this.$store.dispatch('apps/fetchApps')
    } catch (e) {
      return e.message
    }
  },
  methods: {
    async deleteApp(id) {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('apps/deleteApp', id)
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.dialogDelete = false
      } catch (e) {
        return e
      }
    },
    async editApp(id) {
      this.$store.dispatch('helper/isProgressLoader')
      try {
        const userData = {
          name: this.name,
          type: this.type,
          description: this.description
        }
        await this.$store.dispatch('apps/editApp', {
          userData,
          id
        })
        this.$store.dispatch('helper/isProgressLoader')
        this.dialogEdit = false
        this.name = null
        this.type = null
        this.description = null
      } catch (e) {
        return e
      }
    }
  }
}
</script>
