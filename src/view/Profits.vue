<template>
<div>
  <date-picker :handlerDateChange="getTrades"/>
  <div class="padding-top">
      当前时间段内：
      <el-tag type="success">
        <b>累计盈利：{{total}}</b>
      </el-tag>
    </div>
  <chart :options="profitItem" @datazoom="datazoomHandler"></chart>
  <chart :options="totalProfit"></chart>
</div>
</template>

<style>
.echarts {
  height: 600px;
  padding: 60px 0;
}
</style>

<script>
import {api, config} from '../utils'
import { Loading } from 'element-ui'
import commen from '../mixins/commen'
export default {
  mixins: [commen],
  data: function () {
    return {
      activeName: 'first',
      total: 0,
      dataPeirod: {
        start: 0,
        range: 0
      },
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
    }
  },

  async beforeMount () {
  },

  methods: {
    // 获取收益数据

    async getTrades (start, end) {
      const argv = {
        query: {
          timestamp: {
            $gte: start,
            $lt: end
          }
        }
      }
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })                                   // 开启loading
      // let {data} = await api.getTrades(argv)   // 价格趋势
      // let res = await api.getProfit(argv)     // 收益汇总
      let [d1, d2] = await Promise.all([api.getTrades(argv), api.getProfit(argv)])
      let data = d1.data
      console.log(data)
      let res = d2
      loadingInstance.close()             // 关闭loading
      let source = data.data               // 交易原始数据

      if (source.length) {
        // 设置数据时间区间
        const start = source[0].timestamp
        const range = source[source.length - 1].timestamp - start
        this.dataPeirod = {start, range}
        // 时间收益表- 数据-------------
        this.profitItem.dataset = {
          sourceHeader: false,
          source: source
        }
        // 数据格式
        this.profitItem.series = [
          {
            type: 'line',
            name: '盈利',
            showSymbol: source.length < config.maxLength,
            encode: {
              x: 'timestamp',  // 将 "timestamp" 列映射到 X 轴
              y: 'profit', // 将 "profit" 列映射到 Y 轴
              tooltip: ['timestamp', 'profit', 'sellExchange', 'sellAmount', 'sellPrice', 'buyExchange', 'buyAmount', 'buyPrice', 'symbol']
            },
          }
        ]
      } else {
        this.profitItem.dataset = []
      }

      let total = res.data.data
      console.log(total)
      if (total.length) {
        this.total = total[total.length - 1].profit
        // 收益累计表 -------------
        this.totalProfit.dataset = {
          sourceHeader: false,
          source: total
        }
        this.totalProfit.series = [
          {
            type: 'line',
            name: '总盈利',
            showSymbol: total.length < config.maxLength,
            encode: {
              x: 'timestamp',  // 将 "timestamp" 列映射到 X 轴
              y: 'profit', // 将 "profit" 列映射到 Y 轴
              tooltip: ['timestamp', 'profit', 'sellExchange', 'sellAmount', 'sellPrice', 'buyExchange', 'buyAmount', 'buyPrice', 'symbol']
            },
          }
        ]
      } else {
        this.totalProfit.dataset = []
      }

    },
  },
  watch: {
    zoom (newData, oldData) {
      if (newData.start === oldData.start && newData.end === oldData.end) return false
      if (!this.dataPeirod.start) return false
      const start = this.dataPeirod.start + newData.start * this.dataPeirod.range / 100
      const end = this.dataPeirod.start + newData.end * this.dataPeirod.range / 100
      this.getTrades(start, end)
    }
  }
}
</script>
