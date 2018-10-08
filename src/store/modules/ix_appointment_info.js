// import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const state = {
  labs: [],
  imaging: [],
  appointments: [],

  options: {
    pikaday_option: {
      format: 'DD/MM/YYYY'
    },

    lab_options_pos_neg: [
      '+', '-', '+/-'
    ],

    lab_options_afb: [
      '3+', '2+', '1+', 'Scantly', '-'
    ]
  }
}

const mutations = {

  updateField,

  ADD_RECORD (state, { dataType, newRecord }) {
    state[dataType].items.push(newRecord)
  },

  DELETE_RECORD (state, { dataType, index }) {
    state[dataType].items.splice(index, 1)
  },

  SET_DEFAULT_LABS (state) {
    state.labs = {
      items: [],
      page: 1,
      total: 1,
      perPage: 5
    }
  },

  SET_DEFAULT_IMAGING (state) {
    state.imaging = {
      items: [],
      page: 1,
      total: 1,
      perPage: 5
    }
  },

  SET_DEFAULT_APPOINTMENTS (state) {
    state.appointments = {
      items: [],
      page: 1,
      pages: 1,
      total: 1,
      perPage: 5
    }
  },

  SET_PREVIOUS (state, payload) {
    state[payload.dataType] = payload
  }
}

const actions = {
  setDefaultLabsAction: ({ commit }) => commit('SET_DEFAULT_LABS'),
  setDefaultImagingAction: ({ commit }) => commit('SET_DEFAULT_IMAGING'),
  setDefaultAppointmentsAction: ({ commit }) => commit('SET_DEFAULT_APPOINTMENTS')
}

const getters = {
  getField
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
