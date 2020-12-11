<template>
  <v-container fluid grid-list-md>
    <div class="mb-7 users-center">
      <v-btn class="disable-events" text dark x-large color="#ff8c00">
        Transactions Overview
        <v-icon right>fa-angle-down</v-icon></v-btn
      >
    </div>
    <v-item-group v-model="checkbikora" active-class="secondary">
      <div class="mx-md-12">
        <v-row justify="center">
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4>Total Transactions</h4>
                    <v-list-item-title class="headline">10</v-list-item-title>
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
                    <h4>Completed</h4>
                    <v-list-item-title class="headline">5</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="green" right>fa-users</v-icon>
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
                    <h4>Pending</h4>
                    <v-list-item-title class="headline">3</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="orange" right>fa-user-plus</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <h4 class="orange--text">+3.12%</h4>
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
                    <h4>Failed</h4>
                    <v-list-item-title class="headline">2</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="red" right>fa-ban</v-icon>
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

    <VSubHeader header="Transactions Table" />

    <v-item-group active-class="secondary">
      <div class="mx-md-12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>10 Transactions</v-toolbar-title>
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
          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>{{
              item.status
            }}</v-chip>
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
      isFormValid: false,
      expanded: [],
      headers: [
        {
          text: 'Type',
          align: 'start',
          sortable: false,
          value: 'type'
        },
        { text: 'Status', value: 'status' },
        { text: 'Amount', value: 'amount' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Date', value: 'date' }
      ],
      desserts: [
        {
          type: 'Electricity',
          status: 'completed',
          amount: 5000,
          carbs: 24,
          date: '22/10/2020'
        },
        {
          type: 'RRA',
          status: 'completed',
          amount: '130 000',
          carbs: 37,
          date: '22/10/2020'
        },
        {
          type: 'CBHI',
          status: 'failure',
          amount: '30 000',
          carbs: 23,
          date: '22/10/2020'
        },
        {
          type: 'RNIT',
          status: 'pending',
          amount: '30 000',
          carbs: 67,
          date: '22/10/2020'
        },
        {
          type: 'RRA',
          status: 'failure',
          amount: '45 000',
          carbs: 49,
          date: '22/10/2020'
        },
        {
          type: 'RRA',
          status: 'completed',
          amount: '25 600',
          carbs: 94,
          date: '22/10/2020'
        },
        {
          type: 'Electricity',
          status: 'pending',
          amount: '5000',
          carbs: 51,
          date: '10/10/2020'
        },
        {
          type: 'RRA',
          status: 'completed',
          amount: '24 000',
          carbs: 65,
          date: '22/10/2020'
        }
      ]
    }
  },
  created() {
    try {
      this.$store.dispatch('transactions/fetchTransactions')
    } catch (e) {
      return e.message
    }
  },
  methods: {
    getColor(status) {
      if (status === 'failure') return 'red'
      else if (status === 'completed') return 'green'
      else return 'orange'
    }
  }
}
</script>

<style scoped>
.project.Completed {
  border-left: 4px solid green;
}
.project.pending {
  border-left: 4px solid #ffaa2c;
}
.project.Failed {
  border-left: 4px solid red;
}
.project.Blocked {
  border-left: 4px solid grey;
}
#chipColor .Completed {
  background-color: green;
}
#chipColor .pending {
  background: #ffaa2c;
}
#chipColor .Failed {
  background: red;
}
#chipColor .Blocked {
  background: grey;
}
.disable-events {
  pointer-events: none;
}
.users-center {
  text-align: center;
}
</style>
