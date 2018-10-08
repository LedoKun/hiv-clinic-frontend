<template>
  <div id="app">

    <!-- Navbar -->
    <navbar/>

    <b-container fluid>
      <b-row>
        <!-- Sidebar -->
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <sidebar/>
            </div>
        </nav>

        <!-- Main content -->
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div>
            <router-view/>
          </div>
        </main>
      </b-row>
    </b-container>

    <!-- notifications -->
    <notifications
      position="bottom right"
    />
  </div>
</template>

<style>
#app {
  font-size: .875rem;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

/*
 * Content
 */
[role="main"] {
  padding-top: 48px; /* Space for fixed navbar */
}
</style>

<script>
import NavBar from './components/navbar'
import SideBar from './components/sidebar'

export default {
  name: 'App',
  components: {
    'navbar': NavBar,
    'sidebar': SideBar
  }
}
</script>
