<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm4 offset-sm4 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                required
                v-model="email"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn dark type="button" @click="signIn">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { watch } from 'fs';
export default {
  name: "signin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn: function() {
      if (
        this.email === "" ||
        this.password === ""
      ) {
        alert("You must fill all the fields.");
      } else {
        this.$store.dispatch("signUserIn", {
          email: this.email,
          password: this.password
        });
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  watch: {
    user(value){
      if(value!==null && value!==undefined){
        this.$router.push("users")
      }
    }
  }
};
</script>
