<template>
  <div class="md-layout md-alignment-center-center">   
    <div class="md-layout-item md-size-30"></div> 
    <div class="md-layout-item">
      <form novalidate @submit.stop.prevent="login" class="">
        <div>
          <h3>Login</h3>          
          <md-field md-clearable>
          <label>User name</label>
          <md-input v-model="username"></md-input>
          </md-field>

          <md-field>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
          </md-field>
          <md-button type="submit" class="md-primary">Submit</md-button>
        </div>
      </form>
      <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
        <span>Login failed</span>
      </md-snackbar>
    </div>
    <div class="md-layout-item md-size-30"></div>
  </div>
</template>

<script>
  const ipcRenderer = require('electron').ipcRenderer
  import { mapMutations } from 'vuex'

  export default {
    name: 'login',
    data: () => ({
      username: '',
      password: '',
      showSnackbar: false
    }),
    methods: {
      ...mapMutations([
        'setUser',
      ]),
      login(){            
          ipcRenderer.send('login:submit', {username: this.username, password: this.password})
      }
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

</style>
