const path = require('path')
const Controller = require('egg').Controller

class HomeController extends Controller {
  // 交易原始数据
  async trades() {
    const ctx = this.ctx
    const res = await ctx.service.trades.getTrades()
    this.ctx.body = { success: true, data: res }
  }
  // 交易原始数据
  async tradesProfit() {
    const ctx = this.ctx
    const res = await ctx.service.trades.getCurrProfit()
    this.ctx.body = { success: true, data: res }
  }
  // 收益汇总
  async totalProfit() {
    const ctx = this.ctx
    const res = await ctx.service.trades.getTotalProfit()
    this.ctx.body = { success: true, data: res }
  }

  // 货币花费
  async coinCost() {
    const ctx = this.ctx
    const res = await ctx.service.trades.getCoinCost()
    this.ctx.body = { success: true, data: res }
  }
  // 金钱花费
  async moneyCost() {
    const ctx = this.ctx
    const res = await ctx.service.trades.getMoneyCost()
    this.ctx.body = { success: true, data: res }
  }

  // 获取余额
  async balance() {
    const ctx = this.ctx
    const res = await ctx.service.balances.getBalance()
    ctx.body = res
  }
}

module.exports = HomeController
