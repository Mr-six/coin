<template>
<div>
  <date-picker :handlerDateChange="getTrades" :zoom="zoom" />
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
import { clearTimeout } from 'timers';
export default {
  data: function () {
    return {
      activeName: 'first',
      total: 0,
      zoom: {},
      timer: '',
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
      let {data} = await api.getTrades(argv)   // 价格趋势
      let source = data.data               // 交易原始数据

      if (source.length) {
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
              tooltip: ['timestamp', 'profit', 'sellExchange', 'sellAmount', 'sellPrice', 'buyExchange', 'buyAmount', 'buyPrice']
            },
          }
        ]
      } else {
        this.profitItem.dataset = []
      }

      let res = await api.getProfit(argv)     // 收益汇总
      loadingInstance.close()             // 关闭loading
      let total = res.data.data
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
              tooltip: ['timestamp', 'profit', 'sellExchange', 'sellAmount', 'sellPrice', 'buyExchange', 'buyAmount', 'buyPrice']
            },
          }
        ]
      } else {
        this.totalProfit.dataset = []
      }

    },

    // 监听缩放
    datazoomHandler (e) {
      if (e.start === 0 && e.end === 100) return
      if (this.timer) window.clearTimeout(this.timer)
      // console.log(window.clearTimeout)
      this.timer = setTimeout(() => {
        this.zoom = e
      }, 1000)
    }
  }
}
</script>
