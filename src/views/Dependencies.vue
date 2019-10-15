<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="dependencies" class="elevation-1" :search="search">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Dependency list</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search by dependency name"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="black" dark class="mb-2" v-on="on">New Dependency</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.name" label="Dependency Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="9" md="9">
                      <v-text-field v-model="editedItem.coordinator" label="Coordinator"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-text-field v-model="editedItem.max_users" label="Max Users" type="number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.location" label="Location"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-card-text>Active</v-card-text>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select
                        v-model="editedItem.active"
                        :items="activevals"
                        :label="editedItem.active"
                        solo
                      ></v-select>
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
        <v-dialog v-model="detail" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-icon small class="mr-2" v-on="on" @click="dependencyUsers(item)">fas fa-list</v-icon>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Dependency Users</span>
            </v-card-title>
            <v-data-table :headers="userheaders" :items="dependencyusers" class="elevation-1"></v-data-table>
          </v-card>
        </v-dialog>

        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "dependencies",
  data() {
    return {
      search: "",
      dialog: false,
      editedIndex: -1,
      detail: false,
      users: this.$store.getters.users,
      editedItem: {
        name: "",
        coordinator: "",
        max_users: "",
        location: "",
        users: [],
        active: ""
      },
      defaultItem: {
        name: "",
        coordinator: "",
        max_users: "",
        location: "",
        users: [],
        active: ""
      },
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      checkbox: true,
      activevals: ["true", "false"],
      dependencyusers: []
    };
  },
  computed: {
    headers() {
      let headers = [
        { text: "Name", value: "name" },
        { text: "Coordinator", value: "coordinator" },
        { text: "Max Users", value: "max_users" },
        { text: "Location", value: "location" },
        { text: "Active", value: "active" },
        { text: "Actions", value: "action", sortable: false }
      ];
      return headers;
    },
    userheaders() {
      let headers = [
        { text: "Name", value: "name" },
        { text: "Last Name", value: "lastname" },
        { text: "Email", value: "email" },
        { text: "Dependency", value: "dependency" },
        { text: "Active", value: "active" },
        { text: "Valid Until", value: "validuntil" }
      ];
      return headers;
    },
    dependencies() {
      let dependencies = [];
      dependencies = this.$store.getters.dependencies;
      return dependencies;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.dependencies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this dependency?") &&
        this.$store.dispatch("deleteDependency", item);
    },
    dependencyUsers(item) {
      let dependencyUsers = [];
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].dependency == item.name) {
          dependencyUsers.push(this.users[i]);
        }
      }
      this.dependencyusers = dependencyUsers
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
        Object.assign(this.dependencies[this.editedIndex], this.editedItem);
      }
      this.$store.dispatch("saveDependency", this.editedItem);
      this.close();
    }
  },
  beforeMount() {
    this.$store.dispatch("getDependencies");
    this.$store.dispatch("getUsers");
  }
};
</script>