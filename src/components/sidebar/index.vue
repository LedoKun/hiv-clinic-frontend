<template>
    <div>
        <ul class="nav flex-column">
            <li
                class="nav-item"
            >
                <router-link
                    class="nav-link"
                    :to="{ name: 'Dashboard' }"
                    exact
                >
                    <span><feather type="home"></feather></span>
                    Dashboard
                </router-link>
            </li>

            <div
                v-if="isLoggedIn"
            >
                <li
                    class="nav-item"
                >

                    <router-link
                        class="nav-link"
                        :to="{ name: 'Appointments' }"
                        exact
                    >
                        <span><feather type="calendar"></feather></span>
                        Appointments
                    </router-link>
                </li>

                <li
                    class="nav-item"
                >
                    <router-link
                        class="nav-link"
                        :to="{ name: 'Patient' }"
                        exact
                    >
                        <span><feather type="users"></feather></span>
                        Patient
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        :to="{ name: 'Statistics' }"
                        exact
                    >
                        <span><feather type="bar-chart-2"></feather></span>
                        Statistics
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span><feather type="file"></feather></span>
                        Export Data
                    </a>
                </li>
            </div>
        </ul>

        <div
            v-if="isLoggedIn"
        >
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Opened Records</span>
                <div class="d-flex align-items-center text-muted" href="#">
                    <span><feather type="layers"></feather></span>
                </div>
            </h6>
            <ul class="nav flex-column mb-2">
                <!-- Links to saved records -->
                <li
                    class="nav-item"
                    v-for="(hn, key) in savedRecords"
                    v-bind:key="key"
                >
                    <router-link
                        class="nav-link"
                        :to="{
                            name: 'Patient',
                            params: {
                                hn_arg: hn.replace(/\//g, '^')
                            }
                        }"
                        exact
                    >
                        <span><feather type="user"></feather></span>
                        HN {{ hn }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
/*
 * Sidebar
 */
.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
</style>

<script>
import '../../store'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SideBar',

  computed: {
    ...mapState('patientInfo', [
      'patient'
    ]),
    ...mapState('savedRecord', [
      'savedRecords'
    ]),
    ...mapState('auth', [
      'isLoggedIn'
    ]),

    isPatientLoaded: function () {
      return this.patient.isLoaded
    }
  },

  watch: {
    isPatientLoaded: function (newValue, oldValue) {
      if (newValue) {
        this.addHNAction(this.patient.hn)
      }
    }
  },

  methods: {
    ...mapActions('savedRecord', [
      'addHNAction'
    ])
  },

  data: function () {
    return {
    }
  }
}
</script>
