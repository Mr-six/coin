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
      let objBalances = el.balances
      for (let e_k in objBalances) {
        let objExchage
        if (typeof objBalances[e_k] === 'string') {
          objExchage = JSON.parse(objBalances[e_k])
        } else {
          objExchage = objBalances[e_k]
        }
        for (let s_k in objExchage) {
          if (!totalBalance[s_k]) totalBalance[s_k] = []
          totalBalance[s_k].push([timestamp, objExchage[s_k]])
        }
      }
    })
    console.log(totalBalance)
    return totalBalance
  }
}

module.exports = BalancesService
