let state = {
  isLoggedIn: !!sessionStorage.getItem('jwt_token')
}

let mutations = {
  LOGIN (state) {
    state.pending = true
  },

  LOGIN_SUCCESS (state) {
    state.isLoggedIn = true
    state.pending = false
  },

  LOGOUT (state) {
    state.isLoggedIn = false
  }
}

export default {
  namespaced: true,
  state,
  //   getters,
  //   actions,
  mutations
}
