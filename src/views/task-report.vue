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
        <h1 class="md-title" style="margin: 19px">Task Report</h1>
        <md-table v-model="searched" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <div class="md-layout-item">
                <div class="block">
                  <md-datepicker v-model="startDate" @input="searchOnDate">
                    <label>Start Date</label>
                  </md-datepicker>
                </div>
              </div>
              <div class="md-layout-item" style="margin: 19px">
                <div class="block">
                  <md-datepicker v-model="endDate" @input="searchOnDate">
                    <label>End Date</label>
                  </md-datepicker>
                </div>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <md-select
                    v-model="searchName"
                    placeholder="Team Member"
                  >
                    <md-option
                      v-for="option in users"
                      :value="option.id"
                      v-bind:key="option.id"
                      >{{ option.user }}</md-option
                    >
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item" style="margin-left: 19px">
                <md-field>
                  <md-select
                    v-model="searchpro"
                    placeholder="Projects"
                  >
                    <md-option
                      v-for="option in projects"
                      :value="option.id"
                      v-bind:key="option.id"
                      >{{ option.projectname }}</md-option
                    >
                  </md-select>
                </md-field>
              </div>
              <div style="margin-left: 19px">
                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Search by name..." v-model="search" />
                </md-field>
              </div>
              <md-button class="md-default md-raised" @click="searchAll"
                >Search</md-button
              >
            </div>
          </md-table-toolbar>
        </md-table>

        <md-table
          v-model="searched"
          md-card
          md-fixed-header
          style="height: 350px; max-height: 350px"
        >
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
            <md-table-cell
              md-label="Task Name"
              width="400px"
              md-sort-by="taskName"
              >{{ item.taskName }}</md-table-cell
            >
            <md-table-cell
              md-label="Completed On"
              width="400px"
              md-sort-by="tocompleteon"
              >{{ item.tocompleteon }}</md-table-cell
            >
            <md-table-cell
              md-label="Team Member"
              width="300px"
              md-sort-by="user"
              >{{ item.user }}</md-table-cell
            >
            <md-table-cell
              md-label="Feedback"
              width="300px"
              md-sort-by="feedback"
              >{{ item.Feedback }}</md-table-cell
            >
          </md-table-row>
        </md-table>
      </div>

      <div class="md-layout-item md-size-30"></div>
    </div>
  </div>
</template>
<script>
const ipcRenderer = require("electron").ipcRenderer;

const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(
      (item) =>
        toLower(item.taskName).includes(toLower(term)) ||
        (item.user && toLower(item.user).includes(toLower(term))) ||
        (item.tocompleteon &&
          toLower(item.tocompleteon).includes(toLower(term)))
    );
  }

  return items;
};
const searchByDate = (items, dateStart, dateEnd) => {
  return items.filter((item) => {
    const itemDate = new Date(item.tocompleteon);
    const date1 = new Date(dateStart);
    const date2 = new Date(dateEnd);
    if (date1 && date2 == "Invalid Date") {
      return date1 <= itemDate;
    }
    if (date1 == "Invalid Date" && date2) {
      return itemDate <= date2;
    }
    if (date1 && date2) {
      return date1 <= itemDate && itemDate <= date2;
    }
  });
};
 const searchByUserName = (items, userName,dateStart,dateEnd) => {
   return items.filter((item) => {
      const itemDate = new Date(item.tocompleteon);
      const date1 = new Date(dateStart);
      const date2 = new Date(dateEnd);
     const name = item.userId;
    if(name === userName){
            if(date1== 'Invalid Date' && date2== 'Invalid Date'){
               return name===userName
           }
            if(date1 && date2== 'Invalid Date'){
            return date1 <= itemDate 
          }
          if(date1== 'Invalid Date' && date2){
            return itemDate <= date2
         }
         if (date1 && date2){
            return date1 <= itemDate && itemDate <= date2;
          } 
         }
         
   });
 };

