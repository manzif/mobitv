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
      console.log('\n\n\n\n\n', principal)
      const { data } = await this.$axios.post(
        'http://52.36.87.202/mobicash/client/rest/0.0.1/authentification',
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          principal,
          principalType: 'USER',
          pin
        }
      )
      console.log('\n\n\n\n\n', data)
      // const response = await this.$auth.loginWith('local', {
      //   data: {
      //     principalType: 'USER',
      //     principal,
      //     pin
      //   }
      // })
      // console.log('\n\n\n\n', response)
      // if (response.data.result === 'Success') {
      //   await this.$auth.setUser(response.data.details)
      //   await this.$auth.$storage.setLocalStorage(
      //     'userMobitv',
      //     response.data.details
      //   )
      //   await this.$auth.$storage.setCookie('userMobitv', response.data.details)
      //   commit('SET_USER', response.data.details)
      //   await this.$router.push('/')
      // }
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
