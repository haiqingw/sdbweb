import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import merchant from './modules/merchant'
import msg from './modules/msg'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    merchant,
    msg
  },
  getters
})

export default store