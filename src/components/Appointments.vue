<template>
    <div class="mb-5">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
        <h1 class="h2">Appointments</h1>

        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="mr-1">
            <vue-pikaday
              id="visit-date"
              class="form-control"
              v-model="selectedDate"
              :options="pikaday_option"
              v-p-visible="pikaday_visible"
            />
          </div>
          <button
            class="btn btn-sm btn-outline-secondary dropdown-toggle"
            @click="toggle_pikaday()"
          >
            Select Date
          </button>
        </div>

      </div>

      <h4 class="mb-3">{{ $moment(selectedDate).format("dddd, Do MMMM YYYY") }}</h4>

      <div class="table-responsive mb-2">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>HN</th>
              <th>ชื่อ - นามสกุล</th>
              <th>อายุ</th>
              <th>สัญชาติ</th>
              <th>สิทธิการรักษาพยาบาล</th>
              <th>โทรศัพท์</th>
              <th>โทรศัพท์ญาติ</th>
              <th>สาเหตุการนัด</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="appointmentsPagination.items.length === 0"
            >
              <td colspan="9" class="text-center">
                No Data...
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in appointmentsPagination.items"
              v-bind:key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'Patient',
                    params: {
                      hn_arg: item[0].hn.replace(/\//g, '^')
                    }
                  }"
                  exact
                >
                  {{ item[0].hn }}
                </router-link>
              </td>
              <td>{{ item[0].name }}</td>
              <td>{{ getAge(item[0].dob) }}</td>
              <td>{{ item[0].nationality }}</td>
              <td>{{ item[0].bill_payer }}</td>
              <td><span v-html="item[0].tel.join('<br>')"></span></td>
              <td><span v-html="item[0].relative_tel.join('<br>')"></span></td>
              <td>{{ item[1].appointment_for }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <b-pagination
          align="center"
          size="sm"
          :total-rows="appointmentsPagination.total"
          v-model="currentPage"
          :per-page="appointmentsPagination.perPage"
        />
      </div>
    </div>
</template>

<style scoped>
</style>
<style src="@enrian/vue-pikaday/dist/vue-pikaday.min.css"></style>

<script>
import dateToIsostring from '../utils/date_to_isostring'

export default {
  name: 'Appointments',

  components: {
  },

  mounted () {
    this.selectedDate = this.$moment().toDate()
  },

  data () {
    return {
      debouncedCurrentPage: this.$lodash.debounce(function () {
        this.loading = true
        this.getAppointments()
      }, 1000),

      debouncedSelectedDate: this.$lodash.debounce(function () {
        this.loading = true
        this.currentPage = 1
        this.getAppointments()
      }, 1000),

      currentPage: 1,
      loading: false,
      selectedDate: null,
      appointmentsPagination: {
        items: [],
        page: 1,
        pages: 1,
        total: 1,
        perPage: 5
      },
      pikaday_visible: false,
      pikaday_option: {
        format: 'DD/MM/YYYY'
      }
    }
  },

  watch: {
    selectedDate: function (newValue, oldValue) {
      if (this.$moment(newValue).isValid() && (newValue !== oldValue) && !this.loading) {
        this.debouncedSelectedDate()
      }
    },

    currentPage: function (newValue, oldValue) {
      if (newValue !== oldValue && !this.loading) {
        this.debouncedCurrentPage()
      }
    }
  },

  methods: {
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

    toggle_pikaday () {
      this.pikaday_visible = !this.pikaday_visible
    },

    getAppointments () {
      let self = this

      this.$API({
        url: 'appointment',
        methods: 'get',
        params: {
          'date': dateToIsostring(this.selectedDate),
          'page': this.currentPage
        }
      })
        .then(function (response) {
          if (response.data) {
            self.appointmentsPagination = response.data
            self.$notify({
              title: 'Data Loaded',
              type: 'suceess'
            })

            self.loading = false
          }
        })
        .catch(function (error) {
          self.$notify({
            title: 'Error',
            type: 'error',
            text: error.response.data.message
          })

          self.loading = false
        })
    }
  }
}
</script>
