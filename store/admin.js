export const state = () => ({
  providers: [],
  operators: [],
  providerssName: [],
  currency: [],
  choosenProvider: [],
  userProviders: [],
  userOperators: []
})

export const mutations = {
  GET_PROVIDERS(state, providers) {
    state.providers = providers
  },
  GET_OPERATORS(state, operators) {
    state.operators = operators
  },
  GET_PROVIDER_NAME(state, provider) {
    state.providerssName = provider
  },
  GET_CURRENCY(state, currency) {
    state.currency = currency
  },
  CHOOSEN_PROVIDER(state, provider) {
    state.choosenProvider = provider
  },
  GET_USER_PROVIDERS(state, provider) {
    state.userProviders = provider
  },
  GET_USER_OPERATORS(state, operator) {
    state.userOperators = operator
  }
}

export const actions = {
  async createProvider({ commit }, { name, description }) {
    try {
      await this.$axios.post('/app-providers', {
        name,
        description
      })
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully created a Provider'
      })
      await this.$router.push('/admin/providers')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async fetchProviders({ commit }) {
    try {
      const { data } = await this.$axios.get('/app-providers')
      commit('GET_PROVIDERS', data)
      data.data.map((item) => {
        if (item.name != null) {
          commit('GET_PROVIDER_NAME', item.name)
        }
      })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('You are not Authorized to perform this action')
      }
      throw error
    }
  },
  async createOperator(
    { commit },
    { name, shortName, description, provider, owner }
  ) {
    try {
      const characters = {
        length: '10',
        sample: '0789461',
        signature: '0780',
        regex: '89898998889'
      }
      await this.$axios.post('/app-operators', {
        name,
        shortName,
        description,
        provider,
        owner,
        characters
      })
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully created an Operator'
      })
      await this.$router.push('/admin/operators')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async fetchOperators({ commit }) {
    try {
      const { data } = await this.$axios.get('/app-operators')
      commit('GET_OPERATORS', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('You are not Authorized to perform this action')
      }
      throw error
    }
  },
  async createCurrency({ commit }, { name, currency, country, symbol }) {
    try {
      await this.$axios.post('/currency', {
        name,
        currency,
        country,
        symbol
      })
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully created a Currency'
      })
      await this.$router.push('/admin/currency')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async fetchCurrency({ commit }) {
    try {
      const { data } = await this.$axios.get('/currency')
      commit('GET_CURRENCY', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('You are not Authorized to perform this action')
      }
      throw error
    }
  },
  async deleteCurrency({ commit }, id) {
    try {
      await this.$axios.delete(`/currency/${id}`)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully deleted a Currency'
      })

      this.dispatch('admin/fetchCurrency')
    } catch (e) {
      return e
    }
  },
  async editCurrency({ commit }, { id, userData }) {
    try {
      await this.$axios.patch(`/currency/${id}`, {
        ...userData
      })
      this.dispatch('admin/fetchCurrency')
    } catch (e) {
      return e
    }
  },
  async deleteProvider({ commit }, id) {
    try {
      await this.$axios.delete(`/app-providers/${id}`)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully deleted a Provider'
      })

      this.dispatch('admin/fetchProviders')
    } catch (e) {
      return e
    }
  },
  async editProvider({ commit }, { id, userData }) {
    try {
      await this.$axios.patch(`/app-providers/${id}`, {
        ...userData
      })
      this.dispatch('admin/fetchProviders')
    } catch (e) {
      return e
    }
  },
  async deleteOperator({ commit }, id) {
    try {
      await this.$axios.delete(`/app-operators/${id}`)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully deleted an Operator'
      })

      this.dispatch('admin/fetchOperators')
    } catch (e) {
      return e
    }
  },
  async editOperator({ commit }, { id, userData }) {
    try {
      await this.$axios.patch(`/app-operators/${id}`, {
        ...userData
      })
      this.dispatch('admin/fetchOperators')
    } catch (e) {
      return e
    }
  },
  async chooseProvider({ commit }, { provider }) {
    try {
      const { data } = await this.$axios.post('/user-providers', {
        provider
      })
      if (data.message === 'This is a duplicate of similar provider') {
        return this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: 'You already have this Provider'
        })
      } else await this.$router.push('/user/providers')
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have added this Provider'
      })
      await this.$router.push('/user/providers')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async fetchUserProvider({ commit }, { id }) {
    try {
      const { data } = await this.$axios.get(`/user-providers/${id}`)
      commit('GET_USER_PROVIDERS', data.providers)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('You are not Authorized to perform this action')
      }
      throw error
    }
  },
  async chooseOperator({ commit }, { operator }) {
    try {
      const { data } = await this.$axios.post('/user-operators', {
        operator
      })
      if (data.message === 'This is a duplicate of similar operator') {
        return this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: 'You already have this Operator'
        })
      } else await this.$router.push('/user/operators')
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have added this Operator'
      })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async fetchUserOperator({ commit }, { id }) {
    try {
      const { data } = await this.$axios.get(`/user-operators/${id}`)
      commit('GET_USER_OPERATORS', data.operators)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('You are not Authorized to perform this action')
      }
      throw error
    }
  }
}

export const getters = {
  allProviders(state) {
    return state.providers
  },
  allOperators(state) {
    return state.operators
  },
  providerName(state) {
    return state.providerssName
  },
  allCurrency(state) {
    return state.currency
  },
  allUserProviders(state) {
    return state.userProviders
  },
  allUserOperators(state) {
    return state.userOperators
  }
}
