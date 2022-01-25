<template>
  <div class="page-container md-layout-column" id="education-container">
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
        >Add more education</md-button
      >

      <!-- <md-card v-for="(input, index) in qualificationArray" :key="{ input }"> -->
        <md-card v-for="(input, index) in qualificationArray" :key="{ input }" :id="{index}">
        <md-card-header>
          <h3>Education</h3>
          <md-button v-if="qualificationArray.length > 1 && index !=0"  @click="deleteEducation(input.ID, index)" style="margin-left:1095px; "> X</md-button>
          <md-divider></md-divider>
        </md-card-header>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-45 "  style="margin-left:20px;">
            <md-field>
              <label>Qualification</label>
              <md-input
                :value="input.Qualification"
                @change="handleInputChange($event, 'Qualification', index)"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-45 "  style="margin-right:20px;">
            <md-field>
              <label>Course name</label>
              <md-input
                :value="input.CourseName"
                @change="handleInputChange($event, 'CourseName', index)"
              ></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-45 "  style="margin-left:20px;">
            <md-field>
              <label>Course specialization</label>
              <md-input
                :value="input.CourseSpcl"
                @change="handleInputChange($event, 'CourseSpcl', index)"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-45 "  style="margin-right:20px;">
            <md-field>
              <label>University/Institute name </label>
              <md-input
                :value="input.UniversityName"
                @change="handleInputChange($event, 'UniversityName', index)"
              ></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-45 "  style="margin-left:20px;">
            <md-field>
             <label>Passing out year</label>
              <md-select
                :value="input.PassingYear"
                placeholder="year"
                @blur="handleInputChange($event, 'PassingYear', index)"
              >
                <md-option value="2024">2024</md-option>
                <md-option value="2023">2023</md-option>
                <md-option value="2022">2022</md-option>
                <md-option value="2021">2021</md-option>
                <md-option value="2020">2020</md-option>
                <md-option value="2019">2019</md-option>
                <md-option value="2018">2018</md-option>
                <md-option value="2017">2017</md-option>
                <md-option value="2014">2016</md-option>
                <md-option value="2015">2015</md-option>
                <md-option value="2014">2014</md-option>
                <md-option value="2013">2013</md-option>
                <md-option value="2012">2012</md-option>
                <md-option value="2011">2011</md-option>
                <md-option value="2010">2010</md-option>
                <md-option value="2009">2009</md-option>
                <md-option value="2008">2008</md-option>
                <md-option value="2007">2007</md-option>
                <md-option value="2006">2006</md-option>
                <md-option value="2005">2005</md-option>
                <md-option value="2004">2004</md-option>
                <md-option value="2003">2003</md-option>
                <md-option value="2002">2002</md-option>
                <md-option value="2001">2001</md-option>
                <md-option value="2000">2000</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-45 "  style="margin-right:20px;">
            <md-field>
              <label>Percantage/CGPA</label>
              <md-input
                :value="input.Percantage"
                @change="handleInputChange($event, 'Percantage', index)"
              ></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-45 "  style="margin-left:20px;">
            <md-field>
              <label>Technical Skills</label>
              <md-input
                :value="input.TechnicalSkills"
                @change="handleInputChange($event, 'TechnicalSkills', index)"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-45 "  style="margin-right:20px;">
            <md-field>
              <label>Any Certification</label>
              <md-input
                :value="input.Certificate"
                @change="handleInputChange($event, 'Certificate', index)"
              ></md-input>
            </md-field>
          </div>
        </div>
      </md-card>
      <div class="md-layout md-gutter md-alignment-center">
        <md-button
          class="md-primary md-dense md-raised md-default"
          @click="saveEducation"
          >Submit</md-button
        >
      </div>
    </md-content>
     <md-dialog-confirm
      :md-active.sync="showDialogDeleteConfirmaton"
      md-title="Are you sure"
      md-content="This will permanently delete this item"
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-confirm="deleteTask" />

    <md-snackbar
      md-position="center"
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >

   
      <span>{{ statusMessage }}</span>
    </md-snackbar>
  </div>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer;

export default {
  name: "profile",
  data: () => ({
    
    qualificationArray: [],
    selectedEducation: {},
    showSnackbar: false,
    statusMessage: "",
    showNavigation: false,
    showSidepanel: false,
    showDialogDeleteConfirmaton: false,
    indexdelete:""
  }),

  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    handleInputChange(event, label, index) {
      var myVal = event.target.value;
      if (label == "Qualification") {
        this.qualificationArray[index].Qualification = myVal;
      } else if (label == "CourseName") {
        this.qualificationArray[index].CourseName = myVal;
      } else if (label == "CourseSpcl") {
        this.qualificationArray[index].CourseSpcl = myVal;
      } else if (label == "UniversityName") {
        this.qualificationArray[index].UniversityName = myVal;
      } else if (label == "PassingYear") {
        this.qualificationArray[index].PassingYear = myVal;
      } else if (label == "Percantage") {
        this.qualificationArray[index].Percantage = myVal;
      } else if (label == "TechnicalSkills") {
        this.qualificationArray[index].TechnicalSkills = myVal;
      } else if (label == "Certificate") {
        this.qualificationArray[index].Certificate = myVal;
      } else {
        console.log("no value");
      }
      if (!this.qualificationArray[index].ID) {
        this.qualificationArray[index].ID = "";
      }
      this.qualificationArray[index].UserId = this.$store.state.user.id;
    },
    saveEducation() {
      ipcRenderer.send("education:submit", this.qualificationArray);
    },
     deleteEducation(id, index){
      if(id){
        var found = this.qualificationArray.find(input => input.ID === id)
        this.selectedEducation = found
        
         
      }
      this.indexdelete = index;
      this.showDialogDeleteConfirmaton = true;
      //this.qualificationArray.splice(index, 1);
      
    },
     deleteTask(){
       this.qualificationArray.splice(this.indexdelete, 1);
        ipcRenderer.send('education:delete', {id: this.selectedEducation.ID})
      },

    addField() {
      this.qualificationArray.push({});
      this.qualificationArray = this.qualificationArray.reverse()
    },
    sortArray() {
      this.qualificationArray = this.qualificationArray.sort((a, b) =>
        b.PassingYear > a.PassingYear
          ? 1
          : a.PassingYear > b.PassingYear
          ? -1
          : 0
      );
    },
  },
  created() {
    var userId = this.$store.state.user.id;
   // this.newUser.userId = this.$store.state.user.id;
    ipcRenderer.send("education:get", userId);
  },
  mounted() {
    //Register IPC Renderer event handles once for this control
    ipcRenderer.on("education:submitsuccess", () => {
      this.statusMessage = "Profile saved successfully";
      this.showSnackbar = true;
      this.sortArray();
    });
    var vm = this;
    ipcRenderer.on("education:success", (e, data) => {
      vm.qualificationArray = data;
      if(vm.qualificationArray.length == 0){
        vm.qualificationArray.push({})
      }
      this.sortArray();
    });
     ipcRenderer.on('education:deletesuccess', () => {
          this.statusMessage = 'education removed successfully'
             this.showSnackbar = true;
        })
  },
};
</script>

<style>
.page-container {
  min-height: 300px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 250px !important;
  max-width: 250px !important;
}

.md-content {
  padding: 16px;
}
.md-card-header {
  text-align: center;
}
.md-button {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}
.buttonclr {
  color: blanchedalmond;
}
</style>
