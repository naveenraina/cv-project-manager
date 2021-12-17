<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-default">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Profile</span>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Employee Profile</span>
      </md-toolbar>

      <md-list>
        <md-list-item to="/profile">
          <md-icon>verified_user</md-icon>
          <span class="md-list-item-text">Basic Information</span>
        </md-list-item>

        <md-list-item to="/Work">
          <md-icon>verified_user</md-icon>
          <span class="md-list-item-text">Work Information</span>
        </md-list-item>

        <md-list-item to="/Education">
          <md-icon>verified_user</md-icon>
          <span class="md-list-item-text">Education</span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-content>
      <md-card>
        <md-card-header>
          <h3>Basic-Inforation</h3>
          <md-divider></md-divider>
        </md-card-header>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-45 ">
            <md-field>
              <label>First Name</label>
              <md-input v-model="newUser.fname"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-45 ">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="newUser.lname"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-45 ">
            <md-datepicker v-model="newUser.dob">
              <label>D.O.B</label>
            </md-datepicker>
          </div>
          <div class="md-layout-item md-medium-size-45 ">
            <md-field>
              <label>Personal Contact Number</label>
              <md-input @blur="checkContactNo" v-model="newUser.contact"></md-input>
               <span v-if="contactNotValid"> Contact Number is not valid</span>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-45 ">
            <md-field>
              <label>Personal E-mail Address</label>
              <md-input @blur="checkEmail" v-model="newUser.email"></md-input>
              <span v-if="emailNotValid"> Email is not valid</span>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-45 ">
            <md-field>
              <label>Address</label>
              <md-input v-model="newUser.address"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-45 ">
            <md-field>
              <label>City</label>
              <md-input v-model="newUser.city"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-45 ">
            <md-field>
              <label>Country</label>
              <md-input v-model="newUser.country"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
          <md-button
            class=" md-primary md-dense md-raised md-default"
            @click="saveProfile"
            >Submit</md-button
          >
        </div>
      </md-card>
    </md-content>
    <md-snackbar
      md-position="center"
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ statusMessage }}</span>
    </md-snackbar>
  </div>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer;

export default {
  name: "profile",
  data: () => ({
    newUser: {
      id: 0,
      fname: "",
      lname: "",
      dob: "",
      contact: "",
      email: "",
      address: "",
      city: "",
      country: "",
      userId: 0,

    },
    // profile: [],
    emailNotValid: false,
    contactNotValid: false,
    showSnackbar: false,
    statusMessage: "",
    showNavigation: false,
    showSidepanel: false,
  }),
   computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    checkEmail() {
      var emailResult = this.newUser.email;
     var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  if (filter.test(emailResult))
    this.emailNotValid = false;
  else {
    this.emailNotValid = true;
  }
    },
      checkContactNo() {
      var contactResult = this.newUser.contact;
     var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  if (filter.test(contactResult))
    this.contactNotValid = false;
  else {
    this.contactNotValid = true;
  }
    },


    saveProfile() {
    ipcRenderer.send("profile:submit", this.newUser);

    }




  },
  created(){
    var userId = this.$store.state.user.id;
    this.newUser.userId = this.$store.state.user.id;
    console.log(this.newUser.userId);
    ipcRenderer.send('profile:get',userId)
  },
  mounted() {
    //Register IPC Renderer event handles once for this control
    ipcRenderer.on("profile:submitsuccess", () => {
      this.statusMessage = "Profile saved successfully";
      this.showSnackbar = true;

    });
    ipcRenderer.on('profile:success', (e, data) => {
        // this.newUser. = data;
      this.newUser.id =  data[0].ID
      this.newUser.fname =  data[0].FirstName
      this.newUser.lname =  data[0].LastName
      this.newUser.dob =  data[0].Dob
      this.newUser.contact =  data[0].ContactNo
      this.newUser.email =  data[0].Email
      this.newUser.address =  data[0].Address
      this.newUser.city =  data[0].City
      this.newUser.country = data[0].Country
      this.newUser.userId = data[0].UserID
    })

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
</style>
