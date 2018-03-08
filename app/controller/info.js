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
  async progressStatus () {
    const ctx = this.ctx
    const res = await ctx.service.status.getProgressStatus()
    if (res.length) {
      this.ctx.body = { success: true, data: res}
    } else {
      this.ctx.body = { success: false, data: [], msg: '无进程数据' }
    }
  }
}

module.exports = InfoController
