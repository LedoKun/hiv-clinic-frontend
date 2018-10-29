<template>
    <div class="mb-5">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
        <h1 class="h2">Clinic Statistics</h1>
      </div>

      <div
        v-if="!loaded"
      >
        <h5 class="mb-3">Loading...</h5>
      </div>

      <div
        v-else-if="$lodash.isEmpty(stats)"
      >
        <h5 class="mb-3">Stats data is not avalible at this time.</h5>
        <p class="text-muted">Please try again later...</p>
      </div>

      <!-- Loadded -->
      <div
        v-else
      >
        <!-- Demographic -->
        <h4 class="mb-3">Demographic</h4>

        <!-- Nationality -->
        <div
          v-if="stats.count_nationality"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Nationality</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_nationality"
                  :options="{
                    chart: {
                      title: 'Patient Nationality'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_nationality"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /Nationality -->

        <!-- Age -->
        <div
          v-if="stats.count_age_less_than_one || stats.count_age"
        >
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2"
            v-if="stats.count_age_less_than_one.length > 1 || stats.count_age.length > 1"
          >
            <h2 class="lead">Age</h2>
          </div>

          <div
            class="mb-5"
          >
            <p
              class="mb-2"
              v-if="stats.count_age_less_than_one.length > 1"
            >
              Age (Months)
            </p>
            <b-form-row
              v-if="stats.count_age_less_than_one.length > 1"
            >
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_age_less_than_one"
                  :options="{
                    chart: {
                      title: 'Patient Nationality'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_age_less_than_one"
                />
              </b-col>
            </b-form-row>

            <p
              class="mb-2"
              v-if="stats.count_age.length > 1"
            >
              Age (Years)
            </p>
            <b-form-row
              class="mb-3"
              v-if="stats.count_age.length > 1"
            >
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_age"
                  :options="{
                    chart: {
                      title: 'Patient Nationality'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_age"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /Age -->

        <!-- Sex -->
        <div
          v-if="stats.count_sex"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Sex</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_sex"
                  :options="{
                    chart: {
                      title: 'Patient Sex'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_sex"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /Sex -->

        <!-- Gender -->
        <div
          v-if="stats.count_gender"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Gender</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_gender"
                  :options="{
                    chart: {
                      title: 'Patient Gender'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_gender"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /Gender -->

        <!-- count_marital -->
        <div
          v-if="stats.count_marital"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Marital Status</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_marital"
                  :options="{
                    chart: {
                      title: 'Marital Status'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_marital"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_marital -->

        <!-- count_education -->
        <div
          v-if="stats.count_education"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Education Level</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_education"
                  :options="{
                    chart: {
                      title: 'Education Level'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_education"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_education -->

        <!-- count_is_refer -->
        <div
          v-if="stats.count_is_refer || stats.count_refer_from"
        >
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2"
            v-if="stats.count_is_refer.length > 1 || stats.count_refer_from.length > 1"
          >
            <h2 class="lead">Referral Statistics</h2>
          </div>

          <div
            class="mb-5"
          >
            <p
              class="mb-2"
              v-if="stats.count_is_refer.length > 1"
            >
              Referral Status
            </p>
            <b-form-row
              class="mb-2"
              v-if="stats.count_is_refer.length > 1"
            >
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_is_refer"
                  :options="{
                    chart: {
                      title: 'Referral Status'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_is_refer"
                />
              </b-col>
            </b-form-row>

            <p
              class="mb-2"
              v-if="stats.count_refer_from.length > 1"
            >
              Referred By
            </p>
            <b-form-row
              v-if="stats.count_refer_from.length > 1"
            >
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_refer_from"
                  :options="{
                    chart: {
                      title: 'Referral Status'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_refer_from"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_is_refer -->

        <!-- count_bill_payer -->
        <div
          v-if="stats.count_bill_payer"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Bill Payer</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_bill_payer"
                  :options="{
                    chart: {
                      title: 'Bill Payer'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_bill_payer"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_bill_payer -->

        <!-- /Demographic -->
        <h4 class="mb-3">Visit Statistics</h4>

        <!-- count_monthly_visit -->
        <div
          v-if="stats.count_monthly_visit"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Monthly Visits</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_monthly_visit"
                  :options="{
                    chart: {
                      title: 'Monthly Visits'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_monthly_visit"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_monthly_visit -->

        <!-- count_arv_regimen -->
        <div
          v-if="stats.count_arv_regimen || stats.count_arv_breakdown"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">ARV Medications</h2>
          </div>

          <div
            class="mb-5"
          >
            <p
              class="mb-2"
              v-if="stats.count_arv_regimen.length > 1"
            >
              ARV Regimens
            </p>
            <b-form-row
              class="mb-2"
              v-if="stats.count_arv_regimen.length > 1"
            >
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_arv_regimen"
                  :options="{
                    chart: {
                      title: 'ARV Regimens'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_arv_regimen"
                />
              </b-col>
            </b-form-row>

            <p
              class="mb-2"
              v-if="stats.count_arv_breakdown.length > 1"
            >
              ARV Breakdown
            </p>
            <b-form-row
              v-if="stats.count_arv_breakdown.length > 1"
            >
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_arv_breakdown"
                  :options="{
                    chart: {
                      title: 'ARV Breakdown'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_arv_breakdown"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_arv_regimen -->

        <!-- count_why_switched_arv -->
        <div
          v-if="stats.count_why_switched_arv && stats.count_why_switched_arv.length > 1"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Switching ARV?</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_why_switched_arv"
                  :options="{
                    chart: {
                      title: 'Switching ARV?'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_why_switched_arv"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_why_switched_arv -->

        <!-- count_oi_prophylaxis -->
        <div
          v-if="stats.count_oi_prophylaxis && stats.count_oi_prophylaxis.length > 1"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">OI Prophylaxis</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_oi_prophylaxis"
                  :options="{
                    chart: {
                      title: 'OI Prophylaxis'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_oi_prophylaxis"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_oi_prophylaxis -->

        <!-- count_anti_tb -->
        <div
          v-if="stats.count_anti_tb && stats.count_anti_tb.length > 1"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Anti-TB Medications</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_anti_tb"
                  :options="{
                    chart: {
                      title: 'Anti-TB Medications'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_anti_tb"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_anti_tb -->

        <!-- count_vaccination -->
        <div
          v-if="stats.count_vaccination && stats.count_vaccination.length > 1"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Vaccines</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_vaccination"
                  :options="{
                    chart: {
                      title: 'Vaccines'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_vaccination"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_vaccination -->

        <!-- count_imp -->
        <div
          v-if="stats.count_imp"
        >
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-2">
            <h2 class="lead">Impressions (Count All Visits)</h2>
          </div>

          <div class="mb-5">
            <b-form-row>
              <b-col>
                <GChart
                  type="ColumnChart"
                  :data="stats.count_imp"
                  :options="{
                    chart: {
                      title: 'Impressions (Count All Visits)'
                    }
                  }"
                />
              </b-col>

              <b-col>
                <b-table
                  striped
                  hover
                  small
                  :items="table.count_imp"
                />
              </b-col>
            </b-form-row>
          </div>
        </div>
        <!-- /count_imp -->
      </div>
      <!-- /Loadded -->
    </div>
</template>

<style scoped>
</style>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: 'Statistics',

  components: {
    GChart
  },

  mounted () {
    this.getData()
  },

  destroyed () {
    this.loaded = false
    this.stats = {}
    this.table = []
  },

  data () {
    return {
      loaded: false,
      stats: {},
      table: {}
    }
  },

  watch: {
  },

  methods: {
    getData () {
      let self = this

      this.$API({
        url: 'stats',
        methods: 'get'
      })
        .then(function (response) {
          if (response.data) {
            self.stats = response.data
            self.$notify({
              title: 'Data Loaded',
              type: 'suceess'
            })

            if (self.stats) {
              self.$lodash.forOwn(self.stats, function (value, key) {
                self.table[key] = self.tableData(value)
              })
            }

            self.loaded = true
          }
        })
        .catch(function (error) {
          self.$notify({
            title: 'Error',
            type: 'error',
            text: 'Unable to load statistics data.'
          })

          console.log(error)
          self.loaded = false
        })
    },

    tableData (chartArray) {
      let tableArray = this.$lodash.cloneDeep(chartArray)
      let keys = tableArray.shift()
      let objects = tableArray.map(function (values) {
        return keys.reduce(function (o, k, i) {
          o[k] = values[i]
          return o
        }, {})
      })

      return objects
    }
  }
}
</script>
