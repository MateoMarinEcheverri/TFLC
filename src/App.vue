<template>
  
  <v-app>
  <div>
    <v-app-bar
      color="black"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn text to="/home">Home</v-btn>
        <v-btn text to="/signup">Sign Up</v-btn>
        <v-btn text to="/signin">Sign In</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
    
    <v-content>
      <router-view></router-view>
    </v-content>
    
  </v-app>

</template>

<script>
//import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  data(){
    return {
      appTitle: 'Awesome App',
      sidebar: false,
      menuItems: [
          { title: 'Home', path: '/home', icon: 'home' },
          { title: 'Sign Up', path: '/signup', icon: 'face' },
          { title: 'Sign In', path: '/signin', icon: 'lock_open' }
     ]
    }
  },
};
</script>
<style>

</style>
