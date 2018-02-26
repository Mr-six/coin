<template>
<div>

  <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="收益详情" name="first">

      <el-button type="primary" icon="el-icon-refresh" @click="getTrades">点击刷新数据</el-button>

      <chart v-if="activeName=='first'" :options="profitItem"></chart>

      <chart v-if="activeName=='first'" :options="totalProfit"></chart>

    </el-tab-pane>
    <el-tab-pane label="交易详情" name="second">
      <el-button type="primary" icon="el-icon-refresh" @click="getCost">点击刷新数据</el-button>
      <chart v-if="activeName=='second'" :options="coinCostItem"></chart>
      <chart v-if="activeName=='second'" :options="moneyCostItem"></chart>
    </el-tab-pane>
    <el-tab-pane label="账户详情" name="fourth">
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
      coinCostItem: {
        title: {
          text: '数字货币数量详情(正为买入,负为卖出)'
        },
        tooltip: {},
        legend: {
          data:[]
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
      moneyCostItem: {
        title: {
          text: '现金数量(正为收入,负为花费)'
        },
        tooltip: {},
        legend: {
          data:[]
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
    // 获取收益数据
    async getTrades () {
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })                                   // 开启loading
      let {data} = await api.getTrades()   // 价格趋势
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

    // 交易所收支详情
    async getCost () {
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })
      let {data} = await api.getCoinCost()   // 货币花费
      let dataM = await api.getMoneyCost()   // 货币花费
      loadingInstance.close()               // 关闭loading
      let items = Object.keys(data.data)
      this.coinCostItem.legend.data = items
      items.forEach(el => {
        this.coinCostItem.series.push({
          name : el,
          type: 'line',
          data: data.data[el]
        })
      })

      let itemsM = Object.keys(dataM.data.data)
      this.moneyCostItem.legend.data = itemsM
      itemsM.forEach(el => {
        this.moneyCostItem.series.push({
          name : el,
          type: 'line',
          data: dataM.data.data[el]
        })
      })
    },
    // tab 切换点击
    handleTabClick(tab, event) {
      // console.log(tab, event)
      if (tab.index === '1') {
        this.getCost()
      }
    }
  }
}
</script>
