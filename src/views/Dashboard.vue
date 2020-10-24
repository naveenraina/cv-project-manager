<template>  
  <div class="md-layout">   
    <div class="md-layout-item md-size-10"></div>    
    <div class="md-layout-item">
      <md-table v-model="searched" md-card md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Tasks Assigned</h1>
          </div>
          <!-- <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field> -->
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No users found"
          :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
          <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        </md-table-row>
      </md-table>
      <md-table v-model="searched" md-card md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Tasks In progress</h1>
          </div>
          <!-- <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field> -->
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No users found"
          :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
          <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        </md-table-row>
      </md-table>      
      <md-table v-model="searched" md-card md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Tasks Completed</h1>
          </div>
          <!-- <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field> -->
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No users found"
          :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
          <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Name" >{{ item.name }}</md-table-cell>
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
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }

  export default {
    name: 'dashboard',
    data: () => ({
      search: null,
      searched: [],
      users: [
        {
          id: 1,
          name: "Shawna Dubbin",
          email: "sdubbin0@geocities.com",
          gender: "Male",
          title: "Assistant Media Planner"
        },
        {
          id: 2,
          name: "Odette Demageard",
          email: "odemageard1@spotify.com",
          gender: "Female",
          title: "Account Coordinator"
        },
        {
          id: 3,
          name: "Vera Taleworth",
          email: "vtaleworth2@google.ca",
          gender: "Male",
          title: "Community Outreach Specialist"
        },
        
      ]
    }),
    methods: {
      ...mapMutations([
        'setUser',
      ]),
      login(){            
          ipcRenderer.send('login:submit', {username: this.username, password: this.password})
      },
      newUser () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.searched = searchByName(this.users, this.search)
      }
    },
    created () {
      this.searched = this.users
    },
    mounted(){
        
        //Register IPC Renderer event handles once for this control
        ipcRenderer.on('login:success', (e, data) => {
            if(data === 'error'){
              this.showSnackbar = true;
            } else {
              this.setUser(data)
              this.$router.replace('/home')
            }        
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
  .md-card {
    width: 320px;
  }
  .md-table{
    width: 320px;
    display: inline-block;
  }

</style>
