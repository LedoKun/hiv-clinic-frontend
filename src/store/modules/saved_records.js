let state = {
  limitRecords: 20,
  savedRecords: []
}

let mutations = {
  ADD (state, HN) {
    state.savedRecords.unshift(HN)

    while (state.savedRecords.length > state.limitRecords) {
      state.savedRecords.pop()
    }
  }
}

let actions = {
  addHNAction ({ commit }, HN) {
    if (!state.savedRecords.includes(HN)) {
      commit('ADD', HN)
    }
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
