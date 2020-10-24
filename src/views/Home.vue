<template>  
    <div class="md-layout">
      <div class="md-layout-item md-size-20"></div>
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Daily Status for {{user.user}}</div>
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

              <md-button :disabled="user.id === 0" type="submit" class="md-primary">Submit</md-button>        
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

export default {
  name: 'Home',
  data() {
    return {
      didyesterday: '',
      willdotoday: '',
      anyroadblocks: '',
      taskId: 0,
      showSnackbar: false,
      tasks: [{id: 0, taskName: ''}],
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
    
  },
  mounted(){
    if(this.user.id > 0){
      ipcRenderer.send('tasks:getuserassigned', this.user.id)
    }
        
    ipcRenderer.on('dailystatus:success', () => {
      this.showSnackbar = true;
      this.$router.replace('/dashboard')
    })
    ipcRenderer.on('tasks:userassignedsuccess', (e, data) => {
        this.tasks = data
      })
  }
}
</script>
