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

    <md-list-item to="/Documents">
       <md-icon>verified_user</md-icon>
       <span class="md-list-item-text">Documents</span>
    </md-list-item>

    <md-list-item to="/Education">
        <md-icon>verified_user</md-icon>
        <span class="md-list-item-text">Education</span>
    </md-list-item>

    <md-list-item to="/Experience">
         <md-icon>verified_user</md-icon>
        <span class="md-list-item-text">Experience</span>
    </md-list-item>
  </md-list>
</md-drawer>

    <md-content>
     <md-card>
       <md-card-header>
         <h3>Experience</h3>
         <md-divider></md-divider>
       </md-card-header>
       <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Previous Company Name</label>
            <md-input v-model="user.company"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Designation/Position</label>
            <md-input v-model="user.designation"></md-input>
          </md-field>
        </div>
        </div>
     <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Previous Employer Name</label>
            <md-input v-model="user.employer"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Previous Employer Contact Number</label>
            <md-input v-model="user.employercontact"></md-input>
          </md-field>
        </div>
        </div>
     <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45">
            <md-datepicker v-model="workedfrom">
      <label>Worked from </label>
    </md-datepicker>
        </div>
        <div class="md-layout-item md-medium-size-45 ">
               <md-datepicker v-model="to">
      <label>To</label>
    </md-datepicker>
        </div>
        </div>
    <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Total Experience (in years)</label>
                <md-select class="total experience" v-model="user.year">
                  <md-option value="0-1">0-1</md-option>
                  <md-option value="1-2">1-2</md-option>
                  <md-option value="2-5">2-5</md-option>
                </md-select>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Total Experience (in months)</label>
                <md-select class="total experience" v-model="user.experience">
                  <md-option value="0-6">0-6</md-option>
                  <md-option value="6-12">6-12</md-option>
                </md-select>
          </md-field>
        </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
        <md-button class="md-dense md-raised md-default">Submit</md-button>
    </div>
     </md-card>
    </md-content>
  </div>
</template>

<script>
export default {
    name: 'profile',
    data: () => ({
      user: {
        placeholder:'',
        experience:'',
        year:'',
        company:'',
        designation:'',
        employer:'',
        employercontact:'',
        workedfrom:'',
        to:'',
      },
      showNavigation: false,
      showSidepanel: false,
      placeholder:null,
      workedfrom:null,
      to:null,
    })
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