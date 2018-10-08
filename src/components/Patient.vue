<template>
    <div>
      <div class="mb-5">
        <patient-form />
      </div>

      <div class="mb-5">
        <visit-form />
      </div>

      <div class="mb-5">
        <ix-fu />
      </div>
    </div>
</template>

<style scoped>
</style>

<script>
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

  data () {
    return {
    }
  }

}
</script>
