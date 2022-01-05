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

     <div class="md-layout">
        
        <div class="md-layout-item">
          <h1 class="md-title" style="margin:19px">Task Report</h1>
          <md-table v-model="searched" md-card md-fixed-header>
            <md-table-toolbar>
             <div class="md-toolbar-section-start">
               <div class="md-layout-item" >
                <div class="block">
                  <md-datepicker v-model="startDate" @input="searchOnDate">
                    <label>Start Date</label>
                  </md-datepicker> 
                </div>
              </div>
              <div class="md-layout-item" style="margin:19px">
                <div class="block">
                  <md-datepicker v-model="endDate" @input="searchOnDate">
                    <label>End Date</label>
                  </md-datepicker> 
               </div>
               </div>
               <div class="md-layout-item" >
                <md-field>
                    <md-select v-model="searchName" placeholder="Team Member"  @input="searchOnName" >
                    
                    <md-option v-for="option in users" :value="option.id" v-bind:key="option.id"  >{{option.user}}</md-option>
                  </md-select>
                </md-field>
              </div>
              <div style="margin-left:19px">  
               <md-field md-clearable class="md-toolbar-section-end"  >
               <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" @click="searchOnDate" />
                </md-field>
              </div>
             </div>
            </md-table-toolbar>
          
          </md-table>
          
          <md-table v-model="searched" md-card md-fixed-header>
          <md-table-row slot="md-table-row" slot-scope="{ item }" >
          <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Task Name" width="300px" md-sort-by="taskName">{{ item.taskName }}</md-table-cell>
           <md-table-cell md-label="Completed On" width="400px" md-sort-by="tocompleteon">{{ item.tocompleteon }}</md-table-cell>
          <md-table-cell md-label="Team Member" width="200px" md-sort-by="user">{{ item.user }}</md-table-cell>
          <md-table-cell md-label="Feedback" width="200px" md-sort-by="feedback">{{ item.Feedback }}</md-table-cell>
         
        </md-table-row>
          </md-table>
          
        </div>
        
        <div class="md-layout-item md-size-30"></div>
      </div>
      
   </div> 
</template>
<script>

const ipcRenderer = require("electron").ipcRenderer;

const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {

    if (term) {
      return items.filter(item => toLower(item.taskName).includes(toLower(term)) 
      || ( item.user && toLower(item.user).includes(toLower(term)))
      ||( item.tocompleteon &&  toLower(item.tocompleteon).includes(toLower(term))))
    }

    return items
  }
 const searchByDate = (items,dateStart,dateEnd) =>{
        return items.filter(item =>{
          const itemDate = new Date(item.tocompleteon)
          const date1 = new Date(dateStart)
          const date2 = new Date(dateEnd)
          if(date1 && date2== 'Invalid Date'){
            return date1 <= itemDate 
          }
          if(date1== 'Invalid Date' && date2){
            return itemDate <= date2
          }
          if (date1 && date2){
            return date1 <= itemDate && itemDate <= date2;
          } 
        })
      }
      const searchByUserName =(items,userName)=>{
       return items.filter(item =>{
         const name = item.userId
         if(userName){
           return name === userName
         }
         
       })
      }
export default {
    name:'TaskReport',
    data:()=>({
        search: null,
        showNavigation :false,
        users: [{id: 0, user: ''}],
        tasks: [{ taskName: '',tocompleteon:'',user:''}],
        startDate:'',
        endDate:'', 
        searched: [],
        userName:'',
        searchName:null
    }),
    methods: {
      searchOnTable () {
        this.searched = searchByName(this.tasks, this.search)
      },
      searchOnName(){
        this.searched = searchByUserName(this.tasks, this.searchName )
      },
      
       searchOnDate(){
       this.searched = searchByDate(this.tasks, this.startDate, this.endDate)
       }
      },
     created () {
      this.searched = this.tasks 
      let filterOld= {showNew: false, showInProgress: false, showComplete: true}
      ipcRenderer.send('tasks:get', filterOld)
      let filter={
        showActive: true,
        inActiveStatus: false
      }
      ipcRenderer.send('users:get',filter)
    },
    mounted(){ 
         ipcRenderer.on('tasks:success', (e, data) => {
         this.tasks = data
         this.searched= data
         if(this.endDate){
           this.searchOnDate()
         }
         if(this.search){
           this.searchOnTable()
        }
      })
      ipcRenderer.on('users:success', (e, data) => { 
         this.users = data
     })
     }    
}
</script>


