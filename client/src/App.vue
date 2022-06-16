<template>
  <header>
    <div class="logo">
      <router-link to="/">
        <img alt="Vue logo" src="./assets/logo.png">
      </router-link>
    </div>
    <nav>
      <div class="nav body">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
      <div class="nav end">
        <div class="logged-out group" v-if="!isLoggedIn">
          <router-link to="/register" class="primary button"><strong>Sign Up</strong></router-link>
          <router-link to="/login" class="dark ghost button">Log In</router-link>
        </div>
        <div class="logged-in group" v-if="isLoggedIn">
          <router-link to="/profile">Profile</router-link>
          <button @click="logoutUser" class="dark ghost button">Log Out</button>
        </div>
      </div>
    </nav>
  </header>
  <router-view/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['logout']),

    logoutUser() {
      this.logout()
    }
  }
}
</script>

<style lang="scss">
</style>
