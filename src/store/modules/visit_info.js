import moment from 'moment'
import { getField, updateField } from 'vuex-map-fields'

const state = {
  visit: {},

  previous_visit: {},

  options: {
    is_art_adherence: [
      'Yes',
      'No'
    ],

    hx_contact_tb: [
      'Yes',
      'No'
    ],

    imp: [
    ],

    arv: [
      '3TC',
      'ABC',
      'ATV',
      'AZT',
      'DRV',
      'EFV',
      'FTC',
      'LPV/r',
      'NVP',
      'RPV',
      'RTV',
      'TDF'
    ],

    oi_prophylaxis: [
      'Azithromycin',
      'Bactrim',
      'Fluconazole',
      'Itraconazole'
    ],

    anti_tb: [
      'Ethambutol',
      'Isoniazid',
      'Pyrazinamide',
      'Rifampicin',
      'Streptomycin'
    ],

    vaccination: [
      'Hepatitis B Vaccine',
      'Influenza Vaccine'
    ],

    abn_pe: [],

    pikaday_option: {
      format: 'DD/MM/YYYY'
    }
  }
}

const mutations = {

  updateField,

  SET_DATA (state, data) {
    data['isLoaded'] = true

    // Change date to right format
    let visitDate = moment(data['date'])

    if (visitDate.isValid()) {
      data['date'] = visitDate.toDate()
    } else {
      data['date'] = null
    }

    state.visit = data
  },

  SET_DEFAULT_VISIT (state) {
    state.visit = {
      date: null,
      is_art_adherence: null,
      art_adherence_scale: null,
      art_delay: null,
      art_adherence_problem: null,
      hx_contact_tb: null,
      bw: null,
      abn_pe: [],
      imp: [],
      arv: [],
      why_switched_arv: null,
      oi_prophylaxis: [],
      anti_tb: [],
      vaccination: [],
      isLoaded: false
    }
  },

  SET_DEFAULT_PREVIOUS_VISIT (state) {
    state.previous_visit = {
      items: [],
      page: 1,
      pages: 1,
      total: 1,
      perPage: 5
    }
  },

  SET_PREVIOUS (state, payload) {
    state.previous_visit = payload
  },

  SET_IS_LOADED (state, isLoaded) {
    state.visit.isLoaded = isLoaded
  },

  SET_FIELD_OPTIONS (state, payload) {
    let fieldName = payload.fieldName
    let options = payload.options
    state.options[fieldName] = options
  }
}

const actions = {
  loadDataAction: ({ commit }, data) => commit('SET_DATA', data),
  setDefaultVisitAction: ({ commit }) => commit('SET_DEFAULT_VISIT'),
  setIsLoadedAction: ({ commit }, isLoaded) => commit('SET_IS_LOADED', isLoaded),
  setDefaultPreviousVisitAction: ({ commit }) => commit('SET_DEFAULT_PREVIOUS_VISIT')
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
