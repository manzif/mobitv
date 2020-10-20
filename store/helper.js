/* eslint-disable no-console */
export const state = () => ({
  isLoading: false,
  isDisabled: false,
  isProgressLoader: false,
  message: {
    content: null,
    isVisible: false,
    type: 'success',
    obj: null,
    position: 'center-right',
    timeout: 5000
  }
})

export const mutations = {
  SET_LOADER(state, loader) {
    state.isLoading = loader
  },
  SET_PROGRESS_LOADER(state, progressLoader) {
    state.isProgressLoader = progressLoader
  },
  SET_DISABLE(state, disable) {
    // console.log(disable)
    state.isDisabled = disable
  },
  SHOW_MESSAGE(state, message) {
    state.message.isVisible = message.visible
    state.message.type = message.type
    state.message.content = message.message
  },
  INITIALIZE_MESSAGE(state, message) {
    state.message.isVisible = false
  }
}

export const actions = {
  loading({ commit, state }) {
    commit('SET_LOADER', !state.isLoading)
  },
  disabling({ commit, state }) {
    commit('SET_DISABLE', !state.isDisabled)
  },
  showingMessage({ commit }, payload) {
    commit('SHOW_MESSAGE', payload)
  },
  isProgressLoader({ commit, state }) {
    commit('SET_PROGRESS_LOADER', !state.isProgressLoader)
  },
  initializeMessage({ commit }) {
    commit('INITIALIZE_MESSAGE')
  }
}

export const getters = {
  isLoading(state) {
    return state.isLoading
  },
  isDisabled(state) {
    return state.isDisabled
  },
  isMessageVisible(state) {
    return state.message.isVisible
  },
  isMessage(state) {
    return state.message
  },
  isProgressLoader(state) {
    return state.isProgressLoader
  }
}
