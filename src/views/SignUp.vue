<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="name"
                label="Name"
                id="name"
                v-model="name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="lastnamee"
                label="Last Name"
                id="lastname"
                v-model="lastname"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="dependency"
                label="Dependency"
                id="dependency"
                v-model="dependency"
                required
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
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                v-model="cpassword"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn dark type="button" @click="signUp">Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      name: "",
      lastname: "",
      dependency: "",
      email: "",
      password: "",
      cpassword: ""
    };
  },
  methods: {
    signUp: function() {
      if(this.name===""||this.lastname===""||this.dependency===""||this.email===""||this.password===""||this.cpassword===""){
        alert("You must fill all the fields.")
      } else if(this.cpassword!=this.password){
        alert("Password does not coincide with confirmation.")
      } else if(this.password.length<6){
        alert("Password must be at least 6 digists long.")
      }else{
        this.$store.dispatch('signUserUp', {name: this.name, lastname: this.lastname, email: this.email, dependency: this.dependency, password: this.password})
      }
      
    }
  }
};
</script>
