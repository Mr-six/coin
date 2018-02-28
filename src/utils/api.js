import axios  from "axios"
let baseURL = process.env.NODE_ENV === 'production' ? '/' : '/proxy'

const defaults = {
  baseURL,
  timeout: 100000,
}

Object.assign(axios.defaults, defaults)

// console.log(axios.defaults.url)

export default {
  /**
   * 获取货币列表信息
   */
  getAllCoin(start = 0, limit = 100) {
    return axios(
      `https://api.coinmarketcap.com/v1/ticker/?start=${start}&limit=${limit}`
    )
  },

  /**
   * 获取特定货币价格趋势
   * @param {String} id  货币 ID
   */
  getPriceById(id) {
    return axios(`/api/currencies/${id}/`)
  },

  /**
   * 获取特定货币reddit订阅人数
   * @param {String} id  货币 ID
   */
  getCoinRedditSub(id) {
    return axios(`/redditSub/currencies/${id}/`)
  },

  /**
   * 获取交易详情
   */
  getTrades() {
    return axios.post(`/api/tradesProfit`)
  },
  /**
   * 获取交易状态
   */
  getTradeStatus() {
    return axios.post(`/api/tradesStatus`)
  },
  /**
   * 获取收益汇总
   */
  getProfit() {
    return axios.post(`/api/totalProfit`)
  },
  /**
   * 获取交易所数字货币花费
   */
  getCoinCost() {
    return axios.post(`/api/coinCost`)
  },

  /**
   * 获取交易所现金花费
   */
  getMoneyCost() {
    return axios.post(`/api/moneyCost`)
  },

  /**
   * 获取货币交易数量
   */
  getAccount(symbol = 'btc') {
    return axios(`/api/balances?symbol=${symbol}`)
  },

  /**
   * 收益比例
   */
  getProfitsPercent(symbol = 'btc') {
    return axios.post(`/api/profitsPercent`)
  },

  /**
   * 获取交易所账户预览
   */
  getAccountPreview() {
    return axios(`/api/balancePreview`)
  }
}
