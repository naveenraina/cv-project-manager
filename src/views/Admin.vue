<template>
  <div>
    <div v-if="user.role === 'Admin'" class="page-container md-layout-column">
      <md-table>
        <md-toolbar class="md-default">
          <md-button class="md-icon-button" @click="showNavigation = true">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Admin</span>
        </md-toolbar>
      </md-table>

      <md-drawer :md-active.sync="showNavigation" md-swipeable>
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">Admin</span>
        </md-toolbar>

        <md-list>
          <md-list-item to="/admin">
            <md-icon>verified_user</md-icon>
            <span class="md-list-item-text">User</span>
          </md-list-item>

          <md-list-item to="/reminders">
            <md-icon>verified_user</md-icon>
            <span class="md-list-item-text">Reminders</span>
          </md-list-item>
             <md-list-item to="/taskReport">
          <md-icon>verified_user</md-icon>
          <span class="md-list-item-text">Task Report</span>
        </md-list-item>
        </md-list>
      </md-drawer>

      <!--startnew-->

      <div class="md-layout">          
        <div class="md-layout-item">
          <md-table>
            <md-table-toolbar>
              <div class="md-toolbar-section-start">
                <h1 class="md-title">Users</h1>
                <md-checkbox
                  v-model="isUserActive"
                  @change="loadUser"
                  class="md-primary"
                  >Active</md-checkbox
                >
                <md-checkbox
                  v-model="isUserInActive"
                  @change="loadUser"
                  class="md-primary"
                  >InActive</md-checkbox
                >
              </div>
              <md-field md-clearable class="md-toolbar-section-end">
                <md-input
                  placeholder="Search by name..."
                  v-model="search"
                  @input="searchOnTable"
                />
              </md-field>
            </md-table-toolbar>
            <md-table v-model="users" md-card md-fixed-header style="height:350px; max-height:350px;">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
                <md-table-cell md-label="User Name" md-sort-by="user">
                  <div class="md-layout md-alignment-center-left">
                    <div class="md-layout-item">{{ item.user }}</div>
                    <div class="md-layout-item md-size-20" style="float: right">
                      <md-chip md-clickable @click="onedit(item.id)"
                        ><md-icon>edit</md-icon></md-chip
                      >
                      <md-chip md-clickable @click="ondelete(item.id)"
                        ><md-icon class="md-size-1x">delete</md-icon></md-chip
                      >
                    </div>
                  </div>
                </md-table-cell>
              </md-table-row>
            </md-table>
          
            <md-button class="md-default md-raised" @click="onCreateUser">
              Add New User
            </md-button>
          </md-table>
          <!--create dialog for new user-->
          <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Add New User</md-dialog-title>
            <div class="md-dialog-content md-layout">
              <div class="md-layout-item" style="width: 600px">
                <md-field>
                  <label>User name</label>
                  <md-input
                    type="text"
                    v-model="selectedUser.userName"
                  ></md-input>
                </md-field>
                <md-field class="md-layout-item">
                  <label>Password</label>
                  <md-input
                    type="password"
                    v-model="selectedUser.password"
                  ></md-input>
                </md-field>
                <md-field class="md-layout-item">
                  <label>Confirm Password</label>
                  <md-input
                    type="password"
                    v-model="confirmPassword"
                  ></md-input>
                </md-field>
                <md-field class="md-layout-item">
                  <md-select v-model="selectedUser.role" placeholder="Role">
                    <md-option value="Admin">Admin</md-option>
                    <md-option value="Manager">Manager</md-option>
                    <md-option value="Team manager">Project Lead </md-option>
                    <md-option value="Member">Member</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            <md-dialog-actions>
              <md-button class="md-primary" @click="cancelDialog"
                >Cancel</md-button
              >
              <md-button class="md-primary" @click="saveUser">Save</md-button>
            </md-dialog-actions>
          </md-dialog>

          <md-dialog :md-active.sync="showDialog1">
            <md-dialog-title>Update Information</md-dialog-title>
            <div class="md-dialog-content md-layout">
              <div class="md-layout-item" style="width: 600px">
                <md-field>
                  <label>User name</label>
                  <md-input
                    type="text"
                    v-model="selectedUser.userName"
                  ></md-input>
                </md-field>
                <md-field class="md-layout-item">
                  <label>Password</label>
                  <md-input
                    type="password"
                    v-model="selectedUser.password"
                  ></md-input>
                </md-field>
                <md-field class="md-layout-item">
                  <label>Confirm Password</label>
                  <md-input
                    type="password"
                    v-model="selectedUser.password"
                  ></md-input>
                </md-field>
                <md-field class="md-layout-item">
                  <md-select v-model="selectedUser.role">
                    <md-option value="Admin">Admin</md-option>
                    <md-option value="add">Manager</md-option>
                    <md-option value="Team manager">Project Lead </md-option>
                    <md-option value="Member">Member</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            <div style="padding-left: 13px">
              <md-checkbox v-model="editStatusName" class="md-primary"
                >Active/Inactive</md-checkbox
              >
            </div>
            <md-dialog-actions>
              <md-button class="md-primary" @click="cancelDialog"
                >Cancel</md-button
              >
              <md-button class="md-primary" @click="editUser">Done</md-button>
            </md-dialog-actions>
          </md-dialog>

          <md-dialog-confirm
            :md-active.sync="showDialogDeleteConfirmaton"
            md-title="Are you sure"
            md-content="This will permanently delete this item"
            md-confirm-text="Agree"
            md-cancel-text="Disagree"
            @md-confirm="deleteUser"
          />
          <md-snackbar
            md-position="center"
            :md-duration="4000"
            :md-active.sync="showSnackbar"
            md-persistent
          >
            <span>{{ statusMessage }}</span>
          </md-snackbar>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="md-layout">
        <div class="md-layout-item md-size-30"></div>
        <div class="md-layout-item">
          <md-card>
            <md-card-header>
              <div class="md-title">You do  not have authorization to this page</div>
            </md-card-header>
           <md-dialog-actions>
            
            <md-button to="/home" class="md-primary" >Ok</md-button></md-dialog-actions>
          </md-card>
        </div>
        <div class="md-layout-item md-size-30"></div>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapMutations } from 'vuex'
