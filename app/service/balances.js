const Service = require('egg').Service

class BalancesService extends Service {
  // 获取余额原始数据
  async getBalance() {
    const { app, ctx } = this
    const query = ctx.query
    if (!query.symbol) return { success: false, msg: 'parmas err' }
    // 暂时使用mock数据代替
    const { MocoUrl } = this.config.mock
    const { data } = await this.ctx.curl(`${MocoUrl}/api/balance`, {
      dataType: 'json'
    })

    let res = {}

    data.data.forEach((el, i) => {
      if (!res[el.exchange_name]) res[el.exchange_name] = []
      if (el.account_ballance[query.symbol]) {
        res[el.exchange_name].push([
          el.timestamp,
          el.account_ballance[query.symbol]
        ])
      }
    })

    return res
  }
}

module.exports = BalancesService
