const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const file = path.join(__dirname, '../..', '/dist/index.html')
    this.ctx.body = fs.readFileSync(file, 'utf-8')
  }
  async trades () {
    const { app } = this

    const res = await app.mongo.find('trades')
    this.ctx.body = {
      success: true,
      data: res,
    }
  }
}

module.exports = HomeController
