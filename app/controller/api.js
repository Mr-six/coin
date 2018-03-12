const Controller = require('egg').Controller

class HomeController extends Controller {
  // 交易原始数据
  async trades() {
    const ctx = this.ctx
    const res = await ctx.service.trades.getTrades()
    this.ctx.body = { success: true, data: res }
  }
  // 交易状态
  async tradesStatus() {
    const ctx = this.ctx
    const res = await ctx.service.trades.getTradesStatus()
    this.ctx.body = { success: true, data: res }
  }
  // 交易收益数据
  async tradesProfit() {
    const ctx = this.ctx
    const res = await ctx.service.trades.getCurrProfit()
    this.ctx.body = { success: true, data: res }
  }
  // 交易收益百分比
  async profitsPercent() {
    const ctx = this.ctx
    const res = await ctx.service.trades.getProfitsPercent()
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
    ctx.body = { success: true, data: res }
  }
  // 获取余额预览
  async balanceTotal() {
    const ctx = this.ctx
    const res = await ctx.service.balances.getBalanceTotal()
    if (res.length) {
      ctx.body = { success: true, data: res }
    }
    else {
      ctx.body = { success: false, data: [] }
    }
  }
}

module.exports = HomeController
