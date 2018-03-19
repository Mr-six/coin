const Service = require('egg').Service
const merge = require('deepmerge')

const Mogodocument = 'trade_pair_document'

class TradesService extends Service {
  // 交易原始数据
  async getTrades(merge = true) {
    const { app, ctx } = this
    const body = ctx.request.body
    const defaults = { sort: { timestamp: 1 } }
    const argv = Object.assign({}, defaults, body)
    const data = await app.mongo.find(Mogodocument, argv)
    return merge ? mergeTrades(data) : data // 当属据过大时，是否进行合并
  }

  // 交易成功状态
  async getTradesStatus() {
    const { app, ctx } = this
    const body = ctx.request.body

    const resolvedImmediQuery = merge(body, {
      query: { resolved: true, resolvedImmediate: true }
    })
    const resolvedAfterQuery = merge(body, {
      query: { resolved: true, resolvedImmediate: false }
    })
    const pendingQuery = merge(body, { query: { resolved: false } })

    const tradeImmedi = await app.mongo.count(Mogodocument, resolvedImmediQuery)
    const tradeAfter = await app.mongo.count(Mogodocument, resolvedAfterQuery)
    const tradePending = await app.mongo.count(Mogodocument, pendingQuery)
    return [
      {
        value: tradeImmedi,
        name: 'resolved Immediately',
        itemStyle: { color: '#96D7AC' }
      },
      {
        value: tradeAfter,
        name: 'resolved later',
        itemStyle: { color: '#FFCC74' }
      },
      {
        value: tradePending,
        name: 'peending trades',
        itemStyle: { color: '#F56C6C' }
      }
    ]
  }

  // 每笔收益情况
  async getCurrProfit() {
    const data = await this.getTrades()
    if (!data.length) return []
    if (!data[0].profit) {
      // 是否已经计算过收益
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
    return data
  }

  // 总收益汇总
  async getTotalProfit() {
    const data = await this.getTrades()
    let total = data.map((el, i) => {
      const currProfit =
        el.sellPrice * el.sellAmount -
        el.buyPrice * el.buyAmount -
        el.sellFee -
        el.buyFee // 当前收益
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
        case percent > 1 && percent < 2:
          yields[1].value++
          break
        case percent <= 1:
          yields[0].value++
          break
        case percent >= 2 && percent <= 3:
          yields[2].value++
          break
        case percent > 3:
          yields[3].value++
          break
      }
      return el
    })
    return { profitPercent, yields }
  }

  // 收益率数量分布
  async getProfitsDistribution() {
    const { app, ctx } = this
    const body = ctx.request.body
    const data = await this.getTrades(false)
    if (!data.length) return []
    const maxProfitQuery = merge(body, {
      limit: 1,
      sort: { profitRate: -1 }
    })
    const minProfitQuery = merge(body, {
      limit: 1,
      sort: { profitRate: 1 }
    })
    let pmax = await app.mongo.find(Mogodocument, maxProfitQuery)
    let pmin = await app.mongo.find(Mogodocument, minProfitQuery)
    if (pmax.length && pmin.length) {
      pmax = pmax[0].profitRate // 最高收益率
      pmin = pmin[0].profitRate // 最低收益率
      if (!pmax || !pmin) return []
      let range = creatRange(pmax, pmin)
      data.forEach((el, i) => {
        const profitRate = el.profitRate
        for (let l = range.length, j = 0; j < l; j++) {
          if (profitRate >= range[j].min && profitRate < range[j].max) {
            range[j].value++
          }
        }
      })
      return range
    } else {
      return []
    }
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

/**
 * 对订原始单进行合并聚合，将相同比交易对进行合并
 * @param {Array} data 原始订单数据
 * @param {Number} len 返回最大长度 默认值为 3000
 */
function mergeTrades (data, len = 3000) {
  const l = data.length
  if (l <= len) return data
  const mergeCount = Math.ceil(l / len)

  return merge(data, mergeCount)

  // 合并函数
  function merge(data, len) {
    let mergedData = []
    let tradePairs = {}
    data.forEach((el, i) => {
      let tradePair = el.buyExchange + '-' + el.sellExchange
      if (!tradePairs[tradePair]) tradePairs[tradePair] = []
      tradePairs[tradePair].push(el)
      for(let k in tradePairs) {
        if (tradePairs[k].length >= len || ((i == data.length - 1) && tradePairs[k].length)) {
          let margedPari = mergePairs(tradePairs[k], len)
          if (margedPari) mergedData.push(margedPari)
          tradePairs[k] = [] // 清空
        }
      }
    })
    // 对合并数据进行配序
    mergedData.sort((o1, o2) => {
      return o1.timestamp - o2.timestamp
    })
    return mergedData
  }

  // 合并交易对
  function mergePairs(data, len) {
    if (!data.length) return
    let mergePair = data[data.length - 1]

    data.forEach((el, i) => {
      if (i === (data.length - 1)) return
      // mergePair.timestamp += el.timestamp
      mergePair.profitRate += el.profitRate
      mergePair.profit += el.profit
      mergePair.sellPrice += el.sellPrice
      mergePair.sellAmount += el.sellAmount
      mergePair.buyPrice += el.buyPrice
      mergePair.buyAmount += el.buyAmount
    })
    mergePair.profitRate = mergePair.profitRate / data.length
    // mergePair.timestamp = mergePair.timestamp / data.length
    return mergePair
  }
}

/**
 * 对收益率划分收益区间
 * @param {Number} pmax 最高收益率
 * @param {Number} pmin 最低收益率
 * @param {Number} rangeNum 划分统计区间 默认为100
 */
function creatRange (pmax, pmin, rangeNum = 100) {
  let range = []
  let interval = (pmax - pmin) / rangeNum
  for (let i = 0; i < rangeNum; i++) {
    let min = pmin + i * interval
    let max = pmin + (i + 1) * interval
    if (i === rangeNum - 1) max += 0.00001  // 当为最后一个元素时，为最后的一个数字添加一个较小的数字使其能包含最后一个
    range.push({
      name: `${(min * 100).toFixed(2) + '~' + (max * 100).toFixed(2)}`,
      value: 0,
      max,
      min
    })
  }
  return range
}

module.exports = TradesService
