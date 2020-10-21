<template>
  <div class="md-alignment-center-center">
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
        <md-button class="md-primary" v-on:click="login">Submit</md-button>
    </div>
  </div>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer

  export default {
    name: 'login',
    data: () => ({
      username: '',
      password: ''
    }),
    methods: {
        login(){            
            ipcRenderer.send('login:submit', {username: this.username, password: this.password})
        }
    },
    mounted(){
        
        //Register IPC Renderer event handles once for this control
        ipcRenderer.on('login:success', (e, status) => {
            console.log(status)
        
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
