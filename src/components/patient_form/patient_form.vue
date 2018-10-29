<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-2">
      <div v-if="this.patient.hn === null || this.patient.hn === ''">
        <h2 class="h2">
          New Patient
        </h2>
      </div>

      <div v-else>
        <h2 class="h2">
          Patient HN #{{ this.patient.hn }}
        </h2>
      </div>

    </div>

    <!-- Basic Information Section -->
    <div>
      <b-form
        @reset="resetToDefault"
      >
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-4">
          <h2 class="lead">ข้อมูลทั่วไป</h2>

            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button
                  class="btn btn-sm btn-outline-danger"
                  type="reset"
                  :disabled="this.patient.isLoaded"
                >
                  Reset Patient Information
                </button>
                <button
                  class="btn btn-sm btn-outline-success"
                  type="submit"
                  @click.prevent="savePatientInfo"
                >
                  Save Patient Information
                </button>
              </div>
            </div>

        </div>

        <b-form-row>
          <b-col class="form-group">
            <label for="gov_id_type">ยืนยันตนด้วย</label>
            <multiselect
              id="gov_id_type"
              v-model="gov_id_type"
              :options="options.gov_id_type"
              :tabIndex="0"
              placeholder="เลือก"
            />
          </b-col>

          <b-col class="form-group">
            <label for="gov_id">รหัสบัตรประชาชน / พาสปอร์ต</label>
            <b-input-group>
              <b-input-group-prepend is-text>
                <span><feather type="credit-card" /></span>
              </b-input-group-prepend>
              <b-input
                id="gov_id"
                name="gov_id"
                data-vv-as="รหัสบัตรประชาชน / พาสปอร์ต"
                v-bind:class="{ 'is-invalid': this.errors.has('gov_id') }"
                v-validate="'min:1|max:100'"
                v-model="gov_id"
              />
              <div class="invalid-feedback">
                {{ errors.first('gov_id') }}
              </div>
            </b-input-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="form-group">
            <label for="hn">HN</label>
            <b-input
              id="hn"
              name="hn"
              data-vv-as="HN"
              v-bind:class="{ 'is-invalid': errors.has('hn') }"
              v-validate="'required|min:1|max:100'"
              v-model="hn"
              :disabled="this.patient.isLoaded"
            />
            <div class="invalid-feedback">
              {{ errors.first('hn') }}
            </div>
          </b-col>

          <b-col class="form-group">
            <label for="hiv_clinic_id">Clinic ID</label>
            <b-input
              id="hiv_clinic_id"
              name="hiv_clinic_id"
              data-vv-as="HIV Clinic ID"
              v-bind:class="{ 'is-invalid': errors.has('hiv_clinic_id') }"
              v-validate="'min:1|max:100'"
              v-model="hiv_clinic_id"
            />
            <div class="invalid-feedback">
              {{ errors.first('hiv_clinic_id') }}
            </div>
          </b-col>

          <b-col class="form-group">
            <label for="nap">NAP</label>
            <b-input
              id="nap"
              name="nap"
              data-vv-as="NAP ID"
              v-bind:class="{ 'is-invalid': errors.has('nap') }"
              v-validate="'min:1|max:100'"
              v-model="nap"
            />
            <div class="invalid-feedback">
              {{ errors.first('nap') }}
            </div>
          </b-col>

          <b-col class="form-group">
            <label for="bill_payer">สิทธิ์การรักษา</label>
            <multiselect
              id="bill_payer"
              v-model="bill_payer"
              :options="options.bill_payer"
              :tabIndex="0"
              placeholder="เลือก">
            </multiselect>
            <b-input
              hidden
              v-model="bill_payer"
              name="bill_payer"
              data-vv-as="Bill Payer"
              v-bind:class="{ 'is-invalid': errors.has('bill_payer') }"
              v-validate="'required'">
            </b-input>
            <div class="invalid-feedback">
              {{ errors.first('bill_payer') }}
            </div>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="form-group">
            <label for="name">ชื่อ - สกุล</label>
            <b-input
                id="name"
                name="name"
                data-vv-as="ชื่อ - สกุล"
                v-bind:class="{ 'is-invalid': errors.has('name') }"
                v-validate="'required|min:1|max:100'"
                v-model="name">
            </b-input>
            <div class="invalid-feedback">
              {{ errors.first('name') }}
            </div>
          </b-col>

          <b-col class="form-group">
            <label for="dob">วัน / เดือน / ปี เกิด</label>
            <b-input-group>
              <b-input-group-prepend is-text>
                <span><feather type="calendar" /></span>
              </b-input-group-prepend>
              <vue-pikaday
                id="dob"
                class="form-control"
                v-model="dob"
                :options="options.pikaday_option"
              />
            </b-input-group>
          </b-col>

          <b-col class="form-group">
            <label for="first_encounter">เข้ารับการรักษาครั้งแรกเมื่อ</label>
            <b-input-group>
              <b-input-group-prepend is-text>
                <span><feather type="calendar" /></span>
              </b-input-group-prepend>
              <vue-pikaday
                id="first_encounter"
                class="form-control"
                v-model="first_encounter"
                :options="options.pikaday_option"
              />
            </b-input-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="form-group">
            <label for="sex">เพศ</label>
            <multiselect
              id="sex"
              v-model="sex"
              :options="options.sex"
              :tabIndex="0"
              placeholder="เลือก"
            />
            <b-input
              hidden
              v-model="sex"
              name="sex"
              data-vv-as="Sex"
              v-bind:class="{ 'is-invalid': errors.has('sex') }"
              v-validate="'required'"
            />
            <div class="invalid-feedback">
              {{ errors.first('sex') }}
            </div>
          </b-col>

          <b-col class="form-group">
            <label for="gender">รสนิยมทางเพศ</label>
            <multiselect
              id="gender"
              v-model="gender"
              :options="options.gender"
              :tabIndex="0"
              placeholder="เลือก"
            />
            <b-input
              hidden
              v-model="gender"
              name="gender"
              data-vv-as="Gender"
              v-bind:class="{ 'is-invalid': errors.has('gender') }"
              v-validate="'required'"
            />
            <div class="invalid-feedback">
              {{ errors.first('gender') }}
            </div>
          </b-col>

          <b-col class="form-group">
            <label for="marital">สถานภาพสมรส</label>
            <multiselect
              id="marital"
              v-model="marital"
              :options="options.marital"
              :tabIndex="0"
              placeholder="เลือก"
            />
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="form-group">
            <label for="nationality">สัญชาติ</label>
            <multiselect
              id="nationality"
              v-model="nationality"
              :options="options.countries_list"
              :tabIndex="0"
              placeholder="เลือก"
            />
            <b-input
              hidden
              v-model="nationality"
              name="nationality"
              data-vv-as="Nationality"
              v-bind:class="{ 'is-invalid': errors.has('nationality') }"
              v-validate="'required'"
            />
            <div class="invalid-feedback">
              {{ errors.first('nationality') }}
            </div>
          </b-col>

          <b-col class="form-group">
            <label for="education">ระดับการศึกษา</label>
            <multiselect
              id="education"
              v-model="education"
              :options="options.education"
              :tabIndex="0"
              placeholder="เลือก"
            />
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="form-group">
            <label for="address">ที่อยู่</label>
            <b-textarea
              id="address"
              v-model="address"
              rows="3"
            />
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="form-group">
            <label for="tel">โทรศัพท์</label>
            <b-input-group>
              <b-input-group-prepend is-text>
                <span><feather type="phone-outgoing" /></span>
              </b-input-group-prepend>
              <input-tag
                :tags.sync="tel"
                :addTagOnKeys="[13,188]"
                :addTagOnBlur="true"
                validate="digits"
                class="form-control"
              />
            </b-input-group>
            <small id="tel_help" class="form-text text-muted">หากมีหลายเบอร์ใช้คอมม่าคั่น</small>
          </b-col>

          <b-col class="form-group">
            <label for="relative_tel">โทรศัพท์ญาติ</label>
            <b-input-group>
              <b-input-group-prepend is-text>
                <span><feather type="phone-outgoing" /></span>
              </b-input-group-prepend>
              <input-tag
                :tags.sync="relative_tel"
                :addTagOnKeys="[13,188]"
                :addTagOnBlur="true"
                validate="digits"
                class="form-control"
              />
            </b-input-group>
            <small id="relative_tel_help" class="form-text text-muted">หากมีหลายเบอร์ใช้คอมม่าคั่น</small>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="form-group">
            <label for="is_refer">การขึ้นทะเบียนรักษา</label>
            <multiselect
              id="is_refer"
              v-model="is_refer"
              :options="options.is_refer"
              :tabIndex="0"
              placeholder="เลือก">
            </multiselect>
            <b-input
              hidden
              v-model="is_refer"
              name="is_refer"
              data-vv-as="การขึ้นทะเบียนรักษา"
              v-bind:class="{ 'is-invalid': errors.has('is_refer') }"
              v-validate="'required'" />
            <div class="invalid-feedback">
              {{ errors.first('is_refer') }}
            </div>
          </b-col>
          <b-col class="form-group">
            <label for="refer_from">ผู้ป่วยรับโอนจาก</label>
            <TypeAhead
              id="refer_from"
              v-model="refer_from"
              src="/api/search/field_entries?field_name=refer_from&query=:keyword"

              :fetch="searchFetch"
              :getResponse="getResponse"
              :minChars="parseInt(3)"
              :delayTime="parseInt(500)"
            />
            <div class="invalid-feedback">
              {{ errors.first('refer_from') }}
            </div>
          </b-col>
        </b-form-row>

        <!-- Plan Section header -->
        <b-form-row>
          <b-col class="form-group">
            <label for="planInput">Notes &amp; Plans</label>
            <b-input-group>
              <b-textarea
                id="planInput"
                name="planInput"
                data-vv-as="Plan"
                v-bind:class="{ 'is-invalid': errors.has('planInput') }"
                v-model="planInput"
                v-validate="'min:10'"
              />
              <b-input-group-append>
                <b-btn
                    class="btn-outline-primary"
                    @click.prevent="addPlanMethod"
                >
                  Add
                </b-btn>
              </b-input-group-append>
              <div class="invalid-feedback">
                {{ errors.first('planInput') }}
              </div>
            </b-input-group>
          </b-col>
        </b-form-row>

        <b-form-row v-if="plans.length > 0">
          <b-col>
            <table class="table table-striped table-sm">
              <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Notes &amp; Plans</th>
                    <th scope="col"></th>
                  </tr>
              </thead>

              <tbody>
                  <tr
                    v-for="(planItem, index) in plans"
                    :key="index"
                  >
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ $moment(planItem.date).format('D/MM/YYYY') }}</td>
                    <td>{{ planItem.plan }}</td>
                    <td class="float-right">
                      <b-btn
                        class="btn-sm btn-outline-danger"
                        @click.prevent="deletePlanAction(index)"
                      >
                        Delete
                      </b-btn>
                    </td>
                  </tr>
              </tbody>

            </table>
          </b-col>
        </b-form-row>

        <!-- Save botton -->
        <b-form-row>
          <b-col class="mt-4">
            <button
              class="btn btn-sm btn-outline-danger float-left"
              type="reset"
              :disabled="this.patient.isLoaded"
            >
              Reset Patient Information
            </button>
            <b-button
              type="submit"
              variant="success"
              class="btn btn-sm btn-outline-success float-right"
              @click.prevent="savePatientInfo"
            >
              Save Patient Information
            </b-button>
          </b-col>
        </b-form-row>

      </b-form>
    </div>
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
import TypeAhead from 'vue2-typeahead'
import Multiselect from 'vue-multiselect'
import InputTag from 'vue-input-tag'
import { mapFields } from 'vuex-map-fields'
import { mapState, mapActions } from 'vuex'
import '../../store'

