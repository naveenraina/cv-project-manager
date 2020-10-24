<template>  
    <div>
      <h3>Daily Status for {{user.user}}</h3> 
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
        <md-button type="submit" class="md-primary">Submit</md-button>        
      </form>
      <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
        <span>Daily status saved successfully</span>
      </md-snackbar>
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
      showSnackbar: false
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
        userId: this.user.id
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
  mounted(){    
    ipcRenderer.on('dailystatus:success', () => {
      this.showSnackbar = true;
      this.$router.replace('/dashboard')
    })
  }
}
</script>
