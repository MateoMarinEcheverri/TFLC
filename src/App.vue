<template>
  <v-app>
    <div>
      <v-app-bar color="black" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Page title</v-toolbar-title>

        <div class="flex-grow-1"></div>

        <v-toolbar-items v-for="item in menuItems" :key="item.title" :name="item.title">
          <template v-if="item.title==='Log out'">
            <v-btn @click="onLogout" color="black" to="signin">{{item.title}}</v-btn>
          </template>
          <template v-else>
            <v-btn :to="item.path" color="black">{{item.title}}</v-btn>
          </template>
        </v-toolbar-items>
      </v-app-bar>
    </div>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { title: "Home", path: "/home" },
        { title: "Sign Up", path: "/signup" },
        { title: "Sign In", path: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { title: "Users", path: "/users" },
          { title: "Dependencies", path: "/signup" },
          { title: "Log out", path: "/signin" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
<style>
</style>
