<template>  
    <div class="md-layout">
      <div class="md-layout-item md-size-20"></div>
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-layout md-gutter">
              <div class="md-title md-layout-item md-size-90">Daily Status for {{user.user}}</div>
              <div class="md-layout-item" style="text-align:right" @click="copyYesterdays" title="Yesterday's status">
                <md-icon>content_copy</md-icon>
              </div>
            </div>
            
          </md-card-header>
           
          <md-card-content>          
            
            <form novalidate @submit.stop.prevent="submit" class="">
              <md-field :class="messageClass">
                <label>What I did yesterday?</label>
                <md-textarea v-model="didyesterday" required></md-textarea>
                <span class="md-helper-text">Finished some feature</span>
                <span class="md-error">Required field</span>
              </md-field>
              <md-field :class="messageClass">
                <label>What I will do today?</label>
                <md-textarea v-model="willdotoday" required></md-textarea>
                <span class="md-helper-text">Will work on some feature</span>
                <span class="md-error">Required field</span>
              </md-field>

              <md-field :class="messageClass">
                <label>Any roadblocks faced</label>
                <md-input v-model="anyroadblocks" required></md-input>
                <span class="md-error">Required field</span>
              </md-field>

              <md-field :class="messageClass">
                  <md-select v-model="taskId" placeholder="Task">
                    <md-option v-for="option in tasks" :value="option.id" v-bind:key="option.id">{{option.taskName}}</md-option>
                  </md-select>
                </md-field>

              <md-button :disabled="user.id === 0 || taskId === 0" type="submit" class="md-primary">Submit</md-button>        
            </form>
            <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
              <span>Daily status saved successfully</span>
            </md-snackbar>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-20"></div>
    </div> 
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const ipcRenderer = require('electron').ipcRenderer
import { mapMutations } from 'vuex'
const fetch = require('node-fetch')
const config = require('@/config')


export default {
  name: 'Home',
  data() {
    return {
      didyesterday: '',
      willdotoday: '',
      anyroadblocks: '',
      taskId: 0,
      showSnackbar: false,
      tasks: [],
    }
  },
  components: {
    
  },
  methods: {
    ...mapMutations([
      'logout',
    ]),
    logmeout(){
      this.logout()
      this.$router.replace('/')
    },
    submit(){
      ipcRenderer.send('dailystatus:submit', {
        didyesterday: this.didyesterday, 
        willdotoday: this.willdotoday, 
        anyroadblocks: this.anyroadblocks,
        userId: this.user.id,
        taskId: this.taskId
      })

      fetch('https://slack.com/api/chat.postMessage', {
          method: 'post',
          body: JSON.stringify({
            "channel": "CGZNB2XRA", //daily-status //"C9Z21JH9D" - random
            "text": this.user.user + "'s status" + "\n What I did yesterday? \n" + this.didyesterday + "\n What I will do today? \n" + this.willdotoday + "\n Any roadblocks? \n" + this.anyroadblocks     
          }),
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.default.slackToken
          }
      })     
    },
    copyYesterdays(){
      ipcRenderer.send('yesterdaysdailystatus:get', this.user.id)
    }
  },
  computed: {
    messageClass () {
      return {
        'md-invalid': this.hasMessages
      }
    },
    user () {
      return this.$store.state.user
    }
  },
  created(){    
    ipcRenderer.send('todaysdailystatus:get', this.user.id)
  },
  mounted(){
    if(this.user.id > 0){
      ipcRenderer.send('tasks:getuserassigned', this.user.id)
    }

    ipcRenderer.on('dailystatus:success', () => {      
      this.showSnackbar = true;
      this.$router.replace('/dashboard').catch(()=>{})      
    })
    ipcRenderer.on('tasks:userassignedsuccess', (e, data) => {
      this.tasks = data
    })
    ipcRenderer.on('todaysdailystatus:success', (e, data) => {
      if(data.length > 0){
        this.didyesterday = data[0].didyesterday
        this.willdotoday = data[0].willdotoday
        this.anyroadblocks = data[0].anyroadblocks
        this.taskId = data[0].taskId
      }
    })
    ipcRenderer.on('yesterdaysdailystatus:success', (e, data) => {
      if(data.length > 0){
        this.didyesterday = data[0].didyesterday
        this.willdotoday = data[0].willdotoday
        this.anyroadblocks = data[0].anyroadblocks
        this.taskId = data[0].taskId
      }
    })
  }
}
</script>
<style>
  @import "~material-design-icons/iconfont/material-icons.css";
</style>
