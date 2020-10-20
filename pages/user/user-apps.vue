<template>
  <v-container fill-height fluid>
    <div class="mx-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="7" sm="6">
          <h2 class="pb-1" color="#0087ff">
            Create an App to be used in transactions.
          </h2>
          <div class="line"></div>
          <h4 class="my-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut,
            suscipit a. Debitis placeat asperiores corrupti dolores? Vel
            voluptatibus aut animi, quas doloribus, itaque molestiae ipsum
            officia at natus mollitia iure?
          </h4>
          <v-btn class="" color="#0087ff" outlined to="/user/apps" nuxt
            ><v-icon>mdi-play</v-icon> See all your applications</v-btn
          >
        </v-col>
        <v-col cols="12" md="5" sm="6">
          <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
            <v-flex xs12 md12 class="pb-7">
              <h2 class="headline black--text pb-1 font-weight-bold">
                Create App
              </h2>
              <div class="line"></div>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="name"
                :rules="[(v) => !!v || 'Name is required']"
                label="Name"
                required
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-select
                v-model="type"
                :rules="[(v) => !!v || 'Type is required']"
                :items="typeItems"
                label="type"
                dense
                outlined
              ></v-select>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="description"
                label="Description"
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-btn
                @click="createApp"
                :loading="isLoading"
                :disabled="isDisabled"
                color="primary"
                block
                >Create</v-btn
              >
            </v-flex>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      type: '',
      isFormValid: false,
      description: '',
      typeItems: ['web app', 'mobile app', 'desktop app']
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    }
  },
  methods: {
    async createApp() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('apps/createApp', {
          name: this.name,
          type: this.type,
          description: this.description
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
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
<style scoped>
.line {
  width: 63px;
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
