# node 数据接口
> node接口用于前端获取,计算数据,将数据和合并整理为适合图表展示的数据

#### POST /api/trades
发送参数:
- query 查找范围
- skip 跳过数据数量
- limit 返回条数限制
- 等 [参看](https://github.com/brickyang/egg-mongo-native)
```
"success": true,
"data": [
    {
        "_id": "5a93900f1d41c833ff0a7685",
        "timestamp": 1519620111581,
        "sellId": "",
        "sellExchange": "hitbtc",
        "sellPrice": 9831.88,
        "sellFilledPrice": 0,
        "sellFee": 0,
        "sellAmount": 0.08,
        "sellFilledAmount": 0,
        "buyId": "",
        "buyExchange": "huobi",
        "buyPrice": 9625,
        "buyFilledPrice": 0,
        "buyFee": 0,
        "buyAmount": 0.08,
        "buyFilledAmount": 0,
        "symbol": "BTCUSD",
        "resolved": false,
        "resolveActions": [],
    },
]
```

