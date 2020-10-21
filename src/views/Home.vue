<template>
  <div class="home">
    <h1>Tasks</h1>
    <li v-for="item in tasks" v-bind:key="item.ID">
      {{item.DESCRIPTION}}
    </li>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const ipcRenderer = require('electron').ipcRenderer

export default {
  name: 'Home',
  data() {
    return {
      tasks: [{DESCRIPTION: '', ID: 0}]
    }
  },
  components: {
    
  },
  mounted(){
    ipcRenderer.send('tasks:get')
    
    //Register IPC Renderer event handles once for this control
    ipcRenderer.on('tasks:send', (e, tasks) => {
      console.log(tasks)
      this.tasks = tasks
    })
  }
}
</script>
