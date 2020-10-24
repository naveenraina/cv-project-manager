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
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.projectname }}</md-table-cell>
        </md-table-row>
      </md-table>
      <md-button class="md-default md-raised" @click="showDialog = true">Create New Project</md-button>

      <md-dialog-prompt
      :md-active.sync="showDialog"
      v-model="newProjectname"
      md-title="Project name"
      md-input-maxlength="45"
      md-input-placeholder=""
      md-confirm-text="Done" 
      @md-confirm="createProject"/>

      <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
        <span>Project saved successfully</span>
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
      showSnackbar: false,
      newProjectname: '',
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
        ipcRenderer.send('project:new', {name: this.newProjectname})
      },
      searchOnTable () {
        this.searched = searchByName(this.projects, this.search)
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
