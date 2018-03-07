const Controller = require('egg').Controller
class InfoController extends Controller {
  async status () {
    const ctx = this.ctx
    const res = await ctx.service.status.getStatus()
    this.ctx.body = { success: true, data: res }
  }
  async exchangeStatus () {
    const ctx = this.ctx
    const res = await ctx.service.status.getExchangeStatus()
    this.ctx.body = { success: true, data: res}
  }
}

module.exports = InfoController
