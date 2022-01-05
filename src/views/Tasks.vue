<template>
  <div class="md-layout">
    <div class="md-layout-item md-alignment-top-left">
      <md-table v-model="searched" md-card md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Task Backlog</h1>
            <md-checkbox v-model="showNew" @change="loadTasks" class="md-primary">New</md-checkbox>
            <md-checkbox v-model="showInProgress" @change="loadTasks" class="md-primary">InProgress</md-checkbox>
            <md-checkbox v-model="showComplete" @change="loadTasks" class="md-primary">Complete</md-checkbox>
          </div>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No tasks found"
          :md-description="`No task found for this query.`">
          <md-button class="md-primary md-raised" @click="onCreateTask">Create New Task</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" width="300px" md-sort-by="taskName">{{ item.taskName }}</md-table-cell>
          <md-table-cell md-label="Assigned to" width="200px" md-sort-by="user">{{ item.user }}</md-table-cell>
          <md-table-cell md-label="Project" width="200px" md-sort-by="projectName">{{ item.projectName }}</md-table-cell>
          <md-table-cell md-label="Status" width="200px" md-sort-by="status">{{ item.status }}</md-table-cell>
          <md-table-cell md-label="Feedback" width="200px" md-sort-by="feedback">{{ item.Feedback }}</md-table-cell>
          <md-table-cell md-label="">

              <md-chip md-clickable @click="onedit(item.id)"><md-icon>edit</md-icon></md-chip>
              <md-chip md-clickable @click="ondelete(item.id)"><md-icon class="md-size-1x">delete</md-icon></md-chip>

          </md-table-cell>

        </md-table-row>
      </md-table>
      <md-button class="md-default md-raised" @click="onCreateTask">Create New Task</md-button>

      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Task</md-dialog-title>

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
          <md-button class="md-primary" @click="cancelDialog">Cancel</md-button>
          <md-button class="md-primary" @click="saveTask">Save</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog-confirm
      :md-active.sync="showDialogDeleteConfirmaton"
      md-title="Are you sure"
      md-content="This will permanently delete this item"
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-confirm="deleteTask" />

      <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
        <span>{{statusMessage}}</span>
      </md-snackbar>
    </div>
  </div>
</template>

<script>

  const ipcRenderer = require('electron').ipcRenderer
  const fetch = require('node-fetch')
  const config = require('@/config')
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {

    if (term) {
      return items.filter(item => toLower(item.taskName).includes(toLower(term))
      || ( item.user && toLower(item.user).includes(toLower(term)))
      ||( item.projectName &&  toLower(item.projectName).includes(toLower(term))))
    }

    return items
  }

  export default {
    name: 'dashboard',
    data: () => ({
      showNew: true,
      showInProgress: true,
      showComplete: false,
      showDialogDeleteConfirmaton: false,
      showSnackbar: false,
      statusMessage: '',
      showDialog: false,
      search: null,
      searched: [],
      tasks: [{ taskName: ''}],
      projects: [{id: 0, projectname: ''}],
      users: [{id: 0, user: ''}],
      newTask: {
        id: 0,
        taskName: '',
        description: '',
        createdDate: new Date(),
        updatedDate: new Date(),
        status: 'New',
        estimateddays: 1,
        userId: 0,
        projectId: 0,
        priority: ''
      },
      selectedTask: {}
    }),
    methods: {
      searchOnTable () {
        this.searched = searchByName(this.tasks, this.search)
      },
      onCreateTask(){
        this.selectedTask = {...this.newTask}
        this.showDialog = true
      },
      saveTask(){
        ipcRenderer.send('task:submit', this.selectedTask)
        this.showDialog = false
        // if(this.selectedTask.id === 0) {
        //   let project = this.projects.find(x=>x.id === this.selectedTask.projectId)?.projectname
        //   this.notifySlack(this.selectedTask.taskName, project)
        // }
      },
      onedit(id){
        var found = this.tasks.find(item => item.id === id)
        this.selectedTask = found
        this.showDialog = true;
      },
      ondelete(id){
        var found = this.tasks.find(item => item.id === id)
        this.selectedTask = found
        this.showDialogDeleteConfirmaton = true;
      },
      deleteTask(){
        ipcRenderer.send('task:delete', {id: this.selectedTask.id})
      },
      loadTasks(){
        let filter = {showNew: this.showNew, showInProgress: this.showInProgress, showComplete: this.showComplete}
        ipcRenderer.send('tasks:get', filter)
      },
      cancelDialog(){
        this.selectedTask = {...this.newTask}
        this.showDialog = false

      },
      notifySlack(name, project){
        fetch('https://slack.com/api/chat.postMessage', {
          method: 'post',
          body: JSON.stringify({
            "channel": "CGZNB2XRA", //daily-status //"C9Z21JH9D" - random
            "text": this.user.user + ' created a new task "' + name + '" for "' + project + '"'
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.default.slackToken
          }
        })
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    created () {
      let filter = {
        showActive: true,
        inActiveStatus: false,
      };
      this.searched = this.tasks
      this.loadTasks()
      ipcRenderer.send('projects:get', filter)
      ipcRenderer.send('users:get',filter)
    },
    mounted(){
      //Register IPC Renderer event handles once for this control
      ipcRenderer.on('tasks:success', (e, data) => {
        this.tasks = data
        this.searched = data
        if(this.search){
          this.searchOnTable()
        }
      })
      ipcRenderer.on('projects:success', (e, data) => {
        this.projects = data
      })
      ipcRenderer.on('users:success', (e, data) => {
        this.users = data
      })
      ipcRenderer.on('task:submitsuccess', () => {
        this.statusMessage = 'Task saved successfully'
        this.showSnackbar = true
        this.loadTasks()
      })
      ipcRenderer.on('task:deletesuccess', () => {
          this.statusMessage = 'Task removed successfully'
          this.showSnackbar = true
          this.loadTasks()
        })
    }
  }
</script>

<style lang="less" scoped>

  .main-div{
    margin-top: 40px;
  }
  .md-chip{
    background-color: rgba(0,0,0,0) !important;
  }

</style>
