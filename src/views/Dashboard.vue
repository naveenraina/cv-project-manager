<template>  
  <div class="md-layout">   
    <div class="md-layout-item md-size-5"></div>    
    <div class="md-layout-item">      
      <md-table v-model="tasksNew" md-card md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Tasks Assigned</h1>
          </div>          
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.taskName }}</md-table-cell>
        </md-table-row>
      </md-table>
      <md-table v-model="tasksInProgress" md-card md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Tasks In progress</h1>
          </div>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.taskName }}</md-table-cell>
        </md-table-row>
      </md-table>      
      <md-table v-model="tasksCompleted" md-card md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Tasks Completed</h1>
          </div>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" >{{ item.taskName }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div class="md-layout-item md-size-10 md-layout md-alignment-top-left">
      <md-field>
        <md-select v-model="selectedUserId" placeholder="User" @md-selected="loadUserDashboard">
          <md-option v-for="option in users" :value="option.id" v-bind:key="option.id" >{{option.user}}</md-option>
        </md-select>
      </md-field>
    </div>  
  </div>    
</template>

<script>
  
  const ipcRenderer = require('electron').ipcRenderer
  var blankTask = {
    id: 0,
    taskName: "",
    description: ""
  } 

  export default {
    name: 'dashboard',
    data: () => ({
      selectedUserId: 0,
      users: [{id: 0, user: ''}],
      tasksNew: [blankTask],
      tasksInProgress: [blankTask],
      tasksCompleted: [blankTask]
    }),
    methods: {
      loadUserDashboard(){
        ipcRenderer.send('tasks:getuserassigned', this.selectedUserId)
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    created () {      
      ipcRenderer.send('tasks:getuserassigned', this.user.id)
      ipcRenderer.send('users:get')
      this.selectedUserId = this.user.id
    },
    mounted(){        
        //Register IPC Renderer event handles once for this control
        ipcRenderer.on('tasks:userassignedsuccess', (e, data) => {          
          this.tasksNew = data.filter(x=> x.status === 'New')
          this.tasksInProgress = data.filter(x=> x.status === 'InProgress')
          this.tasksCompleted = data.filter(x=> x.status === 'Complete')
        })

        ipcRenderer.on('users:success', (e, data) => {
        this.users = data
      })
    }
  }
</script>

<style lang="less" scoped>
   
  .main-div{
    margin-top: 40px;
  }
  .md-table{
    width: 30%;
    display: inline-block;
  }

</style>
