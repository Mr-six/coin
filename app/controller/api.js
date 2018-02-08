const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller

class HomeController extends Controller {
  // 交易原始数据
  async trades() {
    const { app } = this
    const res = await app.mongo.find('trades', {
      skip: 0,
      sort: { timestamp: 1 }
    })
    this.ctx.body = {
      success: true,
      data: res
    }
  }
  // 收益汇总
  async totalProfit() {
    const { app } = this
    const res = await app.mongo.find('trades', {
      skip: 0,
      sort: { timestamp: 1 }
    })
    let total = res.map((el, i) => {
      if (i != 0 && res.length > 0) {
        el.profit += res[i - 1].profit
      }
      return el
    })
    this.ctx.body = { success: true, data: total }
  }

  // 钱包btc数量
  async amount() {
    const { app } = this
    const res = await app.mongo.find('trades', {
      skip: 0,
      sort: { timestamp: 1 }
    })
    let data = {}

    res.forEach(el => {  // 数据买卖分离
      if (!data[el.buyExchange]) data[el.buyExchange] = []
      if (!data[el.sellExchange]) data[el.sellExchange] = []
      data[el.buyExchange].push([el.timestamp, el.buyAmount])
      data[el.sellExchange].push([el.timestamp, el.sellAmount * -1])
    })
    Object.keys(data).forEach(el => {
      data[el].forEach((childEl, i) => {
        if (i != 0 && res.length > 0) {
          childEl[1] += data[el][i - 1][1]
        }
      })
    })
    this.ctx.body = { success: true, data: data }
  }

  // 获取余额
  async balance () {
    const ctx = this.ctx
    const res = await ctx.service.balances.getBalance()
    ctx.body = res
  }

}

module.exports = HomeController
