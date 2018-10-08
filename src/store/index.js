import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import savedRecord from './modules/saved_records'
import patientInfo from './modules/patient_info'
import visitInfo from './modules/visit_info'
import IXAppointmentInfo from './modules/ix_appointment_info'
import API from '../utils/api'
import dateToIsostring from '../utils/date_to_isostring'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    savedRecord,
    patientInfo,
    visitInfo,
    IXAppointmentInfo
  },

  state: {
  },

  getters: {
  },

  actions: {
    saveRecordAction: ({ commit, rootState }, options) => {
      // extract options
      let isPatch = options.isPatch
      let dataType = options.dataType
      let relativeURL = null
      let payload = null
      let hn = rootState['patientInfo'].patient.hn.replace(/\//g, '^')
      let httpMethod = ''

      // Reject if the there is no HN specified
      if (dataType !== 'patient' && !rootState['patientInfo'].patient.hn) {
        console.log('HN is required to generate HTTP POST/PATCH request for this type of data.')
        Promise.reject(new Error('Invalid HN.'))
      }

      // Choose correct HTTP method
      if (dataType === 'patient' && !isPatch) {
        httpMethod = 'post'
      } else if (dataType === 'patient' && isPatch) {
        httpMethod = 'patch'
      } else {
        httpMethod = 'put'
      }

      // prepare payload
      if (dataType === 'patient') {
        payload = _.cloneDeep(rootState['patientInfo'].patient)
        payload['dob'] = dateToIsostring(payload['dob'])
        payload['first_encounter'] = dateToIsostring(payload['first_encounter'])

        relativeURL = 'patient'

        if (isPatch) {
          relativeURL = relativeURL + '/' + hn
        }
      } else if (dataType === 'visits') {
        payload = _.cloneDeep(rootState['visitInfo'].visit)
        payload['date'] = dateToIsostring(payload['date'])
        relativeURL = 'patient/' + hn + '/visits'

        if (payload.id) {
          relativeURL = relativeURL + '/' + payload.id
        }
      } else if (dataType === 'labs' && options.newRecord) {
        payload = _.cloneDeep(options.newRecord)
        payload['date'] = dateToIsostring(payload['date'])
        relativeURL = 'patient/' + hn + '/labs'

        if (payload.id) {
          relativeURL = relativeURL + '/' + payload.id
        }
      } else if (dataType === 'imaging' && options.newRecord) {
        payload = _.cloneDeep(options.newRecord)
        payload['date'] = dateToIsostring(payload['date'])
        relativeURL = 'patient/' + hn + '/imaging'

        if (payload.id) {
          relativeURL = relativeURL + '/' + payload.id
        }
      } else if (dataType === 'appointments' && options.newRecord) {
        payload = _.cloneDeep(options.newRecord)
        payload['date'] = dateToIsostring(payload['date'])
        relativeURL = 'patient/' + hn + '/appointments'

        if (payload.id) {
          relativeURL = relativeURL + '/' + payload.id
        }
      } else {
        console.log('Unable to find a state.')
        return
      }

      // Remove null values
      payload = _(payload).omitBy(_.isNil).value()
      console.log('Saving record.')

      return API({
        url: relativeURL,
        method: httpMethod,
        data: payload
      })
    },

    loadAllRecordsAction: ({ commit, rootState }, options) => {
      // extract options
      let hn = rootState['patientInfo'].patient.hn.replace(/\//g, '^')
      let dataType = options.dataType

      let page = options.page
      let relativeURL = ''
      let commitPath = ''

      if (dataType === 'visits') {
        relativeURL = 'patient/' + hn + '/visits'
        commitPath = 'visitInfo/SET_PREVIOUS'
      } else if (dataType === 'labs') {
        relativeURL = 'patient/' + hn + '/labs'
        commitPath = 'IXAppointmentInfo/SET_PREVIOUS'
      } else if (dataType === 'imaging') {
        relativeURL = 'patient/' + hn + '/imaging'
        commitPath = 'IXAppointmentInfo/SET_PREVIOUS'
      } else if (dataType === 'appointments') {
        relativeURL = 'patient/' + hn + '/appointments'
        commitPath = 'IXAppointmentInfo/SET_PREVIOUS'
      } else {
        console.log('Unable to find a state.')
        return
      }

      return API({
        url: relativeURL,
        method: 'get',
        params: {
          page: page
        }
      })
        .then((response) => {
          let data = response.data
          data['dataType'] = dataType

          commit(commitPath, data, { root: true })
        })
    },

    loadRecordAction: ({ commit, rootState }, options) => {
      // extract options
      let hn = rootState['patientInfo'].patient.hn.replace(/\//g, '^')
      let dataType = options.dataType
      let recordID = options.recordID

      let relativeURL = ''
      let commitPath = ''

      if (dataType === 'patient') {
        relativeURL = 'patient'
        commitPath = 'patientInfo/SET_DATA'
      } else if (dataType === 'visits') {
        relativeURL = 'patient/' + hn + '/visits/' + recordID
        commitPath = 'visitInfo/SET_DATA'
      } else if (dataType === 'labs') {
        relativeURL = 'patient/' + hn + '/labs/' + recordID
        commitPath = 'IXAppointmentInfo/SET_DATA_LABS'
      } else if (dataType === 'imaging') {
        relativeURL = 'patient/' + hn + '/imaging/' + recordID
        commitPath = 'IXAppointmentInfo/SET_DATA_IMAGING'
      } else if (dataType === 'appointments') {
        relativeURL = 'patient/' + hn + '/appointments/' + recordID
        commitPath = 'IXAppointmentInfo/SET_DATA_APPOINTMENTS'
      } else {
        console.log('Unable to find a state.')
        return
      }

      return API({
        url: relativeURL,
        method: 'get'
      })
        .then((response) => {
          let data = response.data
          commit(commitPath, data, { root: true })
        })
    },

    deleteRecordAction: ({ commit, rootState }, options) => {
      // extract options
      let hn = rootState['patientInfo'].patient.hn.replace(/\//g, '^')
      let dataType = options.dataType
      let recordID = options.recordID

      let relativeURL = ''

      if (dataType === 'visits') {
        relativeURL = 'patient/' + hn + '/visits/' + recordID
      } else if (dataType === 'labs') {
        relativeURL = 'patient/' + hn + '/labs/' + recordID
      } else if (dataType === 'imaging') {
        relativeURL = 'patient/' + hn + '/imaging/' + recordID
      } else if (dataType === 'appointments') {
        relativeURL = 'patient/' + hn + '/appointments/' + recordID
      } else {
        console.log('Unable to find a state.')
        return
      }

      return API({
        url: relativeURL,
        method: 'delete'
      })
    },

    getFormOptionsAction: ({ commit, rootState }, options) => {
      let fieldName = options.fieldName
      let query = options.query
      let commitPath = ''

      if (!fieldName || !query) {
        return
      }

      if (fieldName === 'imp') {
        commitPath = 'visitInfo/SET_FIELD_OPTIONS'
      }

      return API({
        url: 'search/field_entries',
        method: 'get',
        params: {
          'field_name': fieldName,
          'query': query
        }
      })
        .then((response) => {
          let options = response.data

          if (options) {
            commit(commitPath, {
              'fieldName': fieldName,
              'options': options
            })
          } else {
            commit(commitPath, {
              'fieldName': fieldName,
              'options': []
            })
          }
        })
    }
  },

  mutations: {
  }
})
