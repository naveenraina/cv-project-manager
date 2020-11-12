<template>  
  <div>      
    <div class="md-layout-item">        
      <div class="md-layout" >
        <div class="md-layout-item md-size-33">
          <md-table v-model="tasksNew" md-card md-fixed-header md-sort="createddate" md-sort-order="desc" style="width:100%">
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
                  Created on: {{item.createddate && item.createddate.toDateString()}} &nbsp;&nbsp;
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
                    <md-menu-item @click="showEditDialog(item)">Edit</md-menu-item>
                    <md-menu-item @click="onLoadNotes(item)">Notes</md-menu-item>
                    <md-menu-item>                  
                      <md-menu md-direction="bottom-end" md-offset-x=280>
                        <div md-menu-trigger style="cursor:pointer">
                          Move To
                          <md-icon md-menu-trigger>keyboard_arrow_right</md-icon>
                        </div> 
                        <md-menu-content>
                          <md-menu-item @click="moveToInProgress(item)">InProgress</md-menu-item>
                          <md-menu-item @click="moveToComplete(item)">Complete</md-menu-item>
                        </md-menu-content>
                      </md-menu>
                    </md-menu-item> 
                    
                  </md-menu-content>
                </md-menu>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
        <div class="md-layout-item md-size-33">
          <md-table v-model="tasksInProgress" md-card md-fixed-header md-sort="createddate" md-sort-order="desc" style="width:100%">
            <md-table-toolbar>
              <div class="md-toolbar-section-start">
                <h1 class="md-title">Tasks In progress</h1>
              </div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }" :class="[true === true? '': 'task-delayed']">
              <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
              <md-table-cell md-label="Name" md-sort-by="taskName">
                {{ item.taskName }} 
                <div> 
                  <strong v-if="item.tocompleteon && item.startedOn">
                  {{ getDateDifInDays(item.tocompleteon, new Date() ) }} of {{ getDateDifInDays(item.tocompleteon, item.startedOn) }}
                  </strong>
                  <strong v-else>
                  (Due date missing)
                  </strong>
                  days left 
                </div>
                <md-tooltip md-direction="bottom">
                  Started on: {{item.startedOn && item.startedOn.toDateString()}} &nbsp;&nbsp;
                  Due on: {{item.tocompleteon && item.tocompleteon.toDateString()}}
                </md-tooltip>
              </md-table-cell>
              <md-table-cell md-label="Due on" md-sort-by="tocompleteon">{{ item.tocompleteon && item.tocompleteon.toDateString() }}</md-table-cell>
          
              <md-table-cell>
                <md-menu md-size="small">
                  <md-button class="md-icon-button" md-menu-trigger>
                    <md-icon md-menu-trigger>keyboard_arrow_down</md-icon>
                  </md-button>              
                  <md-menu-content>   
                    <md-menu-item @click="showEditDialog(item)">Edit</md-menu-item> 
                    <md-menu-item @click="onLoadNotes(item)">Notes</md-menu-item>
                    <md-menu-item>                  
                      <md-menu md-direction="bottom-end" md-offset-x=280>
                        <div md-menu-trigger style="cursor:pointer">
                          Move To
                          <md-icon md-menu-trigger>keyboard_arrow_right</md-icon>
                        </div> 
                        <md-menu-content>
                          <md-menu-item @click="moveToComplete(item)">Complete</md-menu-item>
                          <md-menu-item @click="moveToNew(item)">New</md-menu-item>
                        </md-menu-content>
                      </md-menu>
                    </md-menu-item>           
                    
                  </md-menu-content>
                </md-menu>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>  
        <div class="md-layout-item md-size-33">
          <md-table v-model="tasksCompleted" md-card md-fixed-header md-sort="createddate" md-sort-order="desc" style="width:100%">
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
                <md-menu>
                  <md-button class="md-icon-button" md-menu-trigger>
                    <md-icon md-menu-trigger>keyboard_arrow_down</md-icon>
                  </md-button>              
                  <md-menu-content>
                    <md-menu-item @click="showEditDialog(item)">Edit</md-menu-item>
                    <md-menu-item @click="onLoadNotes(item)">Notes</md-menu-item>
                    <md-menu-item>                  
                      <md-menu md-direction="bottom-end" md-offset-x=280>
                        <div md-menu-trigger style="cursor:pointer">
                          Move To
                          <md-icon md-menu-trigger>keyboard_arrow_right</md-icon>
                        </div> 
                        <md-menu-content>
                          <md-menu-item @click="moveToInProgress(item)">InProgress</md-menu-item>    
                          <md-menu-item @click="moveToNew(item)">New</md-menu-item>
                        </md-menu-content>
                      </md-menu>
                    </md-menu-item>
                    
                  </md-menu-content>  
                </md-menu>
              </md-table-cell>
            
            </md-table-row>
          </md-table>
        </div>      
      </div> 
      <div class="md-layout md-alignment-center-right" >
        <div class="md-layout-item"></div>
        <div class="md-layout-item md-layout md-alignment-center-right md-size-10">
          <md-field>
            <md-select v-model="selectedUserId" placeholder="User" @md-selected="loadUserDashboard">
              <md-option v-for="option in users" :value="option.id" v-bind:key="option.id" >{{option.user}}</md-option>
            </md-select>
          </md-field> 
        </div>        
      </div>
    </div>
   
    <md-dialog :md-active.sync="showDialog" md-close-on-esc>
      <md-dialog-title>Notes for ({{selectedTask.taskName}})</md-dialog-title>

      <div class="md-dialog-content md-layout" style="width:800px"> 
        
        <md-field >
          <label>Add Note</label>
          <md-textarea md-autogrow v-model="noteText"></md-textarea>
          <md-button class="md-icon-button" @click="addNote">
            <md-icon>send</md-icon>
          </md-button>
        </md-field>
        
        <md-list class="md-triple-line" style="padding-top:20px;width:100%">
          <template v-for="note in notes">
            <md-list-item :key="note.id">
              <md-avatar :title="note.user">
                {{note.user && note.user.substr(0,1).toUpperCase()}}
              </md-avatar>

              <div class="md-list-item-text">
                <span></span>
                <span style="color:rgba(0,0,0,0.55)">{{note.createddate.toDateString()}} {{note.createddate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}}</span>
                <p style="padding-top:10px;white-space:pre-wrap;color:rgba(0,0,0,0.75)">{{note.description}}</p>
              </div>
              <md-button v-if="note.userid === user.id" class="md-icon-button md-list-action" @click="deleteNote(note.id)">
                <md-icon class="">delete</md-icon>
              </md-button>
            </md-list-item>

            <md-divider class="md-inset" :key="'divider_' + note.id"></md-divider>
          </template>
        </md-list>
        <div v-if="notes.length === 0" style="color:grey"><span> No notes found </span></div>
      </div>

      <md-dialog-actions style="">        
        <md-button class="md-primary" @click="showDialog = false">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>


    <md-dialog :md-active.sync="showDialogEdit" md-close-on-esc>
      <md-dialog-title>Edit ({{selectedTask.taskName}})</md-dialog-title>

      <div class="md-dialog-content md-layout">      
          <div class="md-layout-item" style="width:600px">
            <md-field>
              <label>Task name</label>
              <md-input v-model="selectedTask.taskName"></md-input>
            </md-field>

            <md-field>
              <label>Description</label>
              <md-textarea v-model="selectedTask.description"></md-textarea>
            </md-field>

            <div class="md-layout">
              <md-field class="md-layout-item" style="margin-right:30px">
                <label>Estimate (Days)</label>
                <md-input v-model="selectedTask.estimateddays" type="number"></md-input>
              </md-field>
              <div class="md-layout-item">
                <div class="block">
                  <div>Complete by</div>
                  <md-datepicker v-model="selectedTask.tocompleteon" md-immediately/>
                </div>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item" style="padding-right:30px">
                <md-field>
                  <md-select v-model="selectedTask.priority" placeholder="Priority">
                    <md-option value="Low">Low</md-option>
                    <md-option value="Medium">Medium</md-option>
                    <md-option value="High">High</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item" style="margin-right:30px">
                <md-field>
                  <md-select v-model="selectedTask.userId" placeholder="Assigned to">
                    <md-option v-for="option in users" :value="option.id" v-bind:key="option.id">{{option.user}}</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <md-select v-model="selectedTask.projectId" placeholder="Project">
                    <md-option v-for="option in projects" :value="option.id" v-bind:key="option.id">{{option.projectname}}</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            
            
          </div>
        </div>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogEdit=false">Cancel</md-button>
          <md-button class="md-primary" @click="saveTask">Save</md-button>
        </md-dialog-actions>
    </md-dialog>

  </div>    
