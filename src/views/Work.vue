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
         <h3>Work-Information</h3>
         <md-divider></md-divider>
       </md-card-header>
       <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Employee ID</label>
            <md-input v-model="newUser.eid"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Employee Name</label>
            <md-input v-model="newUser.ename"></md-input>
          </md-field>
        </div>
        </div>
     <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Employee Title</label>
            <md-input v-model="newUser.title"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Department</label>
            <md-input v-model="newUser.department"></md-input>
          </md-field>
        </div>
        </div>
    <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Official contact number</label>
            <md-input v-model="newUser.contact"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Officail E-mail Id</label>
            <md-input v-model="newUser.email"></md-input>
          </md-field>
        </div>
        </div>
    <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Employee Skype Id</label>
            <md-input v-model="newUser.skype"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Upwork Id</label>
            <md-input v-model="newUser.upwork"></md-input>
          </md-field>
        </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
        <md-button class=" md-primary md-dense md-raised md-default" @click="saveWork">Submit</md-button>
    </div>
     </md-card>
    </md-content>
      <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
        <span>{{statusMessage}}</span>
      </md-snackbar>
  </div>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer


export default {
    name: 'profile',
    data: () => ({
      newUser: {
        id: 0,
        eid: '',
        ename: '',
        title: '',
        department: '',
        contact: '',
        email: '',
        skype: '',
        upwork: '',
        userId: 0,
        },
      showSnackbar: false,
      statusMessage: '',
      showNavigation: false,
      showSidepanel: false,
    }),
    computed: {
    user () {
      return this.$store.state.user
    }
  },
    methods: {
      saveWork(){
        ipcRenderer.send('work:submit', this.newUser)
      }
    },
    created(){
      var userId = this.$store.state.user.id;
    this.newUser.userId = this.$store.state.user.id;
    console.log(this.newUser.userId);
    ipcRenderer.send('work:get',userId)
  },
    mounted(){
      //Register IPC Renderer event handles once for this control
        ipcRenderer.on('work:submitsuccess', () => {
        this.statusMessage = 'Profile saved successfully'
        this.showSnackbar = true

      })
           ipcRenderer.on('work:success', (e, data) => {
        // this.newUser. = data;
      this.newUser.id =  data[0].ID
      this.newUser.eid =  data[0].EmployeeID
      this.newUser.ename =  data[0].EmployeeName
      this.newUser.title =  data[0].EmployeeTitle
      this.newUser.department =  data[0].Department
      this.newUser.contact =  data[0].ContactNo
      this.newUser.email =  data[0].EmailID
      this.newUser.skype =  data[0].SkypeeID
      this.newUser.upwork = data[0].UpworkID
      this.newUser.userId = data[0].UserID
    })

    }
  }
</script>

<style>
  .page-container {
    min-height: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }


  .md-drawer {
    width: 250px!important;
    max-width: 250px!important;
  }

  .md-content {
    padding: 16px;
  }
  .md-card-header{
   text-align: center;
  }
   .md-button{
    margin-top: 20px!important;
    margin-bottom: 20px!important;
  }

</style>