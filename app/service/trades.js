const Service = require('egg').Service
const merge = require('deepmerge')

class TradesService extends Service {
  // 交易原始数据
  async getTrades() {
    const { app, ctx } = this
    const body = ctx.request.body
    const defaults = { sort: { timestamp: 1 } }
    const argv = Object.assign({}, defaults, body)
    const data = await app.mongo.find('trade_pair_document', argv)
    return mergeTrades(data)
  }

  // 交易成功状态
  async getTradesStatus () {
    const { app, ctx } = this
    const body = ctx.request.body

    const resolvedImmediQuery = merge(body, {
      query: { resolved: true, resolvedImmediate: true }
    })
    const resolvedAfterQuery = merge(body, {
      query: { resolved: true, resolvedImmediate: false }
    })
    const pendingQuery = merge(body, { query: { resolved: false } })

    const tradeImmedi = await app.mongo.count('trade_pair_document', resolvedImmediQuery)
    const tradeAfter = await app.mongo.count('trade_pair_document', resolvedAfterQuery)
    const tradePending = await app.mongo.count('trade_pair_document', pendingQuery)
    return [{ value: tradeImmedi, name: 'resolved Immediately', itemStyle: { color: '#96D7AC' } }, { value: tradeAfter, name: 'resolved later', itemStyle: { color: '#FFCC74' } }, { value: tradePending, name: 'peending trades', itemStyle: { color: '#F56C6C' } }]
  }

  // 每笔收益情况
  async getCurrProfit() {
    const data = await this.getTrades()
    if (!data.length) return []
    if (!data[0].profit) {
        // 是否已经计算过收益
        let profit = data.map((el, i) => {
          // 当前收益
          const currProfit = el.sellPrice * el.sellAmount - el.buyPrice * el.buyAmount - el.sellFee - el.buyFee
          el.profit = currProfit
          return el
        })
        return profit
      }
    return data

  }

  // 总收益汇总
  async getTotalProfit() {
    const data = await this.getTrades()
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

  // 收益百分比
  async getProfitsPercent() {
    const data = await this.getCurrProfit()
    if (!data.length) return []
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
      const percent = el.profitRate * 100
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
    if (!res.length) return []
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
    if (!res.length) return []
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

function mergeTrades (data) {
  const l = data.length
  switch (true) {
    case l < 6000:
      return data
      break
    case l > 6000 && l < 12000:
      return merge(data, 2)
      break
    case l > 12000 && l < 24000:
      return merge(data, 2)
      break
    case l > 24000 && l < 36000:
      return merge(data, 4)
      break
    case l > 36000 && l < 48000:
      return merge(data, 8)
      break
    case l > 48000 && l < 10000:
      return merge(data, 10)
      break
    default:
      return merge(data, 10)
      break
  }

  // 合并函数
  function merge(data, len) {
    let margedData = []
    let tradePairs = {}
    data.forEach((el, i) => {
      let tradePair = el.buyExchange + '-' + el.sellExchange
      if (!tradePairs[tradePair]) tradePairs[tradePair] = []
      tradePairs[tradePair].push(el)
      for(let k in tradePairs) {
        if (tradePairs[k].length >= len || ((i == data.length - 1) && tradePairs[k].length)) {
          let margedPari = mergeParis(tradePairs[k], len)
          if (margedPari) margedData.push(margedPari)
          tradePairs[k] = [] // 清空
        }
      }
    })
    return margedData
  }

  // 合并交易对
  function mergeParis(data, len) {
    if (!data.length) return
    let mergePari = data[data.length - 1]

    data.forEach((el, i) => {
      if (i === (data.length - 1)) return
      // mergePari.timestamp += el.timestamp
      mergePari.profitRate += el.profitRate
      mergePari.profit += el.profit
      mergePari.sellPrice += el.sellPrice
      mergePari.sellAmount += el.sellAmount
      mergePari.buyPrice += el.buyPrice
      mergePari.buyAmount += el.buyAmount
    })
    mergePari.profitRate = mergePari.profitRate / data.length
    // mergePari.timestamp = mergePari.timestamp / data.length
    return mergePari
  }
}

module.exports = TradesService
