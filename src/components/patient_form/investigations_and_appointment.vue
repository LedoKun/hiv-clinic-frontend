<template>
  <div>
    <!-- Investigations -->
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-2">
      <div>
        <h2 class="h2">
          Investigations
        </h2>
      </div>
    </div>

    <!-- Labs -->
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2">
      <h2 class="lead">Labs</h2>
    </div>

    <!-- Lab tables -->
    <div class="table">
      <form
        @reset="resetLabForm"
        @submit.prevent="addRecord('labs')"
        data-vv-scope="labs"
      >
        <b-form-row>
          <b-col class="form-group">
            <label for="lab_date">Lab Results Date</label>
            <b-input-group>
              <b-input-group-prepend is-text>
                <span><feather type="calendar" /></span>
              </b-input-group-prepend>
              <vue-pikaday
                id="lab_date"
                class="form-control"
                v-model="input_lab_date"
                :options="options.pikaday_option"
              />
              <b-input
                hidden
                v-model="input_lab_date"
                name="lab_date"
                data-vv-as="Lab result date"
                v-bind:class="{ 'is-invalid': errors.has('labs.lab_date') }"
                v-validate="'required'">
              </b-input>
              <div class="invalid-feedback">
                {{ errors.first('labs.lab_date') }}
              </div>
            </b-input-group>
          </b-col>

          <b-col class="form-group">
            <label for="anti_hiv">Anti-HIV</label>
              <multiselect
                id="anti_hiv"
                v-model="input_anti_hiv"
                :options="options.lab_options_pos_neg"
                :tabIndex="0"
                placeholder="เลือก"
              />
          </b-col>

          <b-col class="form-group">
            <label for="cd4">CD4</label>
            <b-input-group>
              <b-input
                type="number"
                v-model="input_cd4"
                id="input_cd4"
                name="input_cd4"
                data-vv-as="CD4"
                v-bind:class="{ 'is-invalid': errors.has('labs.input_cd4') }"
                v-validate="(input_lab_date !== '') ? 'numeric' : '' "
              />
              <div class="invalid-feedback">
                {{ errors.first('labs.input_cd4') }}
              </div>
            </b-input-group>
          </b-col>

          <b-col class="form-group">
            <label for="pcd4">&#37;CD4</label>
            <b-input-group>
              <b-input
                type="text"
                v-model="input_pcd4"
                id="input_pcd4"
                name="input_pcd4"
                data-vv-as="%CD4"
                v-bind:class="{ 'is-invalid': errors.has('labs.input_pcd4') }"
                v-validate="(input_lab_date !== '') ? 'decimal' : '' "
              />
              <div class="invalid-feedback">
                {{ errors.first('labs.input_pcd4') }}
              </div>
            </b-input-group>
          </b-col>

          <b-col class="form-group">
            <label for="vl">VL</label>
            <b-input-group>
              <b-input
                type="number"
                v-model="input_vl"
                id="input_vl"
                name="input_vl"
                data-vv-as="VL"
                v-bind:class="{ 'is-invalid': errors.has('labs.input_vl') }"
                v-validate="(input_lab_date !== '') ? 'numeric' : '' "
              />
              <div class="invalid-feedback">
                {{ errors.first('labs.input_vl') }}
              </div>
            </b-input-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="form-group">
            <label for="vdrl">VDRL</label>
              <multiselect
                id="vdrl"
                v-model="input_vdrl"
                :options="options.lab_options_pos_neg"
                :tabIndex="0"
                placeholder="เลือก"
              />
          </b-col>

          <b-col class="form-group">
            <label for="rpr">RPR Titer</label>
            <b-input-group>
              <b-input
                type="text"
                v-model="input_rpr"
                id="input_rpr"
                name="input_rpr"
                data-vv-as="RPR Titer"
                v-bind:class="{ 'is-invalid': errors.has('labs.input_rpr') }"
                v-validate="(input_lab_date !== '') ? 'regex:^1\:\\d+' : '' "
              />
              <div class="invalid-feedback">
                {{ errors.first('labs.input_rpr') }}
              </div>
            </b-input-group>
          </b-col>

          <b-col class="form-group">
            <label for="hbsag">HBsAg</label>
              <multiselect
                id="hbsag"
                v-model="input_hbsag"
                :options="options.lab_options_pos_neg"
                :tabIndex="0"
                placeholder="เลือก"
              />
          </b-col>

          <b-col class="form-group">
            <label for="anti_hbs">Anti-HBs</label>
              <multiselect
                id="anti_hbs"
                v-model="input_anti_hbs"
                :options="options.lab_options_pos_neg"
                :tabIndex="0"
                placeholder="เลือก"
              />
          </b-col>

          <b-col class="form-group">
            <label for="anti_hcv">Anti-HCV</label>
              <multiselect
                id="anti_hcv"
                v-model="input_anti_hcv"
                :options="options.lab_options_pos_neg"
                :tabIndex="0"
                placeholder="เลือก"
              />
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="form-group">
            <label for="ppd">PPD (mm)</label>
            <b-input-group>
              <b-input
                type="number"
                v-model="input_ppd"
                id="input_ppd"
                name="input_ppd"
                data-vv-as="PPD"
                v-bind:class="{ 'is-invalid': errors.has('labs.input_ppd') }"
                v-validate="(input_lab_date !== '') ? 'numeric' : '' "
              />
              <div class="invalid-feedback">
                {{ errors.first('labs.input_ppd') }}
              </div>
            </b-input-group>
          </b-col>

          <b-col class="form-group">
            <label for="afb">Sputum AFB</label>
              <multiselect
                id="afb"
                v-model="input_afb"
                :options="options.lab_options_afb"
                :tabIndex="0"
                placeholder="เลือก"
              />
          </b-col>

          <b-col class="form-group">
            <label for="input_sputum_gs">Sputum G/S</label>
            <b-input-group>
              <b-input
                type="text"
                v-model="input_sputum_gs"
                id="input_sputum_gs"
                name="input_sputum_gs"
                data-vv-as="Sputum G/S"
                v-bind:class="{ 'is-invalid': errors.has('labs.input_sputum_gs') }"
                v-validate="(input_lab_date !== '') ? 'min:1' : '' "
              />
              <div class="invalid-feedback">
                {{ errors.first('labs.input_sputum_gs') }}
              </div>
            </b-input-group>
          </b-col>

          <b-col class="form-group">
            <label for="input_sputum_cs">Sputum C/S</label>
            <b-input-group>
              <b-input
                type="text"
                v-model="input_sputum_cs"
                id="input_sputum_cs"
                name="input_sputum_cs"
                data-vv-as="Sputum C/S"
                v-bind:class="{ 'is-invalid': errors.has('labs.input_sputum_cs') }"
                v-validate="(input_lab_date !== '') ? 'min:1' : '' "
              />
              <div class="invalid-feedback">
                {{ errors.first('labs.input_sputum_cs') }}
              </div>
            </b-input-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="form-group">
            <label for="hiv_resistance">HIV Resistance</label>
            <b-input-group>
              <textarea
                row="3"
                class="form-control"
                v-model="input_hiv_resistence"
                id="input_hiv_resistence"
                name="input_hiv_resistence"
                data-vv-as="HIV Resistance"
                v-bind:class="{ 'is-invalid': errors.has('labs.input_hiv_resistence') }"
                v-validate="(input_lab_date !== '') ? 'min:1' : '' "
              />
              <div class="invalid-feedback">
                {{ errors.first('labs.input_hiv_resistence') }}
              </div>
            </b-input-group>
          </b-col>

          <b-col class="form-group">
            <label for="genexpert">GeneXpert</label>
            <b-input-group>
              <textarea
                row="3"
                class="form-control"
                v-model="input_genexpert"
                id="input_genexpert"
                name="input_genexpert"
                data-vv-as="GeneXpert"
                v-bind:class="{ 'is-invalid': errors.has('labs.input_genexpert') }"
                v-validate="(input_lab_date !== '') ? 'min:1' : '' "
              />
              <div class="invalid-feedback">
                {{ errors.first('labs.input_genexpert') }}
              </div>
            </b-input-group>
          </b-col>

          <b-col class="form-group">
            <label for="genexpert">Line Probe Assay / Hain Test</label>
            <b-input-group>
              <textarea
                row="3"
                class="form-control"
                v-model="input_hain_test"
                id="input_hain_test"
                name="input_hain_test"
                data-vv-as="Hain Test"
                v-bind:class="{ 'is-invalid': errors.has('labs.input_hain_test') }"
                v-validate="(input_lab_date !== '') ? 'min:1' : '' "
              />
              <div class="invalid-feedback">
                {{ errors.first('labs.input_hain_test') }}
              </div>
            </b-input-group>
          </b-col>
        </b-form-row>

        <b-form-row class="mt-3">
          <b-col>
            <button
              class="btn btn-sm btn-outline-danger float-sm-left"
              type="reset"
            >
              Reset Lab Results
            </button>

            <b-btn
              class="btn-sm btn-outline-success float-sm-right"
              type="submit"
            >
              <span><feather type="plus" /></span>
              Add Lab Results
            </b-btn>
          </b-col>
        </b-form-row>

        <b-form-row>
          <div class="mt-5 mb-2">
            <h2 class="lead">Lab Results</h2>
          </div>
        </b-form-row>

        <b-form-row>
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Anti-HIV</th>
                <th scope="col">CD4</th>
                <th scope="col">&#37;CD4</th>
                <th scope="col">VL</th>
                <th scope="col">VDRL</th>
                <th scope="col">RPR Titer</th>
                <th>HBsAg</th>
                <th>Anti-HBs</th>
                <th>Anti-HCV</th>
                <th>PPD (mm)</th>
                <th>AFB</th>
                <th>Sputum G/S</th>
                <th>Sputum C/S</th>
                <th>GeneXpert</th>
                <th>Hain Test</th>
                <th>HIV Resistance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <th
                v-if="labs.items.length === 0"
                colspan="18"
                class="text-center"
              >
                No Data...
              </th>
              <tr
                v-else
                v-for="(item, index) in labs.items"
                v-bind:key="index"
              >
                <th>{{ $moment(item.date).format('D/M/YYYY') }}</th>
                <td>{{ item.anti_hiv }}</td>
                <td>{{ item.cd4 }}</td>
                <td>{{ item.p_cd4 }}</td>
                <td>{{ item.vl }}</td>
                <td>{{ item.vdrl }}</td>
                <td>{{ item.rpr }}</td>
                <td>{{ item.hbsag }}</td>
                <td>{{ item.anti_hbs }}</td>
                <td>{{ item.anti_hcv }}</td>
                <td>{{ item.ppd }}</td>
                <td>{{ item.afb }}</td>
                <td>{{ item.sputum_gs }}</td>
                <td>{{ item.sputum_cs }}</td>
                <td>{{ item.genexpert }}</td>
                <td>{{ item.hain_test }}</td>
                <td>{{ item.hiv_resistence }}</td>
                <td>
                  <b-btn
                    class="btn-sm btn-outline-danger"
                    @click.prevent="deleteRecord('labs', item.id)"
                  >
                    <span><feather type="trash" /></span>
                  </b-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </b-form-row>
      </form>

      <b-form-row class="mb-4">
        <b-col>
          <b-pagination
            align="center"
            size="sm"
            base-url="#"
            :total-rows="labs.total"
            v-model="labPage"
            :per-page="labs.perPage"
          />
        </b-col>
      </b-form-row>
    </div>
    <!-- / Lab tables -->

    <!-- Labs -->
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2">
      <h2 class="lead">Imaging</h2>
    </div>

    <div>
      <form
        @submit.prevent="addRecord('imaging')"
        data-vv-scope="imaging"
      >
        <b-form-row>
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Film</th>
                <th scope="col">Results</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b-input-group>
                    <b-input-group-prepend is-text>
                      <span><feather type="calendar" /></span>
                    </b-input-group-prepend>
                    <vue-pikaday
                      id="input_imaging_date"
                      class="form-control"
                      v-model="input_imaging_date"
                      :options="options.pikaday_option"
                    />
                    <b-input
                      hidden
                      v-model="input_imaging_date"
                      name="input_imaging_date"
                      data-vv-as="Imaging result date"
                      v-bind:class="{ 'is-invalid': errors.has('imaging.input_imaging_date') }"
                      v-validate="'required'"
                    />
                    <div class="invalid-feedback">
                      {{ errors.first('imaging.input_imaging_date') }}
                    </div>
                  </b-input-group>
                </td>
                <td>
                  <b-input-group>
                    <b-input
                      id="film_type"
                      v-model="input_imaging_film_type"
                      name="input_imaging_film_type"
                      data-vv-as="Film type"
                      v-bind:class="{ 'is-invalid': errors.has('imaging.input_imaging_film_type') }"
                      v-validate="'required'"
                    />
                    <div class="invalid-feedback">
                      {{ errors.first('imaging.input_imaging_film_type') }}
                    </div>
                  </b-input-group>
                </td>
                <td>
                  <b-input-group>
                    <b-input
                      id="result"
                      v-model="input_imaging_result"
                      name="input_imaging_result"
                      data-vv-as="Imaging result"
                      v-bind:class="{ 'is-invalid': errors.has('imaging.input_imaging_result') }"
                      v-validate="'required'"
                    />
                    <div class="invalid-feedback">
                      {{ errors.first('imaging.input_imaging_result') }}
                    </div>
                  </b-input-group>
                </td>
                <td class="float-right">
                  <b-btn
                    class="btn-sm btn-outline-success"
                    @click.prevent="addRecord('imaging')"
                  >
                    <span><feather type="plus" /></span>
                  </b-btn>
                </td>
              </tr>

              <tr
                v-for="(item, index) in imaging.items"
                v-bind:key="index"
              >
                <th>{{ $moment(item.date).format('D/M/YYYY') }}</th>
                <td>{{ item.film_type }}</td>
                <td>{{ item.result }}</td>
                <td>
                  <b-btn
                    class="btn-sm btn-outline-danger float-right"
                    @click.prevent="deleteRecord('imaging', item.id)"
                  >
                    <span><feather type="trash" /></span>
                  </b-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </b-form-row>
      </form>

      <b-form-row class="mb-4">
        <b-col>
          <b-pagination
            align="center"
            size="sm"
            base-url="#"
            :total-rows="imaging.total"
            v-model="imagingPage"
            :per-page="imaging.perPage"
          />
        </b-col>
      </b-form-row>

    </div>

    <!-- Appointment -->
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
      <div>
        <h2 class="h2">
          Appointments
        </h2>
      </div>
    </div>

    <!-- Appointment table -->
    <div>
      <form
        @submit.prevent="addRecord('appointments')"
        data-vv-scope="appointments"
      >
        <b-form-row>
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Appointment Date</th>
                <th scope="col">For</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b-input-group>
                    <b-input-group-prepend is-text>
                      <span><feather type="calendar" /></span>
                    </b-input-group-prepend>
                    <vue-pikaday
                      id="input_appointment_date"
                      class="form-control"
                      v-model="input_appointment_date"
                      :options="options.pikaday_option"
                    />
                    <b-input
                      hidden
                      v-model="input_appointment_date"
                      name="input_appointment_date"
                      data-vv-as="Appointment date"
                      v-bind:class="{ 'is-invalid': errors.has('appointments.input_appointment_date') }"
                      v-validate="'required'"
                    />
                    <div class="invalid-feedback">
                      {{ errors.first('appointments.input_appointment_date') }}
                    </div>
                  </b-input-group>
                </td>
                <td>
                  <b-input-group>
                    <b-input
                      id="input_appointment_for"
                      name="input_appointment_for"
                      v-model="input_appointment_for"
                      data-vv-as="Reasons for the appointment"
                      v-bind:class="{ 'is-invalid': errors.has('appointments.input_appointment_for') }"
                      v-validate="'required'"
                    />
                  <div class="invalid-feedback">
                    {{ errors.first('appointments.input_appointment_for') }}
                  </div>
                </b-input-group>
                </td>
                <td class="float-right">
                  <b-btn
                    class="btn-sm btn-outline-success"
                    @click.prevent="addRecord('appointments')"
                  >
                    <span><feather type="plus" /></span>
                  </b-btn>
                </td>
              </tr>
              <tr
                v-for="(item, index) in appointments.items"
                v-bind:key="index"
              >
                <th>{{ $moment(item.date).format('D/M/YYYY') }}</th>
                <td>{{ item.appointment_for }}</td>
                <td>
                  <b-btn
                    class="btn-sm btn-outline-danger float-right"
                    @click.prevent="deleteRecord('appointments', item.id)"
                  >
                    <span><feather type="trash" /></span>
                  </b-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </b-form-row>
      </form>

      <b-form-row class="mb-4">
        <b-col>
          <b-pagination
            align="center"
            size="sm"
            base-url="#"
            :total-rows="appointments.total"
            v-model="appointmentPage"
            :per-page="appointments.perPage"
          />
        </b-col>
      </b-form-row>

    </div>
    <!-- /Appointment table -->

  </div>