</template>

<script>
  const fetch = require('node-fetch')
  const config = require('@/config')
  const ipcRenderer = require('electron').ipcRenderer
  var blankTask = {
    id: 0,
    taskName: "",
    description: ""
  } 
  let blankNote = {
    id: 0,
    description: null,
    taskid: 0,
    userid: 0,
    user: null,
    createddate: new Date()
  }
  export default {
    name: 'dashboard',
    data: () => ({
      disableDescription: true,
      noteText: "",
      notes: [blankNote],
      showDialog: false,
      showDialogEdit: false,
      selectedUserId: 0,
      users: [{id: 0, user: ''}],
      tasksNew: [blankTask],
      tasksInProgress: [blankTask],
      tasksCompleted: [blankTask],
      selectedTask: {},
      projects: [{id: 0, projectname: ''}],
      loadNotesAgain: false
    }),
    methods: {
      getDateDifInDays(dt2, dt1){
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24))
      },
      saveTask(){
        ipcRenderer.send('task:submit', this.selectedTask)
        this.showDialogEdit = false
        // log note if vital fields are changes
        var originallist = []
        switch(this.selectedTask.status){
          case "New":
            originallist = this.tasksNew
            break
          case "InProgress":
            originallist = this.tasksInProgress
            break
          case "Complete":
            originallist = this.tasksCompleted
            break
        }
        var original = originallist.find(x => x.id === this.selectedTask.id)
        
        if(this.selectedTask.estimateddays !== original.estimateddays) {
          let message = this.user.user + ' changed estimate from ' + original.estimateddays + ' to ' + this.selectedTask.estimateddays
          this.addNoteForTask(this.selectedTask, message)
        }
        if(this.selectedTask.tocompleteon.toLocaleDateString() !== original.tocompleteon.toLocaleDateString()) {
          let tocompleteon = original.tocompleteon ? original.tocompleteon.toDateString() : 'BLANK'
          let message = this.user.user + ' changed due date from ' + tocompleteon + ' to ' + this.selectedTask.tocompleteon.toDateString()
          this.addNoteForTask(this.selectedTask, message)
        }

      },
      showEditDialog(task){
        this.selectedTask = { ...task }
        this.showDialogEdit=true
      },
      updateTask(){

      },
      onLoadNotes(task){
        this.selectedTask = { ...task }
        this.loadNotes(task.id)
      },
      deleteNote(noteid){
        ipcRenderer.send('note:delete', noteid)
      },
      addNote(){
       let newNote = {...blankNote}
       newNote.description = this.noteText
       newNote.userid = this.user.id
       newNote.taskid = this.selectedTask.id
       newNote.createddate = new Date()
       this.loadNotesAgain = true
       ipcRenderer.send('note:save', newNote)
      },
      addNoteForTask(task, message){
       let newNote = {...blankNote}
       newNote.description = message
       newNote.userid = 11 // 11 - System
       newNote.taskid = task.id
       newNote.createddate = new Date()
       ipcRenderer.send('note:save', newNote)
      },
      loadNotes(taskId){
        ipcRenderer.send('notes:get', taskId)
      },
      loadTasks(userId){
        ipcRenderer.send('tasks:getuserassigned', userId)        
      },
      loadUserDashboard(){
        ipcRenderer.send('tasks:getuserassigned', this.selectedUserId)
      },
      moveToInProgress(task){
        ipcRenderer.send('task:move', {id: task.id, status: 'InProgress'})
        var message = this.formMessage(task.taskName, task.status, 'InProgress')
        this.notifySlack(message)
        this.addNoteForTask(task, message)
      },
      moveToNew(task){
        ipcRenderer.send('task:move', {id: task.id, status: 'New'})
        var message = this.formMessage(task.taskName, task.status, 'New')
        this.notifySlack(message)
        this.addNoteForTask(task, message)
      },
      moveToComplete(task){
        ipcRenderer.send('task:move', {id: task.id, status: 'Complete'})
        var message = this.formMessage(task.taskName, task.status, 'Complete')
        this.notifySlack(message)
        this.addNoteForTask(task, message)
      },
      getTaskHealth(){
        // return color - gree, orange, red based on if task was completed on time

      },
      formMessage(name, from, to){
        return this.user.user + ' moved task "' + name + '" from ' + from + ' to ' + to
      }, 
      notifySlack(message){
        console.log(message)
        fetch('https://slack.com/api/chat.postMessage', {
          method: 'post',
          body: JSON.stringify({
            "channel": "CGZNB2XRA", //"CGZNB2XRA" daily-status //"C9Z21JH9D" - random
            "text": message                 
          }),
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.default.slackToken
          }
        })
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
        this.loadTasks(this.selectedUserId)
      })

      ipcRenderer.on('notes:getsuccess', (e, data) => {
        this.notes = data
        this.showDialog = true
      })

      ipcRenderer.on('note:savesuccess', () => {
        if(this.loadNotesAgain){
          this.loadNotes(this.selectedTask.id)
          this.loadNotesAgain = false
        }        
        this.noteText = ""        
      })

      ipcRenderer.on('note:deletesuccess', () => {
        this.loadNotes(this.selectedTask.id)
      })

      ipcRenderer.on('projects:success', (e, data) => {
        this.projects = data
      })

      ipcRenderer.on('task:submitsuccess', () => {        
        this.statusMessage = 'Task saved successfully'
        this.showSnackbar = true
        this.loadTasks(this.selectedUserId)
      })

    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    created () {
      ipcRenderer.send('projects:get')
      ipcRenderer.send('users:get')
      this.selectedUserId = this.user.id
      this.loadTasks(this.selectedUserId)
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
  .task-delayed{
    background-color: red;
  }

</style>
