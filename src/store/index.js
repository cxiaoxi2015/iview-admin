/**
 * @description: vue状态管理器
 * @author: xx
 * @date: 2018-08-07 16:27:47
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
