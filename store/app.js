/* eslint-disable no-console */
// import Cookie from 'js.cookie'

export const state = () => ({
  apps: [],
  errorMessage: '',
  totalApp: ''
})

export const mutations = {
  GET_APPS(state, apps) {
    state.apps = apps
  },
  GET_ERROR_MESSAGE: (state, message) => {
    state.errorMessage = message
  },
  GET_TOTAL_APP: (state, totalApp) => {
    state.totalApp = totalApp
  }
}

export const actions = {
  async fetchApps({ commit }) {
    try {
      const { data } = await this.$axios.get('/applications/applications')
      commit('GET_APPS', data.applications)
      commit('GET_TOTAL_APP', data.total)
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
  async createApp({ commit }, { title, description, userName, userId }) {
    try {
      const { data } = await this.$axios.post('applications', {
        title,
        description,
        userName,
        userId
      })
      if (data.message === 'Application successfully created') {
        this.dispatch('app/fetchApps')
        await this.$router.push('/view-apps')
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: data.message
        })
      }
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
      const { data } = await this.$axios.delete(
        '/applications/applications',
        id
      )
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
  allApps(state) {
    return state.apps
  },
  errorMessage(state) {
    return state.errorMessage
  },
  totalApp(state) {
    return state.totalApp
  }
}
