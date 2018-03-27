const Service = require('egg').Service
const merge = require('deepmerge')

const Mogodocument = 'test_trade_pair_document'

class TradesService extends Service {
  // 交易原始数据
  async getTrades(merge = true) {
    const { app, ctx } = this
    const body = ctx.request.body
    const defaults = { $sort: { timestamp: 1 } }
    // const argv = Object.assign({}, defaults, body)
    const pipeline = [{ $sort: { timestamp: 1 } }, { $lookup: { from: 'order_document', localField: 'buy_order', foreignField: '_id', as: 'buy_order' } }, { $unwind: { path: '$buy_order', preserveNullAndEmptyArrays: true } }, { $lookup: { from: 'order_document', localField: 'sell_order', foreignField: '_id', as: 'sell_order' } }, { $unwind: { path: '$sell_order', preserveNullAndEmptyArrays: true } }]
    if (body.$match) pipeline.push(body)
    const data = await app.mongo.aggregate(Mogodocument, {pipeline})
    tradeAdapter(data)  // 数据适配
    return merge ? mergeTrades(data) : data // 当属据过大时，是否进行合并
  }

  // 交易成功状态
  async getTradesStatus() {
    const { app, ctx } = this
    const body = ctx.request.body

    const resolvedImmediQuery = merge(body, {
      query: { resolved: true, resolved_immediate: true }
    })
    const resolvedAfterQuery = merge(body, {
      query: { resolved: true, resolved_immediate: false }
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
      const percent = el.profit_rate * 100
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
      sort: { profit_rate: -1 }
    })
    const minProfitQuery = merge(body, {
      limit: 1,
      sort: { profit_rate: 1 }
    })
    // let pmax = await app.mongo.find(Mogodocument, maxProfitQuery)
    // let pmin = await app.mongo.find(Mogodocument, minProfitQuery)
    let [pmax, pmin] = await Promise.all([app.mongo.find(Mogodocument, maxProfitQuery), app.mongo.find(Mogodocument, minProfitQuery)])
    if (pmax.length && pmin.length) {
      pmax = pmax[0].profit_rate // 最高收益率
      pmin = pmin[0].profit_rate // 最低收益率
      if (!pmax || !pmin) return []
      let range = creatRange(pmax, pmin)
      data.forEach((el, i) => {
        const profit_rate = el.profit_rate
        for (let l = range.length, j = 0; j < l; j++) {
          if (profit_rate >= range[j].min && profit_rate < range[j].max) {
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
      mergePair.profit_rate += el.profit_rate
      mergePair.profit += el.profit
      mergePair.sellPrice += el.sellPrice
      mergePair.sellAmount += el.sellAmount
      mergePair.buyPrice += el.buyPrice
      mergePair.buyAmount += el.buyAmount
    })
    mergePair.profit_rate = mergePair.profit_rate / data.length
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

function tradeAdapter(trades) {
  const l = trades.length
  if(!l) return []
  for(let i = 0; i < l; i++) {
    let trade = trades[i]
    if (trade.buy_order && trade.sell_order) {
      trade.sellExchange = trade.sell_order.exchange
      trade.sellPrice = trade.sell_order.price
      trade.sellFilledPrice = trade.sell_order.filled_price
      trade.sellFee = trade.sell_order.fee
      trade.sellAmount = trade.sell_order.amount
      trade.sellFilledAmount = trade.sell_order.filled_amount
      trade.buyExchange = trade.buy_order.exchange
      trade.buyPrice = trade.buy_order.price
      trade.buyFilledPrice = trade.buy_order.filled_price
      trade.buyFee = trade.buy_order.fee
      trade.buyAmount = trade.buy_order.amount
      trade.buyFilledAmount = trade.buy_order.filled_amount
      delete trade.buy_order
      delete trade.sell_order
    }

  }
}

module.exports = TradesService


/*
{ _id: 5a98ed0f1d41c84354001577,
  timestamp: 1519971599748,
  profit_rate: 0.0072946732707454736,
  profit: 0.5166318079999982,
  sellId: '',
  sellExchange: 'bitfinex',
  sellPrice: 11168.92,
  sellFilledPrice: 0,
  sellFee: 0.141367424,
  sellAmount: 0.0064,
  sellFilledAmount: 0,
  buyId: '',
  buyExchange: 'huobi',
  buyPrice: 11044.03,
  buyFilledPrice: 0,
  buyFee: 0.14129676800000002,
  buyAmount: 0.0064,
  buyFilledAmount: 0,
  symbol: 'BTCUSDT',
  resolved: false,
  resolveActions: [] }


  { _id: 5ab9c6cc1d41c8243ec9fc03,
  timestamp: 1519971599748,
  profit_rate: 0.02,
  profit: 10,
  buy_order:
   { _id: 5ab9c6cc1d41c8243ec9fc01,
     timestamp: 1519971599748,
     resolved_timestamp: 1519971591000,
     price: 123,
     amount: 100,
     filled_price: 123,
     filled_amount: 100,
     fee: 2,
     cost: 100,
     symbol: 'BTCUSDT',
     exchange: 'huobi',
     order_id: '123',
     side: 'buy',
     error: { msg: 'test', process_time: 1519971591000 } },
  sell_order:
   { _id: 5ab9c6cc1d41c8243ec9fc02,
     timestamp: 1519971599748,
     resolved_timestamp: 1519971591000,
     price: 123,
     amount: 100,
     filled_price: 123,
     filled_amount: 100,
     fee: 2,
     cost: 100,
     symbol: 'BTCUSDT',
     exchange: 'okex',
     order_id: '124',
     side: 'sell',
     error: { msg: 'test', process_time: 1519971591000 } },
  symbol: 'BTCUSDT',
  resolved: false,
  resolved_immediate: 0,
  resolved_timestamp: true,
  resolveActions: [] }87
*/
