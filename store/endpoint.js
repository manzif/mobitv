/* eslint-disable no-console */
// import Cookie from 'js.cookie'

export const state = () => ({
  endpoints: [],
  errorMessage: '',
  totalEndpoint: ''
})

export const mutations = {
  GET_ENDPOINTS(state, endpoints) {
    state.endpoints = endpoints
  },
  GET_ERROR_MESSAGE: (state, message) => {
    state.errorMessage = message
  },
  GET_TOTAL_ENDPOINT: (state, totalEndpoint) => {
    state.totalEndpoint = totalEndpoint
  }
}

export const actions = {
  async fetchEndpoints({ commit }) {
    try {
      const { data } = await this.$axios.get('/endpoints/endpoints')
      commit('GET_ENDPOINTS', data.Endpoints)
      commit('GET_TOTAL_ENDPOINT', data.total)
    } catch (error) {
      if (error.response) {
        console.log('\n\n\n\n\n', error.response.data.message)
      }
    }
  },

  async deleteUser({ commit }, id) {
    try {
      await this.$axios.delete(`/users/${id}`)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully deleted a user'
      })

      this.dispatch('users/fetchUsers')
    } catch (e) {
      return e
    }
  },

  async editUser({ commit }, { id, userData }) {
    try {
      await this.$axios.patch(`/users/${id}`, {
        ...userData
      })
      this.dispatch('users/fetchUsers')
    } catch (e) {
      return e
    }
  },
  async createEndpoint({ commit }) {
    try {
      console.log('\n\n\n', 'ndi hano')
      const { data } = await this.$axios.post(
        'http://52.36.87.202/mobicash/services/rest/0.0.1/nidValidation',
        {
          nid: '1197780022519037',
          paymentYear: '2020'
        }
      )
      console.log('\n\n\n\n\n', data)
      // if (data.message === 'Endpoint successfully created') {
      //   this.dispatch('endpoint/fetchEndpoints')
      //   await this.$router.push('/view-endpoints')
      //   this.dispatch('helper/showingMessage', {
      //     visible: true,
      //     type: 'success',
      //     message: data.message
      //   })
      // }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: error.response.data.message
      })
    }
  },
  async deleteApp({ commit }, id) {
    try {
      console.log('\n\n\n\n\n\n', id)
      const { data } = await this.$axios.delete(
        '/applications/applications',
        id
      )
      console.log('\n\n\n\n\n', data)
      this.dispatch('app/fetchApps')
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: data.message
      })
    } catch (e) {
      return e
    }
  }
}

export const getters = {
  allEndpoints(state) {
    return state.endpoints
  },
  errorMessage(state) {
    return state.errorMessage
  },
  totalEndpoint(state) {
    return state.totalEndpoint
  }
}
