<template>  
  <div class="md-layout">   
    <div class="md-layout-item md-size-10"></div>    
    <div class="md-layout-item">
      <md-table v-model="searched" md-card md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Projects</h1>
          </div>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No projects found"
          :md-description="`No project found for this query.`">
          <md-button class="md-primary md-raised" @click="showDialog = true">Create New Project</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" md-sort-by="name">
            <div class="md-layout md-alignment-center-left">
              <div class="md-layout-item pull-right">{{ item.projectname }}</div> 
              <div class="md-layout-item md-size-20" style="float:right">
                <md-chip md-clickable @click="onedit(item.id)"><md-icon>edit</md-icon></md-chip>
               <md-chip md-clickable @click="ondelete(item.id)"><md-icon class="md-size-1x">delete</md-icon></md-chip>
              </div>               
            </div>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <md-button class="md-default md-raised" @click="showDialog = true">Create New Project</md-button>

      <md-dialog-prompt
      :md-active.sync="showDialog"
      v-model="newProjectName"
      md-title="Project Name"
      md-input-maxlength="45"
      md-input-placeholder=""
      md-confirm-text="Done" 
      @md-confirm="createProject"/>

      <md-dialog-prompt
      md-dialog-prompt
      :md-active.sync="showDialogEdit"
      v-model="editProjectName"
      md-title="Edit Project"
      md-input-maxlength="45"
      md-input-placeholder=""
      md-confirm-text="Done" 
      @md-confirm="editProject"/>

      <md-dialog-confirm
      :md-active.sync="showDialogDeleteConfirmaton"
      md-title="Are you sure"
      md-content="This will permanently delete this item"
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-confirm="deleteProject" />

      <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
        <span>{{statusMessage}}</span>
      </md-snackbar>
    </div>
    <div class="md-layout-item md-size-10"></div>  
  </div>    
</template>

<script>
  
  const ipcRenderer = require('electron').ipcRenderer
  import { mapMutations } from 'vuex'

  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.projectname).includes(toLower(term)))
    }

    return items
  }

  export default {
    name: 'dashboard',
    data: () => ({
      statusMessage: '',
      showDialogDeleteConfirmaton: false,
      showDialogEdit: false,
      showSnackbar: false,
      newProjectName: '',
      editProjectName: '',
      selectedId: 0,
      showDialog: false,
      search: null,
      searched: [],
      projects: [{projectname: ''}]
    }),
    methods: {
      ...mapMutations([
        'setUser',
      ]),
      createProject () {
        ipcRenderer.send('project:new', {name: this.newProjectName})
      },
      searchOnTable () {
        this.searched = searchByName(this.projects, this.search)
      },
      onedit(id){
        this.selectedId = id
        var found = this.projects.find(item => item.id === id)
        this.editProjectName = found?.projectname
        this.showDialogEdit = true;
      },
      editProject(){
        ipcRenderer.send('project:edit', {name: this.editProjectName, id: this.selectedId})
      },
      ondelete(id){
        this.selectedId = id
        var found = this.projects.find(item => item.id === id)
        this.editProjectName = found?.projectname
        this.showDialogDeleteConfirmaton = true;
      },
      deleteProject(){
        ipcRenderer.send('project:delete', {id: this.selectedId})
      }
    },
    created () {
      this.searched = this.projects
      ipcRenderer.send('projects:get')
    },
    mounted(){        
        //Register IPC Renderer event handles once for this control
        ipcRenderer.on('projects:success', (e, data) => {
          this.projects = data
          this.searched = data
        })
        ipcRenderer.on('project:newsuccess', () => {
          this.statusMessage = 'Project saved successfully'
          this.showSnackbar = true
          ipcRenderer.send('projects:get')
        })
        ipcRenderer.on('project:editsuccess', () => {
          this.statusMessage = 'Project saved successfully'
          this.showSnackbar = true
          ipcRenderer.send('projects:get')
        })
        ipcRenderer.on('project:deletesuccess', () => {
          this.statusMessage = 'Project removed successfully'
          this.showSnackbar = true
          ipcRenderer.send('projects:get')
        })
    }
  }
</script>

<style lang="less" scoped>
  
  .main-div{
    margin-top: 40px;
  }
  
</style>
