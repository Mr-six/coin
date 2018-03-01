const Service = require('egg').Service
class Logs extends Service {
  // 交易原始数据
  async getErrorLogs() {
    const { app, ctx } = this
    const body = ctx.request.body
    const data = await app.mongo.find('error_log', {
      ...body,
      sort: { timestamp: 1 }
    })
    return data
  }
}

module.exports = Logs
