<template>
<div>

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="交易详情" name="first">

      <el-button type="primary" icon="el-icon-refresh" @click="getTrades">点击刷新数据</el-button>

      <chart :options="profitItem"></chart>

      <chart :options="totalProfit"></chart>

      <chart :options="accountItem"></chart>
    </el-tab-pane>
    <el-tab-pane label="账户详情" name="second">
      待更新
    </el-tab-pane>
    <el-tab-pane label="交易汇总" name="fourth">
      空
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<style>
.echarts {
  height: 600px;
  padding: 60px 0;
}
</style>

<script>
import {api} from '../utils'
import { Loading } from 'element-ui'
export default {
  data: function () {
    return {
      activeName: 'first',
      profitItem: {
        title: {
          text: '盈利情况'
        },
        tooltip: {},
        legend: {
          data:['盈利']
        },
        xAxis: {
          type: 'time'
        },
        yAxis: {},
        dataZoom: [
          {
          type: 'slider',
          xAxisIndex: [0],
          show: true,
          start: 0,
          end: 100,
        },
        {
          type: 'slider',
          yAxisIndex: [0],
          show: true,
          start: 0,
          end: 100,
        }
        ],
        dataset: {},
        series: [],
        // animationDuration: 2000
      },
      totalProfit: {
        title: {
          text: '累计盈利'
        },
        tooltip: {},
        legend: {
          data:['总盈利']
        },
        xAxis: {
          type: 'time'
        },
        yAxis: {},
        dataZoom: [
          {
          type: 'slider',
          xAxisIndex: [0],
          show: true,
          start: 0,
          end: 100,
        },
        {
          type: 'slider',
          yAxisIndex: [0],
          show: true,
          start: 0,
          end: 100,
        }
        ],
        dataset: {},
        series: [],
        // animationDuration: 2000
      },
      accountItem: {
        title: {
          text: 'btc汇总'
        },
        tooltip: {},
        legend: {
          data:['总盈利']
        },
        xAxis: {
          type: 'time'
        },
        yAxis: {},
        dataZoom: [
          {
          type: 'slider',
          xAxisIndex: [0],
          show: true,
          start: 0,
          end: 100,
        },
        {
          type: 'slider',
          yAxisIndex: [0],
          show: true,
          start: 0,
          end: 100,
        }
        ],
        dataset: {},
        series: [],
        // animationDuration: 2000
      },
    }
  },

  async beforeMount () {
    await this.getTrades()
    console.log('数据加载完成')
  },

  methods: {
    async getTrades () {
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })
      let {data} = await api.getTrades()  // 价格趋势
      loadingInstance.close()
      let source = []
      if (data.data instanceof Array) {
        source = data.data
      } else {
        source = data.data.projects
      }
      console.log(source)
      // 时间收益表- 数据-------------
      this.profitItem.dataset = {
        sourceHeader: false,
        source: source
      }
      // 数据格式
      this.profitItem.series.push(
        // {
        //   type: 'bar',
        //   name: '盈利',
        //   encode: {
        //     x: 'timestamp',  // 将 "timestamp" 列映射到 X 轴
        //     y: 'profit', // 将 "profit" 列映射到 Y 轴
        //     tooltip: ['timestamp', 'profit', 'sellExchange', 'sellAmount', 'sellPrice', 'buyExchange', 'buyAmount', 'buyPrice']
        //   },
        // },
        {
          type: 'line',
          name: '盈利',
          encode: {
            x: 'timestamp',  // 将 "timestamp" 列映射到 X 轴
            y: 'profit', // 将 "profit" 列映射到 Y 轴
            tooltip: ['timestamp', 'profit', 'sellExchange', 'sellAmount', 'sellPrice', 'buyExchange', 'buyAmount', 'buyPrice']
          },
        }
      )

      // 拷贝数组 遍历累加
      let copyArr = source.map((el) => Object.assign({}, el))
      // console.log('copyArr', copyArr)
      let total = copyArr.map((el, i) => {
        if (i != 0) {
          // console.log(el.profit)
          // console.log(copyArr[i - 1].profit)
          el.profit += copyArr[i - 1].profit
          return el
        } else {
          return el
        }
      })
      // console.log(total)

      // 收益累计表 -------------
      this.totalProfit.dataset = {
        sourceHeader: false,
        source: total
      }
      this.totalProfit.series.push(
        // {
        //   type: 'bar',
        //   name: '总盈利',
        //   encode: {
        //     x: 'timestamp',  // 将 "timestamp" 列映射到 X 轴
        //     y: 'profit', // 将 "profit" 列映射到 Y 轴
        //     tooltip: ['timestamp', 'profit', 'sellExchange', 'sellAmount', 'sellPrice', 'buyExchange', 'buyAmount', 'buyPrice']
        //   },
        // },
        {
          type: 'line',
          name: '总盈利',
          encode: {
            x: 'timestamp',  // 将 "timestamp" 列映射到 X 轴
            y: 'profit', // 将 "profit" 列映射到 Y 轴
            tooltip: ['timestamp', 'profit', 'sellExchange', 'sellAmount', 'sellPrice', 'buyExchange', 'buyAmount', 'buyPrice']
          },
        }
      )

      // 汇总btc数量变化
      let bitfinex = []  // 初始
      let gdax =[]

      source.forEach((el) => {
        if (el.buyExchange === 'gdax') {  // 买方为gdax
          gdax.push([el.timestamp, el.buyAmount])
          bitfinex.push([el.timestamp, el.sellExchange * -1])  // 卖方
        }
      })

      console.log(bitfinex)
      // console.log('copyArr', copyArr)
      // let total2 = copyArr2.map((el, i) => {
      //   if (i != 0) {
      //     // console.log(el.profit)
      //     // console.log(copyArr[i - 1].profit)
      //     el.profit += copyArr[i - 1].profit
      //     return el
      //   } else {
      //     return el
      //   }
      // })
      // console.log(total)

      // btc交易计表 -------------
      // this.totalProfit.dataset = {
      //   sourceHeader: false,
      //   source: total2
      // }
      this.totalProfit.series.push(
        {
          type: 'line',
          name: 'bitfinex-btc',
          data: bitfinex,
        },
        {
          type: 'line',
          name: 'gdax-btc',
          data: gdax,
        }
      )



      // 线性encode

    },

    handleClick(tab, event) {
    }
  }
}
</script>
