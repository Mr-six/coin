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
      for (let e_k in el.balances) {
        for (let s_k in el.balances[e_k]) {
          if (!totalBalance[s_k]) totalBalance[s_k] = []
          totalBalance[s_k].push([timestamp, el.balances[e_k][s_k]])
        }
      }
    })
    return totalBalance
  }
}

module.exports = BalancesService
