<template>  
  <div class="md-layout">   
    <div class="md-layout-item md-size-10"></div>    
    <div class="md-layout-item">
      <md-table v-model="searched" md-card md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Task Backlog</h1>
          </div>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No tasks found"
          :md-description="`No task found for this query.`">
          <md-button class="md-primary md-raised" @click="newTask">Create New Task</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.TaskName }}</md-table-cell>
        </md-table-row>
      </md-table>
      
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
      return items.filter(item => toLower(item.TaskName).includes(toLower(term)))
    }

    return items
  }

  export default {
    name: 'dashboard',
    data: () => ({
      search: null,
      searched: [],
      tasks: [{ TaskName: ''}]
    }),
    methods: {
      ...mapMutations([
        'setUser',
      ]),
      login(){            
          ipcRenderer.send('login:submit', {username: this.username, password: this.password})
      },
      newTask () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.searched = searchByName(this.tasks, this.search)
      }
    },
    created () {
      this.searched = this.tasks 
      ipcRenderer.send('tasks:get')

    },
    mounted(){        
        //Register IPC Renderer event handles once for this control
        ipcRenderer.on('tasks:success', (e, data) => {
          this.tasks = data
          this.searched = data
        })
    }
  }
</script>

<style lang="less" scoped>
  .md-field:last-child {
    margin-bottom: 40px;
  }  
  .main-div{
    margin-top: 40px;
  }
  
</style>
