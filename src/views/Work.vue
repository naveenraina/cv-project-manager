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
         <h3>Work-Information</h3>
         <md-divider></md-divider>
       </md-card-header>
       <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Employee Name</label>
            <md-input v-model="user.ename"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Employee ID</label>
            <md-input v-model="user.eid"></md-input>
          </md-field>
        </div>
        </div>
     <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Employee Title</label>
            <md-input v-model="user.title"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Department</label>
            <md-input v-model="user.department"></md-input>
          </md-field>
        </div>
        </div>
    <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Official contact number</label>
            <md-input v-model="user.contact"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Officail E-mail Id</label>
            <md-input v-model="user.email"></md-input>
          </md-field>
        </div>
        </div>
    <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Employee Skype Id</label>
            <md-input v-model="user.skype"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 ">
      <md-field>
            <label>Upwork Id</label>
            <md-input v-model="user.upwork"></md-input>
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
        ename:'',
        eid:'',
        title:'',
        department:'',
        skype:'',
        upwork:'',
        contact:'',
        email:'',
      },
      showNavigation: false,
      showSidepanel: false,
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