export default {
  name: 'PatientForm',

  props: ['hn_arg'],

  components: {
    Multiselect,
    InputTag,
    TypeAhead
  },

  computed: {
    ...mapState('patientInfo', [
      'patient',
      'options'
    ]),
    ...mapFields('patientInfo', [
      'patient.gov_id_type',
      'patient.gov_id',
      'patient.name',
      'patient.dob',
      'patient.first_encounter',
      'patient.sex',
      'patient.gender',
      'patient.marital',
      'patient.nationality',
      'patient.education',
      'patient.address',
      'patient.tel',
      'patient.relative_tel',
      'patient.is_refer',
      'patient.refer_from',
      'patient.hn',
      'patient.hiv_clinic_id',
      'patient.nap',
      'patient.bill_payer',
      'patient.plans'
    ]),

    HNArg: function () {
      return this.$route.params.hn_arg
    }
  },

  watch: {
    hn: function (newValue, oldValue) {
      if (newValue && oldValue !== newValue) {
        this.$validator.reset()
        this.debouncedHN()
      }
    },

    gov_id: function (newValue, oldValue) {
      if (newValue && (oldValue !== newValue) && (this.patient.isLoaded !== true)) {
        this.debouncedGovID()
      }
    },

    hiv_clinic_id: function (newValue, oldValue) {
      if (newValue && (oldValue !== newValue) && (this.patient.isLoaded !== true)) {
        this.debouncedHIVClinicID()
      }
    },

    nap: function (newValue, oldValue) {
      if (newValue && (oldValue !== newValue) && (this.patient.isLoaded !== true)) {
        this.debouncedNAP()
      }
    },

    HNArg: function (newValue, oldValue) {
      if (oldValue !== newValue) {
        if (typeof newValue === 'undefined' || newValue === '') {
          this.setDefaultAction()
          this.$validator.reset()
        } else if (this.HNArgToHNField() !== this.hn) {
          this.setDefaultAction()
          this.$validator.reset()
          this.hn = this.HNArgToHNField()
        }
      }
    }
  },

  data () {
    return {
      planInput: '',
      debouncedHN: this.$lodash.debounce(function () {
        this.isUnique('hn')
      }, 1000),
      debouncedGovID: this.$lodash.debounce(function () {
        this.isUnique('gov_id')
      }, 1000),
      debouncedHIVClinicID: this.$lodash.debounce(function () {
        this.isUnique('hiv_clinic_id')
      }, 1000),
      debouncedNAP: this.$lodash.debounce(function () {
        this.isUnique('nap')
      }, 1000),

      refer_from_items: []
    }
  },

  created () {
    this.setDefaultAction()
  },

  mounted () {
    if (this.HNArg) {
      this.hn = this.HNArgToHNField()
    }
  },

  destroyed () {
    this.setDefaultAction()
  },

  methods: {
    ...mapActions('patientInfo', [
      'loadDataAction',
      'setDefaultAction',
      'deletePlanAction',
      'addPlanAction'
    ]),

    ...mapActions([
      'saveRecordAction'
    ]),

    resetToDefault () {
      this.setDefaultAction()
      this.$router.push({ name: 'Patient' })
      this.$validator.reset()
    },

    addPlanMethod () {
      if (this.planInput !== null &&
          this.planInput !== '' &&
          !this.errors.has('planInput')) {
        this.addPlanAction(this.planInput)

        this.planInput = ''
      }
    },

    getResponse: function (response) {
      return response.data
    },

    HNArgToHNField () {
      return this.HNArg.replace(/\^/g, '/')
    },

    savePatientInfo () {
      let shouldURLChange = (this.HNArg &&
        this.HNArg === this.patient.hn.replace(/\//g, '^')
      )
      let self = this

      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            let self2 = self
            console.log('Saving patient information')

            self.saveRecordAction({
              isPatch: self.patient.isLoaded,
              dataType: 'patient'
            })
              .then((response) => {
                self2.$notify({
                  title: 'Patient Information Saved',
                  type: 'success'
                })

                // Redirect to the correct URL after posting
                if (!shouldURLChange) {
                  let hnURL = self2.patient.hn.replace(/\//g, '^')
                  self2.$router.push({
                    name: 'Patient',
                    params: {
                      hn_arg: hnURL
                    }
                  })

                  // Reload data from db
                  self.loadPatientData(self2.patient.hn)
                }
              })
              .catch((error) => {
                self2.$notify({
                  title: 'Cannot Save Patient Information',
                  type: 'error',
                  text: error.response.data.message
                })
              })
          } else {
            self.$notify({
              title: 'Form Validation Failed',
              type: 'error'
            })
          }
        })
        .catch((error) => {
          // validator logic error
          console.log(error)
        })
    },

    loadPatientData (hn) {
      let self = this

      this.loadDataAction(hn)
        .then(function (response) {
          self.$router.push({
            name: 'Patient',
            params: {
              hn_arg: hn.replace(/\//g, '^')
            }
          })
          self.$notify({
            title: 'Patient Information Loaded',
            type: 'success'
          })
          console.log('Patient information loaded.')
        })
        .catch(function (error) {
          if (self.HNArg) {
            self.$notify({
              title: 'Patient Does Not Exist',
              type: 'error'
            })
            self.$router.push({ name: 'Patient' })
          }

          console.log(error)
        })

      this.$validator.errors.clear()
    },

    isUnique (fieldName) {
      let patientFields = ['gov_id', 'hiv_clinic_id', 'nap']

      if (fieldName === 'hn' && this.patient.hn && !this.patient.isLoaded) {
        this.loadPatientData(this.patient.hn)
      } else if (patientFields.includes(fieldName) && this.patient[fieldName]) {
        let self = this
        let apiURL = 'search/is_existed'

        this.$API({
          url: apiURL,
          methods: 'get',
          params: {
            'field': fieldName,
            'query': this.patient[fieldName]
          }
        })
          .then(function (response) {
            if (response.data.result &&
                response.data.hn &&
                response.data.hn !== self.patient.hn) {
              // the data is not unique
              self.$validator.errors.add({
                field: fieldName,
                msg: 'Data in this field is not unique.'
              })
            }
          })
          .catch(function (error) {
            self.$notify({
              title: 'Error',
              type: 'error',
              text: error.response.data.message
            })
          })
      }
    },

    searchFetch: function (url) {
      return this.$API.get(url)
    }
  }
}
</script>
