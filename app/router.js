module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/api/trades', controller.api.trades)              // 交易原始数据
  router.get('/api/totalProfit', controller.api.totalProfit)    // 收益汇总情况
  router.get('/api/amounts', controller.api.amount)             // 数字货币数量汇总
}
