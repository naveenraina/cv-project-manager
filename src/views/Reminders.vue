<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-default">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Admin</span>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Employee Profile</span>
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
   </div> 
</template>
<script>
export default {
    name:'Reminders',
    data:()=>({
        showNavigation :false
    })
        
    
}
</script>