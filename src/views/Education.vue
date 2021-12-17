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
         <h3>Education</h3>
         <md-divider></md-divider>
       </md-card-header>
       <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Qualification</label>
            <md-input v-model="newUser.hqualification"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Course name</label>
            <md-input v-model="newUser.cname"></md-input>
          </md-field>
        </div>
        </div>
     <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Course specialization</label>
            <md-input v-model="newUser.cspcl"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>University/Institute name </label>
            <md-input v-model="newUser.institute"></md-input>
          </md-field>
        </div>
        </div>
    <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
           <md-field>
            <label>Passing out year</label>
                <md-select v-model="newUser.pyear" placeholder="year">
                  <md-option value="2024">2024</md-option>
                  <md-option value="2023">2023</md-option>
                  <md-option value="2022">2022</md-option>
                  <md-option value="2021">2021</md-option>
                  <md-option value="2020">2020</md-option>
                  <md-option value="2019">2019</md-option>
                  <md-option value="2018">2018</md-option>
                  <md-option value="2017">2017</md-option>
                  <md-option value="2014">2016</md-option>
                  <md-option value="2015">2015</md-option>
                  <md-option value="2014">2014</md-option>
                  <md-option value="2013">2013</md-option>
                  <md-option value="2012">2012</md-option>
                  <md-option value="2011">2011</md-option>
                  <md-option value="2010">2010</md-option>
                  <md-option value="2009">2009</md-option>
                  <md-option value="2008">2008</md-option>
                  <md-option value="2007">2007</md-option>
                  <md-option value="2006">2006</md-option>
                  <md-option value="2005">2005</md-option>
                  <md-option value="2004">2004</md-option>
                  <md-option value="2003">2003</md-option>
                  <md-option value="2002">2002</md-option>
                  <md-option value="2001">2001</md-option>
                  <md-option value="2000">2000</md-option>



                </md-select>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
     <md-field>
            <label>Percantage/CGPA</label>
            <md-input v-model="newUser.marks"></md-input>
          </md-field>
        </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
       <md-field>
            <label>Technical Skills</label>
            <md-input v-model="newUser.skills"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Any Certification</label>
            <md-input v-model="newUser.certificate"></md-input>
          </md-field>
        </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
        <md-button class="md-primary md-dense md-raised md-default" @click="saveEducation">Submit</md-button>
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
        hqualification: '',
        cname: '',
        cspcl: '',
        institute: '',
        pyear: '',
        marks: '',
        skills: '',
        certificate: '',
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
       saveEducation(){
        ipcRenderer.send('education:submit', this.newUser)

      }
    },
    created(){
     var userId = this.$store.state.user.id;
    this.newUser.userId = this.$store.state.user.id;
    console.log(this.newUser.userId);
    ipcRenderer.send('education:get',userId)
  },
      mounted(){
      //Register IPC Renderer event handles once for this control
        ipcRenderer.on('education:submitsuccess', () => {
        this.statusMessage = 'Profile saved successfully'
        this.showSnackbar = true

      })

     ipcRenderer.on('education:success', (e, data) => {
        // this.newUser. = data;
      this.newUser.id =  data[0].ID
      this.newUser.hqualification =  data[0].Qualification
      this.newUser.cname =  data[0].CourseName
      this.newUser.cspcl =  data[0].CourseSpcl
      this.newUser.institute =  data[0].UniversityName
      this.newUser.pyear =  data[0].PassingYear
      this.newUser.marks =  data[0].Percantage
      this.newUser.skills =  data[0].TechnicalSkills
      this.newUser.certificate = data[0].Certificate
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