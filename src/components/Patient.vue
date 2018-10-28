<template>
    <b-tabs class="mt-3 mb-5">
      <b-tab
        class="mt-2"
        title="Patient Information"
        active
      >
          <patient-form />
      </b-tab>

      <b-tab
        class="mt-2"
        title="Visits"
        :disabled="!patient.hn"
      >
        <visit-form />
      </b-tab>

      <b-tab
        class="mt-2"
        title="Investigations &amp; Appointments"
        :disabled="!patient.hn"
      >
        <ix-fu />
      </b-tab>
    </b-tabs>
</template>

<style scoped>
</style>

<script>
import { mapState } from 'vuex'
import PatientForm from './patient_form/patient_form'
import VisitForm from './patient_form/visit_form'
import IxFU from './patient_form/investigations_and_appointment'

export default {
  name: 'Patient',

  components: {
    'patient-form': PatientForm,
    'visit-form': VisitForm,
    'ix-fu': IxFU
  },

  computed: {
    ...mapState('patientInfo', [
      'patient'
    ])
  },

  data () {
    return {
    }
  }

}
</script>
