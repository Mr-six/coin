const Service = require('egg').Service

class TradesService extends Service {
  // 交易原始数据
  async getTrades() {
    const { app, ctx } = this
    const body = ctx.request.body
    const data = await app.mongo.find('trades', {
      ...body,
      sort: { timestamp: 1 }
    })
    return data
  }

  // 每笔收益情况
  async getCurrProfit() {
    const data = await this.getTrades()
    let profit = data.map((el, i) => {
      // 当前收益
      const currProfit =
        el.sellPrice * el.sellAmount -
        el.buyPrice * el.buyAmount -
        el.sellFee -
        el.buyFee
      el.profit = currProfit
      return el
    })
    return profit
  }

  // 总收益汇总
  async getTotalProfit() {
    const data = await this.getTrades()
    if (!data[0].profit) {  // 是否已经计算过收益
      let total = data.map((el, i) => {
        const currProfit = el.sellPrice * el.sellAmount - el.buyPrice * el.buyAmount - el.sellFee - el.buyFee // 当前收益
        if (i === 0) {
          el.profit = currProfit
        } else {
          const prevProfit = data[i - 1].profit // 上一个交易收益汇总
          el.profit = prevProfit + currProfit
        }
        return el
      })
      return total
    }
    return data
  }

  // 收益百分比
  async getProfitsPercent() {
    const data = await this.getCurrProfit()
    // 收益率分布
    let yields = [
      {
        value: 0,
        name: '<1%'
      },
      {
        value: 0,
        name: '1%~2%'
      },
      {
        value: 0,
        name: '2%~3%'
      },
      {
        value: 0,
        name: '>3%'
      }
    ]
    let profitPercent = data.map((el, i) => {
      // 当前收益
      const percent = el.profit / (el.buyPrice * el.buyAmount + el.sellFee + el.buyFee) * 100
      el.profitPercent = percent
      // 统计收益率分布
      switch (true) {
        case (percent > 1 && percent < 2):
          yields[1].value++
          break
        case (percent <= 1):
          yields[0].value++
          break
        case (percent >= 2 && percent <= 3):
          yields[2].value++
          break
        case (percent > 3):
          yields[3].value++
          break
      }
      return el
    })
    return { profitPercent, yields }
  }

  /**
   * 单个交易所交易情况
   */

  // 数字货币消耗
  async getCoinCost() {
    const res = await this.getTrades()
    let data = {}
    res.forEach(el => {
      // 数据买卖分离
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
    return data
  }
  // 金钱消耗
  async getMoneyCost() {
    const res = await this.getTrades()
    let data = {}
    res.forEach(el => {
      // 数据买卖分离
      if (!data[el.buyExchange]) data[el.buyExchange] = []
      if (!data[el.sellExchange]) data[el.sellExchange] = []
      data[el.buyExchange].push([
        el.timestamp,
        (el.buyAmount * el.buyPrice + el.buyFee) * -1
      ])
      data[el.sellExchange].push([
        el.timestamp,
        el.sellAmount * el.sellPrice + el.sellFee
      ])
    })
    Object.keys(data).forEach(el => {
      data[el].forEach((childEl, i) => {
        if (i != 0 && res.length > 0) {
          childEl[1] += data[el][i - 1][1]
        }
      })
    })
    return data
  }
}

module.exports = TradesService
