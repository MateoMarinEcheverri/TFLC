<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a user's home page</p>
        <v-btn dark type="button" @click="load">Load data</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import json from "../json/data.json";
export default {
  name: "Home",
  data() {
    return {
      myJson: json
    };
  },
  methods: {
    load(){
      //this.$store.dispatch('loadDb', this.myJson)
    }
  }
};
</script>
