import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var nouser = {id: 0, user: 'No User'}
export default new Vuex.Store({
  state: {    
    user: nouser
  },
  mutations: {
    setUser(state, data){
      state.user = data
    },
    logout(state){
      state.user = nouser
    }
  },
  actions: {
    
  },
  modules: {
  }
})
