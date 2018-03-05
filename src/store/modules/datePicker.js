/**
 * 日期选择器共享数据
 */

const state = {
  start: '',
  end: ''
}

const mutations = {
  CHANGE (state, date) {
    state = Object.assign(state, date)
  }
}

const actions = {
  change ({ commit }, date) {
    commit(CHANGE, date)
  }
}

const getters = {
  getDate : state => state
}

export default {
  state,
  mutations,
  actions,
  getters
}
