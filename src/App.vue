<template>
  <div id="app">
    <div class="md-layout md-alignment-top-right">   
      <div class="md-layout-item md-size-5"></div>    
      <div class="md-layout-item"> 
        <div id="nav">          
          <md-button to="/home">Daily Status</md-button>
          <md-button to="/dashboard">Dashboard</md-button>
          <md-menu md-size="small" style="margin-top:6px">
            <md-button md-menu-trigger>Admin</md-button>
            <md-menu-content>
              <md-menu-item to="/tasks">Tasks</md-menu-item>
              <md-menu-item to="/projects">Projects</md-menu-item>
            </md-menu-content>
          </md-menu>    
          <md-button v-show="user.id !== 0" v-on:click="logmeout">LOGOUT({{user.user}})</md-button>
          <md-button to="/" v-show="user.id === 0">LOGIN</md-button>          
          
        </div>
        <router-view/>
      </div>      
      <div class="md-layout-item md-size-5">       
       
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
const ipcRenderer = require('electron').ipcRenderer

export default {
  name: 'App',
  data() {
    return {
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
    user () {
      return this.$store.state.user
    }
  },
  mounted(){    
    
  },
  created(){
    ipcRenderer.on('navigate:profile', () => {
      this.$router.replace('/profile')
    })
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  color: #2c3e50;
  margin-bottom: 20px;
}

#nav {
  padding: 10px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
