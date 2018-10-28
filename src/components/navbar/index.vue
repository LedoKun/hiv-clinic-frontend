<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">HIV Clinic</a>
    <TypeAhead
      v-if="isLoggedIn"
      id="search_bar"
      v-model="query"
      :placeholder="'Search...'"
      :classes="'w-100 form-control-dark'"
      src="search/field_entries?field_name=search_bar&query=:keyword"

      :fetch="searchFetch"
      :getResponse="getResponse"
      :minChars="parseInt(3)"
      :delayTime="parseInt(500)"

      :render="searchRender"
      :onHit="searchOnHit"
    />
    <ul class="navbar-nav px-3">

      <!-- Login Buttons -->
      <li
        v-if="!isLoggedIn"
        class="nav-item text-nowrap"
      >
        <a
          class="nav-link"
          href="#"
          @click="loginModalShow = !loginModalShow"
        >
          Sign In
        </a>
      </li>

      <li
        v-else
        class="nav-item text-nowrap"
      >
          <a
            class="nav-link"
            href="#"
            @click="signOut()"
          >
            Sign out
          </a>
      </li>

      <!-- Sign In modal -->
      <b-modal
        id="signIn"
        title="Sign In"
        v-model="loginModalShow"
        hide-footer
      >
        <b-form
          @submit.prevent="signIn"
        >
          <b-form-group
            id="usernameGroup"
            label="Username:"
            label-for="username"
          >
            <b-form-input
              id="username"
              type="text"
              required
              placeholder="Enter username"
              v-model="username"
              minlength=4
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="passwordGroup"
            label="Password:"
            label-for="password"
          >
            <b-form-input
              id="password"
              type="password"
              required
              placeholder="Enter password"
              v-model="password"
              minlength=4
            >
            </b-form-input>
          </b-form-group>

          <b-form-group>
            <b-btn
              type="submit"
              class="mt-3"
              variant="outline-success"
              block
            >
              Sign In
            </b-btn>
          </b-form-group>
        </b-form>
      </b-modal>
      <!-- /Sign In modal -->

    </ul>
  </nav>
</template>

<style>
/*
 * Navbar
 */
.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control .type-ahead-select {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark .type-ahead-select {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
  width: 100%;
}

.form-control-dark:focus .type-ahead-select:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

</style>

<script>
import TypeAhead from 'vue2-typeahead'
import { mapState, mapActions } from 'vuex'
import '../../store'

export default {
  name: 'NavBar',

  components: {
    TypeAhead
  },

  data () {
    return {
      query: '',
      items: [],
      loginModalShow: false,
      username: '',
      password: ''
    }
  },

  computed: {
    ...mapState('auth', [
      'isLoggedIn'
    ])
  },

  watch: {
  },

  methods: {
    ...mapActions('auth', [
      'loginAction',
      'logoutAction'
    ]),

    callBackSearchBar (data) {
      this.$router.push({
        name: 'Patient',
        params: {
          hn_arg: data.hn.replace(/\//g, '^')
        }
      })
    },

    getResponse: function (response) {
      return response.data
    },

    searchRender: function (items) {
      let labels = []
      for (let key in items) {
        labels.push(items[key].label)
      }

      return labels
    },

    searchOnHit: function (item, vue, index) {
      if (typeof index !== 'undefined') {
        this.$router.push({
          name: 'Patient',
          params: {
            hn_arg: vue.data[index].hn
          }
        })

        this.query = ''
      }
    },

    signOut: function () {
      let self = this

      // redirect to home
      this.$router.push({
        name: 'Dashboard'
      })

      // blacklist jwt
      this.$API({
        url: 'logout',
        method: 'post'
      })
        .then(function (response) {
          if (response.data) {
            // remove token from session
            sessionStorage.removeItem('jwt-token')

            // change login state
            self.logoutAction()

            self.$notify({
              title: 'Signed Out',
              type: 'suceess',
              text: response.data.message
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
    },

    signIn: function () {
      let self = this

      this.$API({
        url: 'login',
        method: 'post',
        data: {
          'username': this.username,
          'password': this.password
        }
      })
        .then(function (response) {
          if (response.data && response.data.access_token) {
            sessionStorage.setItem('jwt-token', response.data.access_token)

            self.$notify({
              title: 'Singed In',
              type: 'suceess',
              text: response.data.message
            })

            self.loginAction()
            self.loginModalShow = false
          }
        })
        .catch(function (error) {
          self.$notify({
            title: 'Error',
            type: 'error',
            text: error.response.data.message
          })
        })
    },

    searchFetch: function (url) {
      return this.$API.get(url)
    }
  }
}
</script>
