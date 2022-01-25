<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-default">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Profile</span>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
  <md-toolbar class="md-transparent" md-elevation="0">
      <span class="md-title">Employee Profile</span>
  </md-toolbar>

<md-list>
  <md-list-item to="/profile">
    <md-icon>verified_user</md-icon>
      <span class="md-list-item-text">Basic Information</span>
    </md-list-item>

   <md-list-item to="/Work">
     <md-icon>verified_user</md-icon>
      <span class="md-list-item-text">Work Information</span>
    </md-list-item>

    <md-list-item to="/Education">
        <md-icon>verified_user</md-icon>
        <span class="md-list-item-text">Education</span>
    </md-list-item>

  </md-list>
</md-drawer>

    <md-content>
       <md-button
        class="md-primary md-dense md-raised md-default"
        style="margin-left:1095px; background:green"
       @click="addField()"
        >Add work Experience</md-button
      >
     <md-card v-for="(input, index) in workArray" :key="{ input }" :id="{index}">
       <md-card-header>
         <h3>Work-Information</h3>
           <md-button v-if="workArray.length > 1 && index !=0"  @click="deleteWork(input.ID, index)" style="margin-left:1095px; "> X</md-button>
       <md-divider></md-divider>
       </md-card-header>
       <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 "  style="margin-left:20px;">
      <md-field>
            <label>Employee ID</label>
            <md-input :value="input.EmployeeID"  @change="handleInputChange($event, 'EmployeeID', index)"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 "  style="margin-right:20px;">
      <md-field>
            <label>Employee Name</label>
            <md-input :value="input.EmployeeName"  @change="handleInputChange($event, 'EmployeeName', index)"></md-input>
          </md-field>
        </div>
        </div>
     <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 " style="margin-left:20px;">
      <md-field>
            <label>Employee Title</label>
            <md-input :value="input.EmployeeTitle"  @change="handleInputChange($event, 'EmployeeTitle', index)"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 "  style="margin-right:20px;">
      <md-field>
            <label>Department</label>
            <md-input :value="input.Department"  @change="handleInputChange($event, 'Department', index)"></md-input>
          </md-field>
        </div>
        </div>
    <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 "  style="margin-left:20px;">
      <md-field>
            <label>Official contact number</label>
            <md-input :value="input.ContactNo"  @change="handleInputChange($event, 'ContactNo', index)"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 "  style="margin-right:20px;">
      <md-field>
            <label>Officail E-mail Id</label>
            <md-input :value="input.EmailID"  @change="handleInputChange($event, 'EmailID', index)"></md-input>
          </md-field>
        </div>
        </div>
    <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-45 "  style="margin-left:20px;">
      <md-field>
            <label>Employee Skype Id</label>
            <md-input :value="input.SkypeeID"  @change="handleInputChange($event, 'SkypeeID', index)"></md-input>
          </md-field>
        </div>
    <div class="md-layout-item md-medium-size-45 "  style="margin-right:20px;">
      <md-field>
            <label>Upwork Id</label>
            <md-input :value="input.UpworkID"  @change="handleInputChange($event, 'UpworkID', index)"></md-input>
          </md-field>
        </div>
        </div>
        </md-card>
        <div class="md-layout md-gutter md-alignment-center">
        <md-button class=" md-primary md-dense md-raised md-default" @click="saveWork">Submit</md-button>
    </div>
     
    </md-content>
      <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
        <span>{{statusMessage}}</span>
      </md-snackbar>
      <md-dialog-confirm
      :md-active.sync="showDialogDeleteConfirmaton"
      md-title="Are you sure"
      md-content="This will permanently delete this item"
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-confirm="deleteWorks" />
      
  </div>
  
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer


export default {
    name: 'profile',
    data: () => ({
      newUser: {
        id: 0,
        eid: '',
        ename: '',
        title: '',
        department: '',
        contact: '',
        email: '',
        skype: '',
        upwork: '',
        userId: 0,
        },
      showSnackbar: false,
      statusMessage: '',
      showNavigation: false,
      showSidepanel: false,
      workArray:[],
      selectedWork:{},
      showDialogDeleteConfirmaton: false,
      indexdelete:""
    }),
    computed: {
    user () {
      return this.$store.state.user
    }
  },
    methods: {
       handleInputChange(event, label, index) {
      var myVal = event.target.value;
//var myVal = event.target.value;
      if (label == "EmployeeID") {
        this.workArray[index].EmployeeID = myVal;
      } else if (label == "EmployeeName") {
        this.workArray[index].EmployeeName = myVal;
        }else if (label == "EmployeeTitle") {
        this.workArray[index].EmployeeTitle = myVal;
        }else if (label == "Department") {
        this.workArray[index].Department = myVal;
        }else if (label == "ContactNo") {
        this.workArray[index].ContactNo = myVal;
        }else if (label == "EmailID") {
        this.workArray[index].EmailID = myVal;
        }else if (label == "SkypeeID") {
        this.workArray[index].SkypeeID = myVal;
        }else if (label == "UpworkID") {
        this.workArray[index].UpworkID = myVal;
        } else {
        console.log("no value");
      }
      if (!this.workArray[index].ID) {
        this.workArray[index].ID = "";
      }
      this.workArray[index].userId = this.$store.state.user.id;
      
      },
      
      saveWork(){
        ipcRenderer.send('work:submit', this.workArray)
      },
      addField() {
      this.workArray.push({});
      this.workArray = this.workArray.reverse()
    },
     deleteWork(id, index){
      if(id){
        var found = this.workArray.find(input => input.ID === id)
        this.selectedWork = found
        
         
      }
      this.indexdelete = index;
      this.showDialogDeleteConfirmaton = true;
     
    },
     deleteWorks(){
       this.workArray.splice(this.indexdelete, 1);
        ipcRenderer.send('work:delete', {id: this.selectedWork.ID})
      },
    },
    created(){
      var userId = this.$store.state.user.id;
   console.log(this.newUser.userId);
    ipcRenderer.send('work:get',userId)
  },
    mounted(){
      //Register IPC Renderer event handles once for this control
        ipcRenderer.on('work:submitsuccess', () => {
        this.statusMessage = 'Profile saved successfully'
        this.showSnackbar = true

      })
      const vm= this;
           ipcRenderer.on('work:success', (e, data) => {
           vm.workArray = data;
           if(vm.workArray.length == 0){
                 vm.workArray.push({})
      }
    })
    ipcRenderer.on('work:deletesuccess', () => {
          this.statusMessage = 'Work removed successfully'
             this.showSnackbar = true;
        })

    }
  }
</script>

<style>
  .page-container {
    min-height: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }


  .md-drawer {
    width: 250px!important;
    max-width: 250px!important;
  }

  .md-content {
    padding: 16px;
  }
  .md-card-header{
   text-align: center;
  }
   .md-button{
    margin-top: 20px!important;
    margin-bottom: 20px!important;
  }

</style>