const ipcRenderer = require("electron").ipcRenderer;

const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter((item) => toLower(item.user).includes(toLower(term)));
  }

  return items;
};

export default {
  name: "Admin",
  data: () => ({
    roleuser: true,
    isUserActive: true,
    isUserInActive: false,
    showNavigation: false,
    selectedUserId: null,
    statusMessage: "",
    showDialogDeleteConfirmaton: false,
    showDialogEdit: false,
    showSnackbar: false,
    newUsersName: "",
    editUserName: "",
    selectedId: 0,
    showDialog: false,
    search: null,
    searched: [],
    editStatusName: false,
    globalStatus: "",
    users: [{ id: 0, user: "", status: "Active", role: "" }],

    confirmPassword: "",
    selectedUser: {
      userName: "",
      password: "",
      status: "Active",
      role: "",
    },
    showDialog1: false,
    newUser: {
      userName: "",
      password: "",
      status: "Active",
      role: "",
    },
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  mounted() {
    var vm = this;
    ipcRenderer.on("users:success", (e, data) => {
      vm.users = data;
      vm.searched = data;
    });

    ipcRenderer.on("user:deletesuccess", () => {
      this.statusMessage = "User removed successfully";
      this.showSnackbar = true;
      this.loadUser();
    });
    ipcRenderer.on("user:submitsuccess", () => {
      this.statusMessage = "User saved successfully";
      this.showSnackbar = true;

      this.loadUser();
    });
    ipcRenderer.on("user:editsuccess", () => {
      this.statusMessage = "User saved successfully";
      this.showSnackbar = true;

      this.loadUser();
    });
  },
  methods: {
    onCreateUser() {
      //  this.selectedUser = {...this.newUser}
      this.showDialog = true;
    },
    saveUser() {
      if (this.confirmPassword === this.selectedUser.password) {
        ipcRenderer.send("user:submit", this.selectedUser);
        this.showDialog = false;
      } else {
        this.statusMessage = "password did not match";
        this.showSnackbar = true;
      }
      if (this.selectedUser.role == "Admin") {
        this.roleuser = true;
      } else {
        this.roleuser = false;
      }
    },

    onedit(id) {
      this.selectedId = id;
      var found = this.users.find((item) => item.id === id);
      this.selectedUser.userName = found?.user;
      this.selectedUser.password = found?.password;
      this.selectedUser.role = found?.role;
      var editUserStatus = found?.status;
      if (editUserStatus == "Active") {
        this.editStatusName = true;
      } else {
        this.editStatusName = false;
      }
      this.showDialog1 = true;
    },
    editUser() {
      if (this.editStatusName === true) {
        this.globalStatus = "Active";
      } else {
        this.globalStatus = "InActive";
      }
      var updatedUser = {
        name: this.selectedUser.userName,
        password: this.selectedUser.password,
        role: this.selectedUser.role,
        status: this.globalStatus,
        id: this.selectedId,
      };
      ipcRenderer.send("user:edit", updatedUser);
      this.showDialog1 = false;
    },
    searchOnTable() {
      this.users = searchByName(this.users, this.search);
    },
    ondelete(id) {
      this.selectedId = id;
      var found = this.users.find((item) => item.id === id);
      this.editUserName = found?.user;
      this.showDialogDeleteConfirmaton = true;
    },
    deleteUser() {
      ipcRenderer.send("user:delete", { id: this.selectedId });
    },
    loadUser() {
      let filter = {
        showActive: this.isUserActive,
        inActiveStatus: this.isUserInActive,
      };
      ipcRenderer.send("users:get", filter);
    },
    cancelDialog() {
      this.selectedUser = { ...this.newUser };
      this.showDialog = false;
      this.showDialog1 = false;
    },
  },
  created() {
    this.loadUser();
  },
};
</script>

<style>
.page-container {
  min-height: 300px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 250px !important;
  max-width: 250px !important;
}

.md-content {
  padding: 16px;
}
.md-card-header {
  text-align: center;
}
.md-button {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}
.md-chip {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>