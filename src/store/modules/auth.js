let state = {
  isLoggedIn: !!sessionStorage.getItem('jwt_token')
}

let mutations = {
  LOGIN (state) {
    state.isLoggedIn = true
  },

  LOGOUT (state) {
    state.isLoggedIn = false
  }
}

let actions = {
  loginAction: ({ commit }) => commit('LOGIN'),
  logoutAction: ({ commit }) => commit('LOGOUT')
}

export default {
  namespaced: true,
  state,
  //   getters,
  actions,
  mutations
}
