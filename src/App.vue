<template>
  <div id="app">
    <div class="md-layout md-alignment-top-right">   
      <div class="md-layout-item md-size-30"></div>    
      <div class="md-layout-item"> 
        <router-view/>
      </div>      
      <div class="md-layout-item md-size-30">
        <md-button type="button" class="md-default" v-show="user.id !== 0" v-on:click="logmeout">LOGOUT</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

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
    
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
