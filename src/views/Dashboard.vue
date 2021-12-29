<template>
  <div>
    <div class="md-layout-item">
      <div class="md-layout md-alignment-center-right">
        <div class="md-layout-item"></div>
        <div
          class="md-layout-item md-layout md-alignment-center-right md-size-10"
        >
          <md-field style="margin-bottom: 10px">
            <md-select
              v-model="selectedUserId"
              placeholder="User"
              @md-selected="loadUserDashboard"
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
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-size-30">
          <div
            md-fixed-header
            style="
              width: 100%;
              background-color: white;
              border-right: #ccc solid 1px;
            "
          >
            <md-table-toolbar>
              <div class="md-toolbar-section-start">
                <h1 class="md-title">Tasks Assigned</h1>
              </div>
            </md-table-toolbar>
            <md-content
              style="height: 460px; max-height: 460px; overflow: auto"
              class="md-scrollbar"
            >
              <SlickList
                lockAxis="y"
                v-model="tasksNew"
                tag="ul"
                style="list-style-type: none; margin-left: -40px"
                @input="saveSequence"
                @sort-end="dragEnd"
              >
                <SlickItem
                  v-for="(item, index) in tasksNew"
                  :index="index"
                  :key="index"
                  tag="li"
                  class="card"
                  style="list-style-type: none; border: 1px solid #efefef"
                >
                  <md-card>
                    <md-card-content>
                      <div class="row" style="display: inline-flex">
                        <div class="col" style="max-width: 245px">
                          <div class="" style="cursor: context-menu">
                            {{ item.taskName }}
                          </div>
                          <div class="md-subhead" style="cursor: context-menu">
                            Created on:
                            {{
                              item.createdDate &&
                              item.createdDate.toDateString()
                            }}
                          </div>
                        </div>
                      </div>
                      <md-menu md-size="small" style="float: right">
                        <md-button class="md-icon-button" md-menu-trigger>
                          <md-icon md-menu-trigger>keyboard_arrow_down</md-icon>
                        </md-button>
                        <md-menu-content>
                          <md-menu-item @click="showEditDialog(item)"
                            >Edit</md-menu-item
                          >
                          <md-menu-item @click="onLoadNotes(item)"
                            >Notes</md-menu-item
                          >
                          <md-menu-item>
                            <md-menu
                              md-direction="bottom-end"
                              md-offset-x="280"
                            >
                              <div md-menu-trigger style="cursor: pointer">
                                Move To
                                <md-icon md-menu-trigger
                                  >keyboard_arrow_right</md-icon
                                >
                              </div>
                              <md-menu-content>
                                <md-menu-item @click="moveToInProgress(item)"
                                  >InProgress</md-menu-item
                                >
                                <md-menu-item @click="moveToComplete(item)" v-if="user.role !== 'Member'"
                                  >Complete</md-menu-item
                                >
                              </md-menu-content>
                            </md-menu>
                          </md-menu-item>
                        </md-menu-content>
                      </md-menu>
                    </md-card-content>
                    <md-card-actions> </md-card-actions>
                  </md-card>
                </SlickItem>
              </SlickList>
            </md-content>
          </div>
        </div>
        <div class="md-layout-item md-size-40">
          <div
            md-fixed-header
            style="
              width: 100%;
              background-color: white;
              border-right: #ccc solid 1px;
            "
          >
            <md-table-toolbar>
              <div class="md-toolbar-section-start">
                <h1 class="md-title">Tasks In progress</h1>
              </div>
            </md-table-toolbar>
            <md-content
              style="height: 460px; max-height: 460px; overflow: auto"
              class="md-scrollbar"
            >
              <SlickList
                lockAxis="y"
                tag="ul"
                v-model="tasksInProgress"
                style="list-style-type: none; margin-left: -40px"
                @input="saveSequence"
                @sort-end="dragEnd"
              >
                <SlickItem
                  v-for="(item, index) in tasksInProgress"
                  :index="index"
                  :key="index"
                  tag="li"
                  class="card"
                  style="list-style-type: none; border: 1px solid #efefef"
                >
                  <md-card>
                    <md-card-content>
                      <div class="row" style="display: inline-flex">
                        <div class="col" style="max-width: 245px">
                          <div class="" style="cursor: context-menu">
                            {{ item.taskName }}
                          </div>
                          <div class="md-subhead" style="cursor: context-menu">
                            <strong v-if="item.tocompleteon && item.startedOn">
                              {{
                                getDateDifInDays(item.tocompleteon, new Date())
                              }}
                              of
                              {{
                                getDateDifInDays(
                                  item.tocompleteon,
                                  item.startedOn
                                )
                              }}
                            </strong>
                            <strong v-else> (Due date missing) </strong>
                            days left
                          </div>
                        </div>
                      </div>
                      <md-menu md-size="small" style="float: right">
                        <md-button class="md-icon-button" md-menu-trigger>
                          <md-icon md-menu-trigger>keyboard_arrow_down</md-icon>
                        </md-button>
                        <md-menu-content>
                          <md-menu-item @click="showEditDialog(item)"
                            >Edit</md-menu-item
                          >
                          <md-menu-item @click="onLoadNotes(item)"
                            >Notes</md-menu-item
                          >
                          <md-menu-item>
                            <md-menu
                              md-direction="bottom-end"
                              md-offset-x="280"
                            >
                              <div md-menu-trigger style="cursor: pointer">
                                Move To
                                <md-icon md-menu-trigger
                                  >keyboard_arrow_right</md-icon
                                >
                              </div>
                              <md-menu-content>
                                <md-menu-item @click="moveToNew(item)"
                                  >New</md-menu-item
                                >
                                <md-menu-item @click="moveToComplete(item)"  v-if="user.role !== 'Member'"
                                  >Complete</md-menu-item
                                >
                              </md-menu-content>
                            </md-menu>
                          </md-menu-item>
                        </md-menu-content>
                      </md-menu>
                    </md-card-content>
                    <md-card-actions> </md-card-actions>
                  </md-card>
                </SlickItem>
              </SlickList>
            </md-content>
          </div>
        </div>
        <div class="md-layout-item md-size-30">
          <md-table
            v-model="tasksCompleted"
            md-card
            md-fixed-header
            md-sort="completedOn"
            md-sort-order="desc"
            style="width: 100%"
          >
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
                  Created on:
                  {{ item.createdDate && item.createdDate.toDateString() }}
                  &nbsp;&nbsp; Started on:
                  {{ item.startedOn && item.startedOn.toDateString() }}
                  &nbsp;&nbsp; Due on:
                  {{ item.tocompleteon && item.tocompleteon.toDateString() }}
                  &nbsp;&nbsp; Completed on:
                  {{ item.completedOn && item.completedOn.toDateString() }}
                </md-tooltip>
              </md-table-cell>
              <md-table-cell>
                <md-menu>
                  <md-button class="md-icon-button" md-menu-trigger>
                    <md-icon md-menu-trigger>keyboard_arrow_down</md-icon>
                  </md-button>
                  <md-menu-content>
                    <md-menu-item @click="showEditDialog(item)"
                      >Edit</md-menu-item
                    >
                    <md-menu-item @click="onLoadNotes(item)"
                      >Notes</md-menu-item
                    >
                    <md-menu-item>
                      <md-menu md-direction="bottom-end" md-offset-x="280">
                        <div md-menu-trigger style="cursor: pointer">
                          Move To
                          <md-icon md-menu-trigger
                            >keyboard_arrow_right</md-icon
                          >
                        </div>
                        <md-menu-content>
                          <md-menu-item @click="moveToInProgress(item)"
                            >InProgress</md-menu-item
                          >
                          <md-menu-item @click="moveToNew(item)"
                            >New</md-menu-item
                          >
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
    </div>

    <md-dialog :md-active.sync="showDialog" md-close-on-esc>
      <md-dialog-title>Notes for ({{ selectedTask.taskName }})</md-dialog-title>

      <div class="md-dialog-content md-layout" style="width: 800px">
        <md-field>
          <label>Add Note</label>
          <md-textarea md-autogrow v-model="noteText"></md-textarea>
          <md-button class="md-icon-button" @click="addNote">
            <md-icon>send</md-icon>
          </md-button>
        </md-field>

        <md-list class="md-triple-line" style="padding-top: 20px; width: 100%">
          <template v-for="note in notes">
            <md-list-item :key="note.id">
              <md-avatar :title="note.user">
                {{ note.user && note.user.substr(0, 1).toUpperCase() }}
              </md-avatar>

              <div class="md-list-item-text">
                <span></span>
                <span style="color: rgba(0, 0, 0, 0.55)"
                  >{{ note.createddate.toDateString() }}
                  {{
                    note.createddate.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                  }}</span
                >
                <p
                  style="
                    padding-top: 10px;
                    white-space: pre-wrap;
                    color: rgba(0, 0, 0, 0.75);
                  "
                >
                  {{ note.description }}
                </p>
              </div>
              <md-button
                v-if="note.userid === user.id"
                class="md-icon-button md-list-action"
                @click="deleteNote(note.id)"
              >
                <md-icon class="">delete</md-icon>
              </md-button>
            </md-list-item>

            <md-divider
              class="md-inset"
              :key="'divider_' + note.id"
            ></md-divider>
          </template>
        </md-list>
        <div v-if="notes.length === 0" style="color: grey">
          <span> No notes found </span>
        </div>
      </div>

      <md-dialog-actions style="">
        <md-button class="md-primary" @click="showDialog = false"
          >Cancel</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showDialogEdit" md-close-on-esc>
      <md-dialog-title>Edit ({{ selectedTask.taskName }})</md-dialog-title>

      <div class="md-dialog-content md-layout">
        <div class="md-layout-item" style="width: 600px">
          <md-field>
            <label>Task name</label>
            <md-input v-model="selectedTask.taskName"></md-input>
          </md-field>

          <md-field>
            <label>Description</label>
            <md-textarea v-model="selectedTask.description"></md-textarea>
          </md-field>

          <div class="md-layout">
            <md-field class="md-layout-item" style="margin-right: 30px">
              <label>Estimate (Days)</label>
              <md-input
                v-model="selectedTask.estimateddays"
                type="number"
              ></md-input>
            </md-field>
            <div class="md-layout-item">
              <div class="block">
                <div>Complete by</div>
                <md-datepicker
                  v-model="selectedTask.tocompleteon"
                  md-immediately
                />
              </div>
            </div>
          </div>

          <div class="md-layout">
            <div class="md-layout-item" style="padding-right: 30px">
              <md-field>
                <md-select
                  v-model="selectedTask.priority"
                  placeholder="Priority"
                >
                  <md-option value="Low">Low</md-option>
                  <md-option value="Medium">Medium</md-option>
                  <md-option value="High">High</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item" style="margin-right: 30px">
              <md-field>
                <md-select
                  v-model="selectedTask.userId"
                  placeholder="Assigned to"
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
            <div class="md-layout-item">
              <md-field>
                <md-select
                  v-model="selectedTask.projectId"
                  placeholder="Project"
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
          </div>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="cancelDialog">Cancel</md-button>
        <md-button class="md-primary" @click="saveTask">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="showDialog1">
      <md-dialog-title>Feedback</md-dialog-title>

      <div class="md-dialog-content md-layout">
        <div class="md-layout-item" style="width: 550px">
          <div class="custom-control custom-radio"  style="padding:10px">
            <md-input
              type="radio"
              class="custom-control-input"
              id ="1"
              @change="handleChange('Autopilot Mode')"
              name="same"
            ></md-input>
            <label class="custom-control-label" for="1">Autopilot mode(Task completed without supervision)</label>
          </div>
          <div class="custom-control custom-radio" style="padding:10px">
            <md-input
              type="radio"
              class="custom-control-input"
              id ="2" 
              @change="handleChange('Semi-autopilot mode')" 
              name="same"
            ></md-input>
            <label class="custom-control-label" for="2" >Semi-autopilot mode(Task complete with verbal and technical help)</label>
          </div>
          <div class="custom-control custom-radio" style="padding:10px">
            <md-input
              type="radio"
              class="custom-control-input"
              id ="3"
              @change="handleChange('Manual mode')" 
              name="same"
            ></md-input>
            <label class="custom-control-label" for="3">Manual mode(Task complete with verbal help)</label >
          </div>
          <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog1= false">Cancel</md-button >
            <md-button class="md-primary" @click="saveFeedback">Save</md-button>
          </md-dialog-actions>
        </div>
      </div>
      
    </md-dialog>
  </div>
