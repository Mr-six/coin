<template>
<div>
  <el-button type="primary" icon="el-icon-refresh" @click="getTrades">点击刷新数据</el-button>
  <div class="block">
    <p>选择查询日期范围：{{ period }}</p>
    <el-date-picker
      v-model="period"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="handlerDateChange"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
  </div>
  <chart :options="profitItem"></chart>
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
import {api} from '../utils'
import { Loading } from 'element-ui'
export default {
  data: function () {
    return {
      activeName: 'first',
      period: [new Date().setHours(0, 0, 0, 0), Date.now()],
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
      }
    }
  },

  async beforeMount () {
    await this.getTrades()
    console.log('数据加载完成')
  },

  methods: {
    // 获取收益数据

    async getTrades (start = new Date().setHours(0, 0, 0, 0), end = Date.now()) {
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })                                   // 开启loading
      let {data} = await api.getTrades({
        query: {
          timestamp: {
            $gte: start,
            $lt: end
          }
        }
      })   // 价格趋势
      let source = data.data               // 交易原始数据

      // 时间收益表- 数据-------------
      this.profitItem.dataset = {
        sourceHeader: false,
        source: source
      }
      // 数据格式
      this.profitItem.series.push(
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

      let res = await api.getProfit()     // 收益汇总
      loadingInstance.close()             // 关闭loading
      let total = res.data.data
      console.log(total)
      // 收益累计表 -------------
      this.totalProfit.dataset = {
        sourceHeader: false,
        source: total
      }
      this.totalProfit.series.push(
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
    },

    handlerDateChange () {
      const start = (new Date(this.period[0])).getTime()
      const end = (new Date(this.period[1])).getTime()
      // this.getTrades(start, end)
      console.log(start, end)
    }

  }
}
</script>
