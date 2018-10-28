<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-2">
      <div v-if="!$moment(this.visit.date).isValid()">
        <h2 class="h2">
          Visits
        </h2>
      </div>

      <div v-else>
        <h2 class="h2">
          Visit On: {{ $moment(this.visit.date).format('D MMMM YYYY') }}
        </h2>
      </div>
    </div>
    <!-- /Header -->

    <!-- Form -->
    <div>
      <b-form
        @reset="resetForm"
      >
        <!-- Section header -->
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
          <h2 class="lead mb-3">Visit Information</h2>

          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group">
              <button
                class="btn btn-sm btn-outline-danger"
                type="reset"
              >
                Reset Visit Information
              </button>
              <button
                class="btn btn-sm btn-outline-success"
                type="submit"
                @click.prevent="saveVisitInfo"
              >
                Save Visit Information
              </button>
            </div>
          </div>
        </div>
        <!-- /Section header -->

        <div class="pt-3 pb-2">
          <!-- Patient summary -->
          <b-form-row class="mb-4">
            <b-col>
              <span><b>Patient Name: </b></span><br />
              <span><b>HN #</b>{{ this.patient.hn }}</span><br />
              <span><b>Clinic #</b>{{ this.patient.hiv_clinic_id }}</span>
            </b-col>

            <b-col>
              <span><b>Sex: </b>{{ this.patient.sex }}</span><br />
              <span><b>Gender: </b>{{ this.patient.gender }}</span><br />
            </b-col>

            <b-col>
              <span><b>Date of Birth: </b>{{ this.getStringDate(this.patient.dob) }}</span><br />
              <span><b>Age: </b>{{ this.getAge(this.patient.dob) }}</span>
            </b-col>

            <b-col>
              <span><b>Nationality: </b>{{ this.patient.nationality }}</span><br />
              <span><b>Payment: </b>{{ this.patient.bill_payer }}</span>
            </b-col>
          </b-form-row>
          <!-- /Patient summary -->

          <!-- Previous visit -->
          <b-form-row>
            <b-col>
              <h3 class="lead mb-3">
                Previous Visits
              </h3>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col>
              <table
                class="table table-striped table-sm"
              >
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">ART Adherence</th>
                    <th scope="col">Problems?</th>
                    <th scope="col">Scale</th>
                    <th scope="col">Delayed</th>
                    <th scope="col">Contact TB?</th>
                    <th scope="col">BW</th>
                    <th scope="col">Abn PE</th>
                    <th scope="col">Imp</th>
                    <th scope="col">ARV</th>
                    <th scope="col">Switch?</th>
                    <th scope="col">OI Med</th>
                    <th scope="col">Anti-TB Med</th>
                    <th scope="col">Vaccine</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <th
                    v-if="previous_visit.items.length === 0"
                    colspan="15"
                    class="text-center"
                  >
                    No Data...
                  </th>
                  <tr
                    v-else
                    v-for="(item, index) in previous_visit.items"
                    v-bind:key="index"
                  >
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ $moment(item.date).format('D/MM/YYYY') }}</td>
                    <td>{{ item.is_art_adherence }}</td>
                    <td>{{ item.art_adherence_problem }}</td>
                    <td>{{ item.art_adherence_scale }}</td>
                    <td>{{ item.art_delay }}</td>
                    <td>{{ item.hx_contact_tb }}</td>
                    <td>{{ item.bw }}</td>
                    <td><span v-html="item.abn_pe.join('<br>')"></span></td>
                    <td><span v-html="item.imp.join('<br>')"></span></td>
                    <td><span v-html="item.arv.join('<br>')"></span></td>
                    <td>{{ item.why_switched_arv }}</td>
                    <td><span v-html="item.oi_prophylaxis.join('<br>')"></span></td>
                    <td><span v-html="item.anti_tb.join('<br>')"></span></td>
                    <td><span v-html="item.vaccination.join('<br>')"></span></td>
                    <td class="float-right">
                      <div class="btn-group">
                        <b-btn
                          class="btn-sm btn-outline-danger"
                          @click.prevent="deleteRecord(item.id)"
                        >
                          <span><feather type="trash" /></span>
                        </b-btn>
                        <b-btn
                          class="btn-sm btn-outline-dark float-right"
                          @click.prevent="loadRecord(item.id)"
                        >
                          <span><feather type="edit-3" /></span>
                        </b-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-form-row>

          <b-form-row class="mb-4">
            <b-col>
              <b-pagination
                align="center"
                size="sm"
                base-url="#"
                :total-rows="previous_visit.total"
                v-model="page"
                :per-page="previous_visit.perPage"
              />
            </b-col>
          </b-form-row>
          <!-- /Previous visit -->

          <!-- Form -->
          <h2
            class="lead mb-3"
            v-if="!visit.id"
          >
            New Visit Information
          </h2>

          <h2
            class="lead mb-3"
            v-else
          >
            Editing Visit #{{ visit.id }}
          </h2>

          <b-form-row>
            <b-col class="form-group">
              <label for="date">Visit Date</label>
              <b-input-group>
                <b-input-group-prepend is-text>
                  <span><feather type="calendar" /></span>
                </b-input-group-prepend>
                <vue-pikaday
                  id="visit-date"
                  class="form-control"
                  v-model="date"
                  :options="options.pikaday_option"
                />
              </b-input-group>
            </b-col>

            <b-col class="form-group">
              <label for="is_arv_adhere">Adherence to ART?</label>
              <multiselect
                id="is_arv_adhere"
                v-model="is_art_adherence"
                :options="options.is_art_adherence"
                :tabIndex="0"
                placeholder="เลือก"
              />
            </b-col>
          </b-form-row>

          <b-form-row
            v-show="is_art_adherence === 'No'"
          >
            <b-col class="form-group">
              <label for="art_adherence_problem">Specify ART Adherence Problems</label>
              <b-input-group>
                <TypeAhead
                  id="art_adherence_problem"
                  v-model="art_adherence_problem"
                  src="/api/search/field_entries?field_name=art_adherence_problem&query=:keyword"
                  :getResponse="getResponse"
                  :minChars="parseInt(3)"
                  :delayTime="parseInt(500)"
                />
                <b-input
                  hidden
                  name="art_adherence_problem"
                  data-vv-as="ART Adherence Problem"
                  v-bind:class="{ 'is-invalid': errors.has('art_adherence_problem') }"
                  v-validate="(is_art_adherence === 'No' && date) ? 'required' : '' "
                  v-model="art_adherence_problem"
                />
                <div class="invalid-feedback">
                  {{ errors.first('art_adherence_problem') }}
                </div>
              </b-input-group>
            </b-col>

            <b-col class="form-group">
              <label for="art_adherence_scale">ART Adherence Scale</label>
              <b-input-group>
                <b-input
                  id="art_adherence_scale"
                  name="art_adherence_scale"
                  data-vv-as="ART Adherence Scale"
                  v-bind:class="{ 'is-invalid': errors.has('art_adherence_scale') }"
                  v-validate="(is_art_adherence === 'No' && date) ? 'required' : '' "
                  type="number"
                  v-model="art_adherence_scale"
                  :disabled="is_art_adherence !== 'No'"
                />
                <b-input-group-append>
                  <span class="input-group-text">%</span>
                </b-input-group-append>
                <div class="invalid-feedback">
                  {{ errors.first('art_adherence_scale') }}
                </div>
              </b-input-group>
            </b-col>

            <b-col class="form-group">
              <label for="art_delay">Doses Delayed by</label>
              <b-input-group>
                <b-input
                  id="art_delay"
                  name="art_delay"
                  data-vv-as="ART Delay"
                  v-bind:class="{ 'is-invalid': errors.has('art_delay') }"
                  v-validate="(is_art_adherence === 'No' && date) ? 'required' : '' "
                  type="number"
                  v-model="art_delay"
                  :disabled="is_art_adherence !== 'No'"
                />
                <b-input-group-append>
                  <span class="input-group-text">min</span>
                </b-input-group-append>
                <div class="invalid-feedback">
                  {{ errors.first('art_delay') }}
                </div>
              </b-input-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col class="form-group">
              <label for="hx_contact_tb">Contact TB?</label>
              <multiselect
                id="hx_contact_tb"
                v-model="hx_contact_tb"
                :options="options.hx_contact_tb"
                :tabIndex="0"
                placeholder="เลือก"
              />
            </b-col>

            <b-col class="form-group">
              <label for="bw">Body Weight (kg)</label>
              <b-input-group>
                <b-input
                  id="bw"
                  name="bw"
                  data-vv-as="Body Weight"
                  v-bind:class="{ 'is-invalid': errors.has('bw') }"
                  v-validate="date ? 'decimal' : ''"
                  type="number"
                  v-model="bw"
                />
                <div class="invalid-feedback">
                  {{ errors.first('bw') }}
                </div>
              </b-input-group>
            </b-col>

            <b-col class="form-group">
              <label for="imp">Abnormal PE</label>
              <multiselect
                id="abn_pe"
                v-model="abn_pe"
                :options="options.abn_pe"
                placeholder="เลือก"
                :multiple="true"
                :closeOnSelect="false"
                :searchable="true"
                :tabIndex="0"
                :showLabels="true"
                :taggable="true"
                @tag="addTag"
              />
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col class="form-group">
              <label for="imp">Impressions</label>
              <multiselect
                id="imp"
                v-model="imp"
                :options="options.imp"
                placeholder="Type to search"
                :multiple="true"
                :closeOnSelect="false"
                :searchable="true"
                @search-change="debouncedImp"
                :tabIndex="0"
                :showLabels="true"
                :taggable="false"
              />
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col class="form-group">
              <label for="arv">ARV Regimen</label>
              <multiselect
                id="arv"
                v-model="arv"
                :options="options.arv"
                placeholder="เลือก"
                :multiple="true"
                :closeOnSelect="false"
                :searchable="true"
                :tabIndex="0"
                :taggable="true"
                @tag="addTag"
                :showLabels="true"
              />
            </b-col>

            <!-- TODO: Check previus ARV and required this field -->
            <b-col class="form-group">
              <label for="why_switched_arv">Reasons For Using New ARV Regimen</label>
              <b-input-group>
                <TypeAhead
                  id="why_switched_arv"
                  v-model="why_switched_arv"
                  src="/api/search/field_entries?field_name=why_switched_arv&query=:keyword"
                  :getResponse="getResponse"
                  :minChars="parseInt(3)"
                  :delayTime="parseInt(500)"
                />
              </b-input-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col class="form-group">
              <label for="oi_prophylaxis">OI Prophylaxis</label>
              <multiselect
                id="oi_prophylaxis"
                v-model="oi_prophylaxis"
                :options="options.oi_prophylaxis"
                placeholder="เลือก"
                :multiple="true"
                :closeOnSelect="false"
                :tabIndex="0"
                :searchable="true"
                :taggable="true"
                @tag="addTag"
                :showLabels="true"
              />
            </b-col>

            <b-col class="form-group">
              <label for="anti_tb">Anti-TB Drugs</label>
              <multiselect
                id="anti_tb"
                v-model="anti_tb"
                :options="options.anti_tb"
                placeholder="เลือก"
                :multiple="true"
                :closeOnSelect="false"
                :searchable="true"
                :tabIndex="0"
                :taggable="true"
                @tag="addTag"
                :showLabels="true"
              />
            </b-col>

            <b-col class="form-group">
              <label for="vaccination">Vaccination</label>
              <multiselect
                id="vaccination"
                v-model="vaccination"
                :options="options.vaccination"
                placeholder="เลือก"
                :multiple="true"
                :closeOnSelect="false"
                :searchable="true"
                :tabIndex="0"
                :taggable="true"
                @tag="addTag"
                :showLabels="true"
              />
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col class="mt-4">
              <button
                class="btn btn-sm btn-outline-danger float-left"
                type="reset"
              >
                Reset Visit Information
              </button>
              <b-button
                type="submit"
                variant="success"
                class="btn btn-sm btn-outline-success float-right"
                @click.prevent="saveVisitInfo"
              >
                Save Visit Information
              </b-button>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
    </div>
    <!-- / Form -->
  </div>
