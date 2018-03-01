const Controller = require('egg').Controller
class LogController extends Controller {
  async errLog () {
    const ctx = this.ctx
    const res = await ctx.service.logs.getErrorLogs()
    this.ctx.body = { success: true, data: res }
  }
}

module.exports = LogController
