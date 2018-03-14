/**
 * 日期选择器共享数据
 */

const state = {
  period: [
    new Date().setHours(0, 0, 0, 0),
    new Date().setHours(23, 59, 59, 59)
  ],
  start: 0,
  end: 0
}

const mutations = {
  CHANGEPERIOD (state, date) {
    state.period = date
  }
}

const actions = {
  changePeriod ({ commit }, date) {
    commit('CHANGEPERIOD', date)
  }
}

const getters = {
  getPeriod: state => state.period
}

export default {
  state,
  mutations,
  actions,
  getters
}
