import Vue from 'vue'
import Vuex from 'vuex'

import datePicker from './modules/datePicker'

Vue.use(Vuex)

export default new Vuex.Store({
  // 日期选择
  modules: {
    datePicker
  }
})
