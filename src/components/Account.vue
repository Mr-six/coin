<template>
<div>
  <el-button type="primary" icon="el-icon-refresh" @click="getAccount">点击刷新数据</el-button>
  <chart v-if="activeName=='first'" :options="accountItem"></chart>
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
      accountItem: {
        title: {
          text: ''
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
      }
    }
  },

  async beforeMount () {
    await this.getAccount()
    console.log('数据加载完成')
  },

  methods: {
    // 获取收益数据
    async getAccount () {
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })
      let {data} = await api.getCoinCost()   // 货币花费
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
    },

  }
}
</script>
