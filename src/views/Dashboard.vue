<template>  
  <div class="md-layout">   
    <div class="md-layout-item md-size-5"></div>    
    <div class="md-layout-item">      
      <md-table v-model="tasksNew" md-card md-fixed-header md-sort="createddate" md-sort-order="desc">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Tasks Assigned</h1>
          </div>          
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" md-sort-by="taskName">
            {{ item.taskName }}
            <md-tooltip md-direction="bottom">
              Created on: {{item.createddate.toDateString()}} &nbsp;&nbsp;
              <!-- Project: {{item.tocompleteon.toDateString()}} &nbsp;&nbsp;
              Completed on: {{item.completedon.toDateString()}} -->
            </md-tooltip>
          </md-table-cell>
          <md-table-cell>
            <md-menu md-size="small">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon md-menu-trigger>keyboard_arrow_down</md-icon>
              </md-button>              
              <md-menu-content>
                <md-menu-item @click="moveToInProgress(item.id)">InProgress</md-menu-item>
                <md-menu-item @click="moveToComplete(item.id)">Complete</md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-table-cell>
        </md-table-row>
      </md-table>

      <md-table v-model="tasksInProgress" md-card md-fixed-header md-sort="createddate" md-sort-order="desc">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Tasks In progress</h1>
          </div>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" md-sort-by="taskName">
            {{ item.taskName }}
            <md-tooltip md-direction="bottom">
              Started on: {{item.startedon && item.startedon.toDateString()}} &nbsp;&nbsp;
              Due on: {{item.tocompleteon && item.tocompleteon.toDateString()}}
            </md-tooltip>
          </md-table-cell>
          <md-table-cell>
            <md-menu md-size="small">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon md-menu-trigger>keyboard_arrow_down</md-icon>
              </md-button>              
              <md-menu-content>                
                <md-menu-item @click="moveToComplete(item.id)">Complete</md-menu-item>
                <md-menu-item @click="moveToNew(item.id)">New</md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-table-cell>
        </md-table-row>
      </md-table>   

      <md-table v-model="tasksCompleted" md-card md-fixed-header md-sort="createddate" md-sort-order="desc">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Tasks Completed</h1>
          </div>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" md-sort-by="taskName">
            {{ item.taskName }}
            <md-tooltip md-direction="bottom">
              Start on: {{item.startedon && item.startedon.toDateString()}} &nbsp;&nbsp;
              Due on: {{item.tocompleteon && item.tocompleteon.toDateString()}} &nbsp;&nbsp;
              Completed on: {{item.completedon && item.completedon.toDateString()}}
            </md-tooltip>
          </md-table-cell>
          <md-table-cell>            
            <md-menu md-size="small">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon md-menu-trigger>keyboard_arrow_down</md-icon>
              </md-button>              
              <md-menu-content>                
                <md-menu-item @click="moveToInProgress(item.id)">InProgress</md-menu-item>    
                <md-menu-item @click="moveToNew(item.id)">New</md-menu-item>            
              </md-menu-content>
            </md-menu>
          </md-table-cell>
         
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
      loadTasks(){
        ipcRenderer.send('tasks:getuserassigned', this.user.id)
        ipcRenderer.send('users:get')
        this.selectedUserId = this.user.id
      },
      loadUserDashboard(){
        ipcRenderer.send('tasks:getuserassigned', this.selectedUserId)
      },
      moveToInProgress(taskid){
        ipcRenderer.send('task:move', {id: taskid, status: 'InProgress'})
      },
      moveToNew(taskid){
        ipcRenderer.send('task:move', {id: taskid, status: 'New'})
      },
      moveToComplete(taskid){
        ipcRenderer.send('task:move', {id: taskid, status: 'Complete'})
      },
      getTaskHealth(){
        // return color - gree, orange, red based on if task was completed on time

      }
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

      ipcRenderer.on('task:movesuccess', () => {
        this.loadTasks()
      })

    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    created () {      
      this.loadTasks()
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
