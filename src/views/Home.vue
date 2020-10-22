<template>
  <div class="md-layout">   
    <div class="md-layout-item md-size-20"></div> 
    <div class="md-layout-item">
      <h3>Daily Status for {{user.user}}<md-button type="button" style="height:16px;" class="md-default" v-on:click="logmeout">LOGOUT</md-button></h3> 
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
      <md-button type="submit" class="md-primary">Submit</md-button>
    </div>
    <div class="md-layout-item md-size-20"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const ipcRenderer = require('electron').ipcRenderer
import { mapMutations } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      didyesterday: '',
      willdotoday: '',
      anyroadblocks: ''
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
  mounted(){
    // ipcRenderer.send('tasks:get')
    
    //Register IPC Renderer event handles once for this control
    ipcRenderer.on('tasks:send', (e, tasks) => {
      console.log(tasks)
      this.tasks = tasks
    })
  }
}
</script>
