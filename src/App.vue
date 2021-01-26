<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list
        nav
        dense>
        <v-list-item-group
          v-model="selectedItem"
          color="primary">
          <v-list-item
            v-for="(link, i) in links"
            :key="i"
            :to="link.url">
            <v-list-item-icon>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isUserLoggedIn" @click="onLogout">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-card class="rounded-0">
      <v-app-bar app dense dark color="primary ">
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="d-xs-flex d-md-none"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" class="pointer">
           Ad applicatioin
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          class="d-none d-md-flex"
          plain
          v-for="link in links"
          :key="link.title"
          :to="link.url"
        >
          <v-icon left>
            {{ link.icon }}
          </v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn"
          class="d-none d-md-flex"
          plain
          @click="onLogout"
        >
          <v-icon left>
            mdi-exit-to-app
          </v-icon>
          Logout
        </v-btn>
      </v-app-bar>
      </v-card>
      <v-main>
        <router-view></router-view>
      </v-main>
      <v-snackbar
        v-if="error"
        :timeout="5000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      > {{ error }}
        <template>
          <v-btn
            dark
            text
            @click="closeError"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      selectedItem: 0,
      snackbar: true
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders' },
          { title: 'New ad', icon: 'mdi-note-plus', url: '/new' },
          { title: 'My ads', icon: 'mdi-format-list-bulleted', url: '/list' }
        ]
      } else {
        return [
          { title: 'Login', icon: 'mdi-lock', url: '/login' },
          { title: 'Registration', icon: 'mdi-face', url: '/registration' }
        ]
      }
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  }
}

</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
