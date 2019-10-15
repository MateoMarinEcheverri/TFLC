<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="users" class="elevation-1" :search="search">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>User list</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search by name or dependency"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="black" dark class="mb-2" v-on="on">New User</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.lastname" label="LastName"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-card-text>Dependency</v-card-text>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-select
                        v-model="editedItem.dependency"
                        :items="dependencies"
                        :label="editedItem.dependency"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-card-text>Active</v-card-text>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-select
                        v-model="editedItem.active"
                        :items="activevals"
                        :label="editedItem.active"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.validuntil"
                            label="Valid Until"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.validuntil" @input="menu2 = false">
                          <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      search: "",
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        lastname: "",
        email: "",
        dependency: "",
        validuntil: "",
        active: ""
      },
      defaultItem: {
        name: "",
        lastname: "",
        email: "",
        dependency: "",
        validuntil: "",
        active: ""
      },
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      checkbox: true,
      activevals: ["true", "false"]
    };
  },
  computed: {
    headers() {
      let headers = [
        { text: "Name", value: "name" },
        { text: "Last Name", value: "lastname" },
        { text: "Email", value: "email" },
        { text: "Dependency", value: "dependency" },
        { text: "Active", value: "active" },
        { text: "Valid Until", value: "validuntil" },
        { text: "Actions", value: "action", sortable: false }
      ];
      return headers;
    },
    users() {
      let users = [];
      users = this.$store.getters.users;
      return users;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    dependencies() {
      let dependencies = [];
      let dependencies_names = [];
      dependencies = this.$store.getters.dependencies;
      for (let i = 0; i < dependencies.length; i++) {
        dependencies_names.push(dependencies[i].name);
      }
      return dependencies_names;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this user?") &&
        this.$store.dispatch("deleteUser", item);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      }

      this.$store.dispatch("saveUser", this.editedItem);

      this.close();
    }
  },
  beforeMount() {
    this.$store.dispatch("getUsers");
    this.$store.dispatch("getDependencies");
  }
};
</script>