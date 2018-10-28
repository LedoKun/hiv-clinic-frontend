import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Patient from '@/components/Patient'
import Appointments from '@/components/Appointments'
import Statistics from '@/components/Statistics'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/patient/:hn_arg?',
      name: 'Patient',
      component: Patient
    },
    {
      path: '/appointments',
      name: 'Appointments',
      component: Appointments
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    }
  ]
})