</template>

<script>
const fetch = require("node-fetch");
const config = require("@/config");
const ipcRenderer = require("electron").ipcRenderer;
import { SlickList, SlickItem } from "vue-slicksort";
var blankTask = {
  id: 0,
  taskName: "",
  description: "",
};
let blankNote = {
  id: 0,
  description: null,
  taskid: 0,
  userid: 0,
  user: null,
  createddate: new Date(),
};
export default {
  name: "dashboard",
  data: () => ({
    statusFeedback: null,
    compSup: true,
    compVerb: false,
    compVerbTech: false,
    disableDescription: true,
    noteText: "",
    notes: [blankNote],
    showDialog: false,
    showDialog1: false,
    showDialogEdit: false,
    selectedUserId: 0,
    users: [{ id: 0, user: "" }],
    tasksNew: [blankTask],
    tasksInProgress: [blankTask],
    tasksCompleted: [blankTask],
    selectedTask: {},
    projects: [{ id: 0, projectname: "" }],
    loadNotesAgain: false,
    isDrag: false,
    taskData: {},
  }),
  methods: {
    dragEnd(data) {
      if (data.newIndex !== data.oldIndex) {
        this.isDrag = true;
      } else {
        this.isDrag = false;
      }
    },
    saveSequence(newArry) {
      if (this.isDrag) {
        var toSave = newArry.map((x) => {
          return {
            taskId: x.id,
            previousId: newArry.indexOf(x),
            taskName: x.taskName,
          };
        });
        console.log(toSave);
        //call new method to save toSave
        ipcRenderer.send("task:saveSequence", toSave);
      }
    },
    getDateDifInDays(dt2, dt1) {
      return Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
          (1000 * 60 * 60 * 24)
      );
    },
    saveTask() {
      ipcRenderer.send("task:submit", this.selectedTask);
      this.showDialogEdit = false;
      // log note if vital fields are changes
      var originallist = [];
      switch (this.selectedTask.status) {
        case "New":
          originallist = this.tasksNew;
          break;
        case "InProgress":
          originallist = this.tasksInProgress;
          break;
        case "Complete":
          originallist = this.tasksCompleted;
          break;
      }
      var original = originallist.find((x) => x.id === this.selectedTask.id);

      if (this.selectedTask.estimateddays !== original.estimateddays) {
        let message =
          this.user.user +
          " changed estimate from " +
          original.estimateddays +
          " to " +
          this.selectedTask.estimateddays;
        this.addNoteForTask(this.selectedTask, message);
      }
      if (
        this.selectedTask.tocompleteon.toLocaleDateString() !==
        original.tocompleteon.toLocaleDateString()
      ) {
        let tocompleteon = original.tocompleteon
          ? original.tocompleteon.toDateString()
          : "BLANK";
        let message =
          this.user.user +
          " changed due date from " +
          tocompleteon +
          " to " +
          this.selectedTask.tocompleteon.toDateString();
        this.addNoteForTask(this.selectedTask, message);
      }
    },
    showEditDialog(task) {
      this.selectedTask = { ...task };
      this.showDialogEdit = true;
    },
    updateTask() {},
    onLoadNotes(task) {
      this.selectedTask = { ...task };
      this.loadNotes(task.id);
    },
    deleteNote(noteid) {
      ipcRenderer.send("note:delete", noteid);
    },
    addNote() {
      let newNote = { ...blankNote };
      newNote.description = this.noteText;
      newNote.userid = this.user.id;
      newNote.taskid = this.selectedTask.id;
      newNote.createddate = new Date();
      this.loadNotesAgain = true;
      ipcRenderer.send("note:save", newNote);
    },
    addNoteForTask(task, message) {
      let newNote = { ...blankNote };
      newNote.description = message;
      newNote.userid = 11; // 11 - System
      newNote.taskid = task.id;
      newNote.createddate = new Date();
      ipcRenderer.send("note:save", newNote);
    },
    loadNotes(taskId) {
      ipcRenderer.send("notes:get", taskId);
    },
    loadTasks(userId) {
      ipcRenderer.send("tasks:getuserassigned", userId);
    },
    loadUserDashboard() {
      ipcRenderer.send("tasks:getuserassigned", this.selectedUserId);
    },
    moveToInProgress(task) {
      ipcRenderer.send("task:move", { id: task.id, status: "InProgress", feedback:'' });
      var message = this.formMessage(task.taskName, task.status, "InProgress");
      this.notifySlack(message);
      this.addNoteForTask(task, message);
    },
    moveToNew(task) {
      ipcRenderer.send("task:move", { id: task.id, status: "New", feedback:'' });
      var message = this.formMessage(task.taskName, task.status, "New");
      this.notifySlack(message);
      this.addNoteForTask(task, message);
    },
    moveToComplete(task) {
      this.taskData = task;
      // ipcRenderer.send("task:move", { id: task.id, status: "Complete"});
      // var message = this.formMessage(task.taskName, task.status, "Complete");
      // this.notifySlack(message);
      // this.addNoteForTask(task, message);
      this.showDialog1 = true;
    },
    handleChange(value){
      this.statusFeedback = value
    },
    saveFeedback() {
     // var feedbackmsg = this.statusFeedback;
      ipcRenderer.send("task:move", {
        id: this.taskData.id,
        status: "Complete",
        feedback: this.statusFeedback,
      });
      var message = this.formMessage(
        this.taskData.taskName,
        this.taskData.status,
        "Complete"
      );
      this.notifySlack(message);
      this.addNoteForTask(this.taskData, message);
      this.showDialog1 = false;
    },
    cancelDialog() {
      this.showDialog1 = false;
    },
    getTaskHealth() {
      // return color - gree, orange, red based on if task was completed on time
    },
    formMessage(name, from, to) {
      return (
        this.user.user + ' moved task "' + name + '" from ' + from + " to " + to
      );
    },
    notifySlack(message) {
      console.log(message);
      fetch("https://slack.com/api/chat.postMessage", {
        method: "post",
        body: JSON.stringify({
          channel: "CGZNB2XRA", //"CGZNB2XRA" daily-status //"C9Z21JH9D" - random
          text: message,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + config.default.slackToken,
        },
      });
    },
    feedback() {
      let filter = {
        compSup: this.compSup,
        compVerb: this.compVerb,
        compVerbTech: this.compVerbTech,
      };
      ipcRenderer.send("feedbacks:get", filter);
    },
  },
  mounted() {
    //Register IPC Renderer event handles once for this control
    ipcRenderer.on("tasks:userassignedsuccess", (e, data) => {
      this.tasksNew = data
        .filter((x) => x.status === "New")
        .sort((a, b) => {
          if (!a.previousId && !b.previousId) {
            return 0;
          } else if (!a.previousId) {
            return -1;
          } else if (a.previousId > b.previousId) {
            return 1;
          } else if (a.previousId < b.previousId) {
            return -1;
          } else {
            return 0;
          }
        });
      this.tasksInProgress = data
        .filter((x) => x.status === "InProgress")
        .sort((a, b) => {
          if (!a.previousId && !b.previousId) {
            return 0;
          } else if (!a.previousId) {
            return -1;
          } else if (a.previousId > b.previousId) {
            return 1;
          } else if (a.previousId < b.previousId) {
            return -1;
          } else {
            return 0;
          }
        });
      this.tasksCompleted = data
        .filter((x) => x.status === "Complete")
        .sort((a, b) => {
          if (a.completedOn.getTime() > b.completedOn.getTime()) {
            return -1;
          } else if (a.completedOn.getTime() < b.completedOn.getTime()) {
            return 1;
          } else {
            return 0;
          }
        });
    });

    ipcRenderer.on("users:success", (e, data) => {
      this.users = data;
    });

    ipcRenderer.on("task:movesuccess", () => {
      this.loadTasks(this.selectedUserId);
    });

    ipcRenderer.on("notes:getsuccess", (e, data) => {
      this.notes = data;
      this.showDialog = true;
    });

    ipcRenderer.on("note:savesuccess", () => {
      if (this.loadNotesAgain) {
        this.loadNotes(this.selectedTask.id);
        this.loadNotesAgain = false;
      }
      this.noteText = "";
    });

    ipcRenderer.on("note:deletesuccess", () => {
      this.loadNotes(this.selectedTask.id);
    });

    ipcRenderer.on("projects:success", (e, data) => {
      this.projects = data;
    });

    ipcRenderer.on("task:submitsuccess", () => {
      this.statusMessage = "Task saved successfully";
      this.showSnackbar = true;
      this.loadTasks(this.selectedUserId);
    });

    ipcRenderer.on("task:saveSequencesuccess", () => {
      //console.log('sequence updated')
      //this.loadTasks(this.selectedUserId)
    });
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    ipcRenderer.send("projects:get");
    let filter = {
      showActive: true,
      inActiveStatus: false,
    };
    ipcRenderer.send("users:get", filter);
    this.selectedUserId = this.user.id;
    this.loadTasks(this.selectedUserId);
  },
  components: {
    SlickItem,
    SlickList,
  },
};
</script>

<style lang="less" scoped>
.main-div {
  margin-top: 40px;
}
.md-table {
  width: 30%;
  display: inline-block;
}
.task-delayed {
  background-color: red;
}
</style>





