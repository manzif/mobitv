/* eslint-disable no-console */

export const state = () => ({
  user: '',
  loggedInUser: ''
})

export const mutations = {
  SET_USER(state, user) {
    state.loggedInUser = user
  }
}

export const actions = {
  async login({ commit }, { principal, pin }) {
    try {
      const response = await this.$auth.loginWith('local', {
        data: {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          principalType: 'USER',
          principal,
          pin
        }
      })
      if (response.data.responseCode === 200) {
        await this.$auth.setUser(response.data)
        await this.$auth.$storage.setLocalStorage('userMobitv', response.data)
        await this.$auth.$storage.setCookie('userMobitv', response.data)
        commit('SET_USER', response.data)
        await this.$router.push('/')
      }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: 'Please contact Mobicash. There is a network error'
      })
    }
  },
  async initAuth({ commit }, req) {
    if (req) {
      if (req.headers.cookie) {
        const authUser = this.$auth.$storage.getCookie('userMobitv')
        commit('SET_USER', authUser)
      }
    } else {
      const authUser = this.$auth.$storage.getLocalStorage('userMobitv')
      if (authUser) {
        await this.$auth.setUser(authUser)
        commit('SET_USER', authUser)
      }
    }
  },

  async logout({ commit }) {
    // TODO: implement the logout
    await this.$auth.logout('local')
    await this.$auth.$storage.setLocalStorage('userMobitv', '')
    await this.$auth.$storage.setCookie('userMobitv', '')
    await this.$router.push('/login')
  }
}

export const getters = {
  loggedInUser(state) {
    return state.loggedInUser
  }
}
