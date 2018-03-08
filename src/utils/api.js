import axios  from "axios"
import { Loading, Message, Notification } from 'element-ui'

let baseURL = process.env.NODE_ENV === 'production' ? '/' : '/proxy'

const defaults = {
  baseURL,
  timeout: 100000,
}

// 请求拦截发送
axios.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    Message({
      showClose: true,
      message: '错误信息：' + error,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

// 返回拦截请求
axios.interceptors.response.use(
  function(response) {
    if (response.data.data instanceof Array && !response.data.data.length) {
      Notification.error({
        title: '无数据',
        message: '暂无交易数据',
        duration: 2000
      })
    }
    return response
  },
  function(error) {
    Message({
      showClose: true,
      duration: 0,
      message: '错误信息：' + error,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

Object.assign(axios.defaults, defaults)

// console.log(axios.defaults.url)

export default {
  /**
   * 获取货币列表信息
   */
  async getAllCoin(start = 0, limit = 100) {
    try {
      const data = await axios(
        `https://api.coinmarketcap.com/v1/ticker/?start=${start}&limit=${limit}`
      )
      return { success: true, data }
    } catch (e) {
      return { success: false, data: e }
    }
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
  getProfitsPercent(body) {
    return axios.post(`/api/profitsPercent`, body)
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
  },
  /**
   * 获取数据时间区间
   */
  async getAvailablePeriod() {
    const { data: start } = await axios.post(`/api/trades`, {
      limit: 1,
      sort: { timestamp: 1 }
    })
    const { data: end } = await axios.post(`/api/trades`, {
      limit: 1,
      sort: { timestamp: -1 }
    })
    return { start: start.data[0].timestamp, end: end.data[0].timestamp }
  },

  /**
   * 获取交易所websocket链接状态
   */
  getExchangeStatus() {
    return axios(`/api/exchangeStatus`)
  },

  /**
   * 获取系统信息
   */
  getProgressStatus() {
    return axios(`/api/progressStatus`)
  }
}
