<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="allLogs.data"
      :search="search"
      class="elevation-1"
      item-key="_id"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ allLogs.total }} App-Logs</v-toolbar-title>
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
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: '',
    headers: [
      {
        text: 'IPAddress',
        value: 'IPAddress',
        align: 'start',
        sortable: false
      },
      { text: 'Time', value: 'time' },
      { text: 'Method', value: 'method' },
      { text: 'Endpoint', value: 'endpoint' },
      { text: 'isAuth', value: 'isAuth' },
      { text: 'Created At', value: 'createdAt' }
    ]
  }),
  computed: {
    allLogs() {
      return this.$store.getters['appLogs/allLogs']
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
      if (this.allLogs === '') {
        this.$store.dispatch('appLogs/fetchLogs')
      }
    } catch (e) {
      return e.message
    }
  }
}
</script>
