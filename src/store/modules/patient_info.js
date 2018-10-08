import moment from 'moment'
import { getField, updateField } from 'vuex-map-fields'
import API from '../../utils/api'

let countries = require('country-list')()

const state = {
  patient: {},

  options: {
    gov_id_type: [
      'บัตรประชาชน',
      'พาสปอร์ต'
    ],

    bill_payer: [
      'ประกันสุขภาพทั่วหน้า',
      'ประกันสุขภาพทั่วหน้า นอกเขต',
      'ประกันสังคม',
      'ประกันสังคม ต่างรพ.',
      'ข้าราชการ/จ่ายตรง',
      'ต่างด้าว',
      'ชำระเงิน'
    ],

    sex: [
      'ชาย',
      'หญิง'
    ],

    gender: [
      'Male',
      'Female',
      'MSM',
      'Bisexual',
      'Lesbian',
      'TG'
    ],

    marital: [
      'โสด',
      'สมรส',
      'หย่าร้าง',
      'ม่าย'
    ],

    countries_list: countries.getNames(),

    education: [
      'ต่ำกว่ามัธยมศึกษาตอนปลาย',
      'มัธยมศึกษาตอนปลาย',
      'ปวช/ปวส',
      'ปริญญาตรี',
      'ปริญญาโท',
      'ปริญญาเอก'
    ],

    is_refer: [
      'ผู้ป่วยใหม่',
      'ผู้ป่วยรับโอน (ยังไม่เริ่ม ARV)',
      'ผู้ป่วยรับโอน (เริ่ม ARV แล้ว)'
    ],

    pikaday_option: {
      format: 'DD/MM/YYYY'
    }
  }
}

const mutations = {

  updateField,

  SET_DATA (state, data) {
    // Change date to right format
    if (moment(data['dob']).isValid()) {
      data['dob'] = moment(data['dob']).toDate()
    }

    if (moment(data['first_encounter']).isValid()) {
      data['first_encounter'] = moment(data['first_encounter']).toDate()
    }

    data['isLoaded'] = true

    state.patient = data
  },

  SET_DEFAULT (state) {
    state.patient = {
      gov_id_type: null,
      gov_id: null,
      name: null,
      dob: null,
      first_encounter: null,
      sex: null,
      gender: null,
      marital: null,
      nationality: null,
      education: null,
      address: null,
      tel: [],
      relative_tel: [],
      is_refer: null,
      refer_from: null,
      hn: null,
      hiv_clinic_id: null,
      nap: null,
      bill_payer: null,
      plans: [],
      isLoaded: false
    }
  },

  DELETE_PLAN (state, index) {
    state.patient.plans.splice(index, 1)
  },

  ADD_PLAN (state, plan) {
    state.patient.plans.push(plan)
  }
}

const actions = {
  setDefaultAction: ({ commit }) => commit('SET_DEFAULT'),

  loadDataAction: ({ commit, dispatch }, hn) => {
    let url = 'patient/' + hn.replace(/\//g, '^')

    return API({
      url: url,
      method: 'get'
    })
      .then(function (response) {
        let data = response.data
        commit('SET_DATA', data)
      })
  },

  addPlanAction: ({ commit }, plan) => {
    let planEntry = {
      date: moment().toDate(),
      plan: plan
    }

    commit('ADD_PLAN', planEntry)
  },

  deletePlanAction: ({ commit }, index) => commit('DELETE_PLAN', index)
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
