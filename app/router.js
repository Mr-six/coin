module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.post('/api/trades', controller.api.trades) // 交易原始数据
  router.post('/api/tradesProfit', controller.api.tradesProfit) // 每笔交易收益情况
  router.post('/api/totalProfit', controller.api.totalProfit) // 收益汇总情况
  router.post('/api/coinCost', controller.api.coinCost) // 交易所数字货币消耗情况
  router.post('/api/moneyCost', controller.api.moneyCost) // 交易所金钱消耗情况
  router.get('/api/balances', controller.api.balance) // 获取账户信息
}
