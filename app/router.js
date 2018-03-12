module.exports = app => {
                          const { router, controller } = app
                          router.get('/', controller.home.index)
                          router.post('/api/trades', controller.api.trades) // 交易原始数据
                          router.post('/api/tradesStatus', controller.api.tradesStatus) // 交易状态
                          router.post('/api/tradesProfit', controller.api.tradesProfit) // 每笔交易收益情况
                          router.post('/api/profitsPercent', controller.api.profitsPercent) // 每笔交易收益率情况
                          router.post('/api/totalProfit', controller.api.totalProfit) // 收益汇总情况
                          router.post('/api/coinCost', controller.api.coinCost) // 交易所数字货币消耗情况
                          router.post('/api/moneyCost', controller.api.moneyCost) // 交易所金钱消耗情况
                          router.post('/api/balances', controller.api.balance) // 获取账户余额信息
                          router.post('/api/balanceTotal', controller.api.balanceTotal) // 获取账户余额总和信息
                          router.post('/api/errLog', controller.log.errLog) // 获取错误日志
                          router.get('/api/status', controller.info.status) // 获取系统信息
                          router.get('/api/exchangeStatus', controller.info.exchangeStatus) // 获取交易所链接信息
                          router.get('/api/progressStatus', controller.info.progressStatus) // 获取交易所链接信息
                        }