</template>

<style scoped>
.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@enrian/vue-pikaday/dist/vue-pikaday.min.css"></style>

<script>
import Multiselect from 'vue-multiselect'
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapState } from 'vuex'
import '../../store'

export default {
  name: 'IxFU',

  components: {
    Multiselect
  },

  watch: {
    isLoaded: function (newValue, oldValue) {
      if (newValue) {
        this.debouncedHN()
      } else {
        this.resetToDefaultAll()
      }
    },

    labPage: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.debouncedLabsPage()
      }
    },

    imagingPage: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.debouncedImagingPage()
      }
    },

    appointmentPage: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.debouncedAppointmentsPage()
      }
    }
  },

  computed: {
    ...mapState('IXAppointmentInfo', [
      'options',
      'labs',
      'imaging',
      'appointments'
    ]),
    ...mapState('patientInfo', [
      'patient'
    ]),
    ...mapFields('patientInfo', [
      'patient.isLoaded'
    ]),
    ...mapFields('IXAppointmentInfo', {
      labPage: 'labs.page',
      imagingPage: 'imaging.page',
      appointmentPage: 'appointments.page'
    })
  },

  data () {
    return {
      input_lab_date: null,
      input_anti_hiv: null,
      input_cd4: null,
      input_pcd4: null,
      input_vl: null,
      input_hiv_resistence: null,
      input_vdrl: null,
      input_rpr: null,
      input_hbsag: null,
      input_anti_hbs: null,
      input_anti_hcv: null,
      input_ppd: null,
      input_afb: null,
      input_sputum_gs: null,
      input_sputum_cs: null,
      input_genexpert: null,
      input_hain_test: null,

      input_imaging_date: null,
      input_imaging_film_type: null,
      input_imaging_result: null,

      input_appointment_date: null,
      input_appointment_for: null,

      debouncedHN: this.$lodash.debounce(this.loadAllRecords, 1000),
      debouncedLabsPage: this.$lodash.debounce(function () {
        this.loadRecordsMethod('labs', this.labs.page)
      }, 1000),
      debouncedImagingPage: this.$lodash.debounce(function () {
        this.loadRecordsMethod('imaging', this.imaging.page)
      }, 1000),
      debouncedAppointmentsPage: this.$lodash.debounce(function () {
        this.loadRecordsMethod('appointments', this.appointments.page)
      }, 1000)
    }
  },

  created () {
    this.resetToDefaultAll()
  },

  mounted () {
  },

  destroyed () {
    this.resetToDefaultAll()
  },

  methods: {
    ...mapActions('IXAppointmentInfo', [
      'setDefaultLabsAction',
      'setDefaultImagingAction',
      'setDefaultAppointmentsAction'
    ]),

    ...mapActions([
      'saveRecordAction',
      'loadAllRecordsAction',
      'loadRecordsAction',
      'deleteRecordAction'
    ]),

    resetToDefaultAll () {
      this.setDefaultLabsAction()
      this.setDefaultImagingAction()
      this.setDefaultAppointmentsAction()
    },

    loadAllRecords () {
      // return if there is no patient in the db
      if (!this.patient.isLoaded) {
        this.resetToDefaultAll()
        return
      }

      this.loadRecordsMethod('labs', this.labs.page)
      this.loadRecordsMethod('imaging', this.imaging.page)
      this.loadRecordsMethod('appointments', this.appointments.page)
    },

    loadRecordsMethod (dataType, page) {
      // return if there is no patient in the db
      if (!this.patient.isLoaded) {
        this.resetToDefaultAll()
        return
      }

      let self = this

      this.loadAllRecordsAction({
        dataType: dataType,
        page: page
      })
        .then((response) => {
          console.log('Investigations or Appointments loaded.')
        })
        .catch((error) => {
          self.$notify({
            title: 'Unable To Load Investigations or Appointments Data',
            type: 'error'
          })
          console.log('Unable to load investigations or appointmentss data.')
          console.log(error)
        })
    },

    resetLabForm () {
      this.input_lab_date = null
      this.input_anti_hiv = null
      this.input_cd4 = null
      this.input_pcd4 = null
      this.input_vl = null
      this.input_hiv_resistence = null
      this.input_vdrl = null
      this.input_rpr = null
      this.input_hbsag = null
      this.input_anti_hbs = null
      this.input_anti_hcv = null
      this.input_ppd = null
      this.input_afb = null
      this.input_sputum_gs = null
      this.input_sputum_cs = null
      this.input_genexpert = null
      this.input_hain_test = null

      this.$validator.reset('labs')
    },

    addRecord (dataType) {
      this.$validator.validateAll(dataType).then((result) => {
        if (result) {
          let newRecord = {}

          if (dataType === 'labs') {
            newRecord = {
              date: this.$moment(this.input_lab_date).toDate(),
              anti_hiv: this.input_anti_hiv,
              cd4: this.input_cd4,
              p_cd4: this.input_pcd4,
              vl: this.input_vl,
              hiv_resistence: this.input_hiv_resistence,
              vdrl: this.input_vdrl,
              rpr: this.input_rpr,
              hbsag: this.input_hbsag,
              anti_hbs: this.input_anti_hbs,
              anti_hcv: this.input_anti_hcv,
              ppd: this.input_ppd,
              afb: this.input_afb,
              sputum_gs: this.input_sputum_gs,
              sputum_cs: this.input_sputum_cs,
              genexpert: this.input_genexpert,
              hain_test: this.input_hain_test
            }

            this.resetLabForm()
          } else if (dataType === 'imaging') {
            newRecord = {
              date: this.$moment(this.input_imaging_date).toDate(),
              film_type: this.input_imaging_film_type,
              result: this.input_imaging_result
            }

            this.input_imaging_date = null
            this.input_imaging_film_type = null
            this.input_imaging_result = null

            this.$validator.reset('imaging')
          } else if (dataType === 'appointments') {
            newRecord = {
              date: this.$moment(this.input_appointment_date).toDate(),
              appointment_for: this.input_appointment_for
            }

            this.input_appointment_date = null
            this.input_appointment_for = null

            this.$validator.reset('imaging')
          } else {
            console.log('Something is not right.')
            return
          }

          let payload = {
            dataType: dataType,
            newRecord: newRecord,
            isPatch: false
          }

          // Clear errors in input forms
          this.errors.clear()

          let self = this
          this.saveRecordAction(payload)
            .then((response) => {
              console.log('Save record sucessfully')
              self.$notify({
                title: 'Saved record sucessfully',
                type: 'success'
              })

              // Refresh data
              self.loadRecordsMethod(dataType, '1')
            })
            .catch((error) => {
              self.$notify({
                title: 'Unable To Save Record.',
                type: 'error',
                text: error
              })
            })
        }
      })
    },

    deleteRecord (dataType, recordID) {
      let payload = {
        dataType: dataType,
        recordID: recordID
      }

      let self = this

      // Remove from DB
      this.deleteRecordAction(payload)
        .then((response) => {
          console.log('Delete record sucessfully')
          self.$notify({
            title: 'Delete record sucessfully',
            type: 'success'
          })

          // Refresh data
          self.loadRecordsMethod(dataType, '1')
        })
        .catch((error) => {
          self.$notify({
            title: 'Unable To Delete Selected Record.',
            type: 'error',
            text: error
          })
          console.log('Unable to delete investigations or appointmentss record.')
          console.log(error)
        })
    }
  }
}
</script>
