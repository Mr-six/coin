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
    const totalBalance = {}
    balances.forEach((el, i) => {
      const timestamp = el.timestamp
      let objBalances
      if (typeof el.balances === 'string') {
        objBalances = JSON.parse(el.balances)
      } else {
        objBalances = el.balances
      }
      for (let e_k in objBalances) {
        for (let s_k in objBalances[e_k]) {
          if (!totalBalance[s_k]) totalBalance[s_k] = []
          totalBalance[s_k].push([timestamp, objBalances[e_k][s_k]])
        }
      }
    })
    return totalBalance
  }
}

module.exports = BalancesService