const searchByProName = (items, proName,dateStart,dateEnd) => {
  return items.filter((item) => {
     const itemDate = new Date(item.tocompleteon);
      const date1 = new Date(dateStart);
      const date2 = new Date(dateEnd);
    const name = item.projectId;
    if (name === proName) {
       if(date1== 'Invalid Date' && date2== 'Invalid Date'){
               return name===proName
           }
       if(date1 && date2== 'Invalid Date'){
            return date1 <= itemDate 
          }
          if(date1== 'Invalid Date' && date2){
            return itemDate <= date2
         }
         if (date1 && date2){
            return date1 <= itemDate && itemDate <= date2;
          } 
      
    }
  });
};
export default {
  name: "TaskReport",
  data: () => ({
    search: null,
    showNavigation: false,
    users: [{ id: 0, user: "" }],
    tasks: [],
    startDate: "",
    endDate: "",
    searched: [],
    userName: "",
    searchName: null,
    projects: [{ id: 0, projectname: "" }],
    searchByUserData:[]
  }),
  methods: {
    searchAll() {
      var data = this.tasks
      var value = this.searchOnTable(data);
      var valueChange = this.searchOnName(value);
         if(this.searchByUserData){
          var valuePro =this.searchByproject(this.searchByUserData); 
         }
         else{
            valuePro =this.searchByproject(valueChange);
         }
       if(this.search){
            this.searched = value;
          }
           if(this.searchName){
              this.searched = valueChange;
          }
          if(this.searchpro){
            this.searched = valuePro
           }
    },
    searchOnTable(data) {
      if(this.search){
        var searchByNameData = searchByName(data, this.search);
      return searchByNameData
      }
      else{
        searchByNameData = searchByName(this.tasks, this.search);
      return searchByNameData
      }
      
      
    },
    searchOnName(data) {
      if(this.searchpro){
         this.searchByUserData  = searchByUserName(data,this.searchName, this.startDate, this.endDate);
         this.searchByproject(this.searchByUserData);
       
      }else{
      this.searchByUserData  = searchByUserName(data,this.searchName, this.startDate, this.endDate);
      return this.searchByUserData  
      }
       
    },

    searchOnDate() {
      if(this.startDate){
        this.searched = searchByDate(this.searched, this.startDate, this.endDate);
      }
     else{
       this.searched = searchByDate(this.tasks, this.startDate, this.endDate);
     }
     
    },
    searchByproject(data) {
      if(data.length>0){
       var searchByUserPro = searchByProName(data, this.searchpro, this.startDate, this.endDate);
      return searchByUserPro 
      }
      else{
      searchByUserPro = searchByProName(this.searched, this.searchpro, this.startDate, this.endDate);
      return searchByUserPro 
      }   
    },
     loadTasks(){
        let filter = {showNew: false, showInProgress: false, showComplete: true}
        ipcRenderer.send('tasks:get', filter)}
  },
  created() {
    this.searched = this.tasks;
    this.loadTasks()
    
    //ipcRenderer.send("tasks:get", filterOld);
    let filter = {
      showActive: true,
      inActiveStatus: false,
    };
    ipcRenderer.send("users:get", filter);
    ipcRenderer.send("projects:get");
  },
  mounted() {
    ipcRenderer.on("tasks:success", (e, data) => {
      this.tasks = data;
      this.searched = data;

      if (this.endDate) {
        this.searchOnDate();
      }
      if (this.search) {
        this.searchOnTable();
      }
    });
    ipcRenderer.on("users:success", (e, data) => {
      this.users = data;
      
    });
    ipcRenderer.on("projects:success", (e, data) => {
      this.projects = data;
      
    });
  },
};
</script>

<style lang="less">
html,
body {
  overflow: hidden;
}

.md-layout.md-alignment-top-right {
  margin-left: 85px;
  margin-right: 50px;
}
element.style {
  max-height: 200px;
}
</style>

