<template>
<div>
  <el-button type="primary" icon="el-icon-refresh" @click="getCost">点击刷新数据</el-button>
  <chart :options="coinCostItem"></chart>
  <chart :options="moneyCostItem"></chart>
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
    await this.getCost()
    console.log('数据加载完成')
  },

  methods: {
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
  }
}
</script>
