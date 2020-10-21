<template>
  <div class="md-alignment-center-center">
    <form novalidate @submit.stop.prevent="login">
      <div class="main-div">
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
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer

  export default {
    name: 'login',
    data: () => ({
      username: '',
      password: '',
      showSnackbar: false
    }),
    methods: {
        login(){            
            ipcRenderer.send('login:submit', {username: this.username, password: this.password})
        }
    },
    mounted(){
        
        //Register IPC Renderer event handles once for this control
        ipcRenderer.on('login:success', (e, status) => {
            if(status === 'error'){
              this.showSnackbar = true;
            } else {
              this.$router.replace('/home');
            }        
        })
    }
  }
</script>

<style lang="less" scoped>
  .md-field:last-child {
    margin-bottom: 40px;
  }
  .main-div{
      width: 400px;
      padding: 50px;
  }

</style>
