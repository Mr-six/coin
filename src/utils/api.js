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
  getTrades(body) {
    return axios.post(`/api/tradesProfit`, body)
  },
  /**
   * 获取交易状态
   */
  getTradeStatus(body) {
    return axios.post(`/api/tradesStatus`, body)
  },
  /**
   * 获取收益汇总
   */
  getProfit(body) {
    return axios.post(`/api/totalProfit`, body)
  },
  /**
   * 获取交易所数字货币花费
   */
  getCoinCost(body) {
    return axios.post(`/api/coinCost`, body)
  },

  /**
   * 获取交易所现金花费
   */
  getMoneyCost(body) {
    return axios.post(`/api/moneyCost`, body)
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
  },

  /**
   * 获取错误日志
   */
  getErrLog(body) {
    return axios.post(`/api/errLog`, body)
  },
  /**
   * 获取系统信息
   */
  getSysStatus() {
    return axios(`/api/status`)
  }
}
