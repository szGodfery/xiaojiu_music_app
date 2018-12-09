import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)
// 核心就是 store（仓库） 包含着你的应用中大部分的状态 (state)
export default new Vuex.Store({
  state,
  mutations,
  getters
})