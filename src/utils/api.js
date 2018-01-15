import axios  from "axios"
let baseURL = process.env.NODE_ENV === 'production' ? '/' : '/proxy'

const defaults = {
  baseURL,
  timeout: 30000,
}

Object.assign(axios.defaults, defaults)

// console.log(axios.defaults.url)

export default {

  /**
   * 获取货币列表信息
   */
  getAllCoin (start = 0, limit = 100) {
    return axios(`https://api.coinmarketcap.com/v1/ticker/?start=${start}&limit=${limit}`)
  },

  /**
   * 获取特定货币价格趋势
   * @param {String} id  货币 ID
   */
  getPriceById (id) {
    return axios(`/api/currencies/${id}/`)
  },

  /**
   * 获取特定货币reddit订阅人数
   * @param {String} id  货币 ID
   */
  getCoinRedditSub (id) {
    return axios(`/redditSub/currencies/${id}/`)
  },

}
