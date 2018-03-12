const Service = require('egg').Service

class BalancesService extends Service {
  // 获取余额原始数据
  async getBalance() {
    const { app, ctx } = this
    const body = ctx.request.body
    const defaults = { sort: { timestamp: 1 } }
    const argv = Object.assign({}, defaults, body)
    const data = await app.mongo.find('account_ballance_document', argv)
    return data
  }

  // 获取时间点余额总和
  async getBalanceTotal() {
    const { app, ctx } = this
    const balances = await this.getBalance()
    if (!balances.length) return []
    const exLen = Object.keys(balances[balances.length - 1].balances).length  // 完整数据交易所长度
    const totalBalance = {}
    balances.forEach((el, i) => {
      const timestamp = el.timestamp
      let objBalances = el.balances
      let exchanges = Object.keys(objBalances)  // 交易所
      if (exchanges.length < exLen) return  // 交易所数据不全
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

module.exports = BalancesService
