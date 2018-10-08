<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">HIV Clinic</a>
      <TypeAhead
        id="search_bar"
        v-model="query"
        :placeholder="'Search...'"
        :classes="'w-100 form-control-dark'"
        src="/api/search/field_entries?field_name=search_bar&query=:keyword"

        :getResponse="getResponse"
        :minChars="parseInt(3)"
        :delayTime="parseInt(500)"

        :render="searchRender"
        :onHit="searchOnHit"
      />
      <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sign out</a>
      </li>
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

export default {
  name: 'NavBar',

  components: {
    TypeAhead
  },

  data () {
    return {
      query: '',
      items: []
    }
  },

  watch: {
  },

  methods: {
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
    }
  },

  computed: {
  }
}
</script>
