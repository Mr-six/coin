<template>
<div>

  <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="支出收益百分比详情" name="first">

      <el-button type="primary" icon="el-icon-refresh" @click="getProfitsPercent">点击刷新数据</el-button>

      <chart v-if="activeName=='first'" :options="profitPercentItem"></chart>
      <chart v-if="activeName=='first'" :options="pieItem"></chart>

    </el-tab-pane>
    <el-tab-pane label="交易详情" name="second">
      空
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
      profitPercentItem: {
        title: {
          text: '收益率 - 折线图'
        },
        tooltip: {},
        legend: {
          data:['收益率']
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
      pieItem: {
        title: {
          text: '收益率 - 饼图'
        },
        legend: {},
        tooltip: {},

        series: [{
          type: 'pie',
          radius: '55%',
          data: []
        }],
        // animationDuration: 2000
      },
    }
  },

  async beforeMount () {
    await this.getProfitsPercent()
    console.log('数据加载完成')
  },

  methods: {
    // 获取收益数据
    async getProfitsPercent () {
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })                                   // 开启loading
      let {data} = await api.getProfitsPercent()   // 价格趋势
      loadingInstance.close()             // 关闭loading
      let source = data.data.profitPercent  // 原始数据 折线图
      let pie = data.data.yields            // 收益率

      // 时间收益表- 数据-------------
      this.profitPercentItem.dataset = {
        sourceHeader: false,
        source: source
      }
      // 数据格式
      this.profitPercentItem.series.push(
        {
          type: 'line',
          name: '盈利',
          encode: {
            x: 'timestamp',  // 将 "timestamp" 列映射到 X 轴
            y: 'profitPercent', // 将 "profit" 列映射到 Y 轴
            tooltip: ['timestamp', 'profit', 'sellExchange', 'sellAmount', 'sellPrice', 'buyExchange', 'buyAmount', 'buyPrice']
          },
        }
      )
      // 收益率饼图
      this.pieItem.series[0].data = pie

    },
    // tab 切换点击
    handleTabClick(tab, event) {

    }
  }
}
</script>
