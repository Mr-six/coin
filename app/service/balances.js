const Service = require('egg').Service

class BalancesService extends Service {
  // 获取余额原始数据
  async getBalance() {
    const { app, ctx } = this
    const body = ctx.request.body
    const defaults = { sort: { timestamp: 1 } }
    const argv = Object.assign({}, defaults, body)
    const data = await app.mongo.find('account_ballance_document', argv)
    return balanceFilter(data)  // 当属据过大时，进行间隔取样
  }

  // 获取时间点余额总和
  async getBalanceTotal() {
    const { app, ctx } = this
    const balances = await this.getBalance()
    if (!balances.length) return []
    const totalBalance = {}
    balances.forEach((el, i) => {
      const timestamp = el.timestamp
      let objBalances = el.balances
      let exchanges = Object.keys(objBalances)  // 交易所
      let symbols

      if (typeof objBalances[exchanges[0]] === 'string') {
        symbols = Object.keys(JSON.parse(objBalances[exchanges[0]]))
      } else {
        symbols = Object.keys(objBalances[exchanges[0]])
      }
      symbols.forEach((e_s, i) => {
        if (!totalBalance[e_s]) totalBalance[e_s] = []
        let total = 0
        exchanges.forEach((e_e, i) => {
          if (typeof objBalances[e_e] === 'string') objBalances[e_e] = JSON.parse(objBalances[e_e])
          total += objBalances[e_e][e_s] ? objBalances[e_e][e_s] : 0
        })
        totalBalance[e_s].push([timestamp, total])
      })
    })
    return totalBalance
  }
}

/**
 * 对数组进行过滤，使其最大长度为某个限定值，使用固定间隔取样（防止web段渲染过久）
 * @param {Array} data 原数组
 * @param {Number} len 最长长度 默认为 6000
 */
function balanceFilter (data, len = 6000) {
  const l = data.length
  if (l <= len) return data
  let skip = Math.ceil(l / len)
  return data.filter((el, i) => i % skip === 0)
}

module.exports = BalancesService
