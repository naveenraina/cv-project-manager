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
         <h3>Basic-Inforation</h3>
         <md-divider></md-divider>
       </md-card-header>
       <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>First Name</label>
            <md-input v-model="user.fname"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Last Name</label>
            <md-input v-model="user.lname"></md-input>
          </md-field>
        </div>
        </div>
     <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
               <md-datepicker v-model="dob">
      <label>D.O.B</label>
    </md-datepicker>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Personal Contact Number</label>
            <md-input v-model="user.contact"></md-input>
          </md-field>
        </div>
        </div>
     <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Personal E-mail Address</label>
            <md-input v-model="user.email"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Address</label>
            <md-input v-model="user.address"></md-input>
          </md-field>
        </div>
        </div>
    <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>City</label>
            <md-input v-model="user.city"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Country</label>
            <md-input v-model="user.country"></md-input>
          </md-field>
        </div>
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
        fname:'',
        lname:'',
        contact:'',
        dob:'',
        address:'',
        city:'',
        country:'',
      },
      showNavigation: false,
      showSidepanel: false,
      placeholder:null,
      dob:null,
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