</template>

<style scoped>
.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
</style>
<style src="@enrian/vue-pikaday/dist/vue-pikaday.min.css"></style>

<script>
import TypeAhead from 'vue2-typeahead'
import Multiselect from 'vue-multiselect'
import InputTag from 'vue-input-tag'
import { mapFields } from 'vuex-map-fields'
import { mapState, mapActions } from 'vuex'
import '../../store'

export default {
  name: 'VisitForm',

  components: {
    Multiselect,
    InputTag,
    TypeAhead
  },

  watch: {
    isLoaded: function (newValue, oldValue) {
      if (newValue) {
        this.debouncedHN()
      } else {
        this.resetToDefault()
      }
    },

    page: function (newValue, oldValue) {
      if (newValue && oldValue !== newValue) {
        this.debouncedPage()
      }
    }
  },

  computed: {
    ...mapState('visitInfo', [
      'visit',
      'options'
    ]),
    ...mapState('patientInfo', [
      'patient'
    ]),
    ...mapFields('visitInfo', [
      'visit.date',
      'visit.is_art_adherence',
      'visit.art_adherence_scale',
      'visit.art_delay',
      'visit.art_adherence_problem',
      'visit.hx_contact_tb',
      'visit.bw',
      'visit.abn_pe',
      'visit.imp',
      'visit.arv',
      'visit.why_switched_arv',
      'visit.oi_prophylaxis',
      'visit.anti_tb',
      'visit.vaccination',
      'previous_visit',
      'previous_visit.page'
    ]),
    ...mapFields('patientInfo', [
      'patient.isLoaded'
    ]),

    isPatch: function () {
      return (typeof this.visit.id !== 'undefined')
    }
  },

  data () {
    return {
      debouncedHN: this.$lodash.debounce(this.loadAllRecords, 1000),
      debouncedPage: this.$lodash.debounce(this.loadAllRecords, 1000),
      debouncedARTAdheranceProblems: this.$lodash.debounce(this.getMultiselectOptions, 500),
      debouncedImp: this.$lodash.debounce(this.getMultiselectOptions, 500)
    }
  },

  created () {
    this.resetToDefault()
  },

  mounted () {
  },

  destroyed () {
    this.resetToDefault()
  },

  methods: {
    ...mapActions('visitInfo', [
      'loadDataAction',
      'setDefaultVisitAction',
      'setDefaultPreviousVisitAction'
    ]),

    ...mapActions([
      'saveRecordAction',
      'loadAllRecordsAction',
      'loadRecordAction',
      'deleteRecordAction',
      'getFormOptionsAction'
    ]),

    resetToDefault () {
      this.setDefaultVisitAction()
      this.setDefaultPreviousVisitAction()
      this.$validator.reset()
    },

    resetForm () {
      this.setDefaultVisitAction()
      this.$validator.reset()
    },

    getStringDate (strDate) {
      if (!this.$moment(strDate).isValid()) {
        return '-'
      } else {
        return this.$moment(strDate).format('D MMMM YYYY')
      }
    },

    getAge (strDate) {
      if (!this.$moment(strDate).isValid()) {
        return '-'
      } else {
        let now = this.$moment()
        let dob = this.$moment(strDate)

        let years = now.diff(dob, 'year')
        dob.add(years, 'years')

        let months = now.diff(dob, 'months')
        dob.add(months, 'months')

        let days = now.diff(dob, 'days')

        return years + ' ปี ' +
               months + ' เดือน ' +
               days + ' วัน'
      }
    },

    saveVisitInfo () {
      // handles unknown hn
      if (!this.patient.hn || !this.$moment(this.visit.date).isValid()) {
        this.$notify({
          title: 'Please specify a valid patient HN and visit date',
          type: 'error'
        })

        return
      }

      // saves data to db
      let self = this

      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            let self2 = self
            console.log('Saving visit information')

            self.saveRecordAction({
              isPatch: self.isPatch,
              dataType: 'visits'
            })
              .then((response) => {
                self2.$notify({
                  title: 'Visit Information Saved',
                  type: 'success'
                })

                // Refresh all visits
                self.loadAllRecords()
              })
              .catch((error) => {
                self2.$notify({
                  title: 'Cannot Save Visit Information',
                  type: 'error',
                  text: error.response.data.message
                })
              })
          }
        })
        .catch((error) => {
          // validator logic error
          console.log(error)
        })
    },

    loadAllRecords () {
      // return if there is no patient in the db
      if (!this.patient.isLoaded) {
        this.resetToDefault()
        return
      }

      let self = this

      this.loadAllRecordsAction({
        dataType: 'visits',
        page: this.previous_visit.page
      })
        .then((response) => {
          console.log('Previous visits loaded.')
        })
        .catch((error) => {
          self.$notify({
            title: 'Unable to Load Previous Visits Data',
            type: 'error'
          })
          console.log('Unable to load previous visits data.')
          console.log(error)
        })
    },

    loadRecord (recordID) {
      // return if there is no patient in the db
      if (!this.patient.isLoaded) {
        this.resetToDefault()
        return
      }

      let self = this

      this.loadRecordAction({
        dataType: 'visits',
        recordID: recordID
      })
        .then((response) => {
          console.log('Previous visits loaded.')
          self.$notify({
            title: 'Sucessfully Loaded Previous Visits Data',
            type: 'success'
          })
        })
        .catch((error) => {
          let errorText = 'An unknown error has occurred.'

          if (error.response) {
            errorText = error.response.data.message
          }

          console.log('No visit data with such ID.')
          self.$notify({
            title: 'Unable to Load Visit Data.',
            text: errorText,
            type: 'error'
          })
        })
    },

    deleteRecord (recordID) {
      let payload = {
        dataType: 'visits',
        recordID: recordID
      }

      let self = this

      // Remove from DB
      this.deleteRecordAction(payload)
        .then((response) => {
          console.log('Delete visit sucessfully')
          self.$notify({
            title: 'Delete Visit Sucessfully',
            type: 'success'
          })

          // Refresh all visits
          self.page = 1
          self.loadAllRecords()
        })
        .catch((error) => {
          self.$notify({
            title: 'Unable To Delete Selected Visit',
            type: 'error',
            text: error
          })
          console.log('Unable to delete visit information.')
          console.log(error)
        })
    },

    getMultiselectOptions (query, fieldName) {
      let self = this

      this.getFormOptionsAction({
        'fieldName': fieldName,
        'query': query
      })
        .catch((error) => {
          self.notify({
            title: 'Unable To Connect To The Backend Server',
            type: 'error'
          })
          console.log('Unable obtain field\'s selections.')
          console.log(error)
        })
    },

    addTag (value, fieldName) {
      if (fieldName === 'arv') {
        value = value.toUpperCase()
      } else {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }

      this[fieldName].push(value)
    },

    getResponse: function (response) {
      return response.data
    }
  }
}
</script>
