const Service = require('egg').Service

class BalancesService extends Service {
  // 获取余额原始数据
  async getBalance() {
    const { MocoUrl } = this.config.mock

    const { data } = await this.ctx.curl(`${MocoUrl}/api/balance`, {
      dataType: 'json'
    })
    return data
  }
}

module.exports = BalancesService
