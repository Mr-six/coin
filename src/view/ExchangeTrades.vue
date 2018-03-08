<template>
<div>
  <date-picker :handlerDateChange="getCost" />
  <chart :options="coinCostItem"></chart>
  <chart :options="moneyCostItem"></chart>
</div>
</template>

<style>

</style>

<script>
import {api, config} from '../utils'
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
  },

  methods: {
    // 交易所收支详情
    async getCost (start, end) {

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
      })
      let {data: coinData} = await api.getCoinCost(argv)   // 货币花费
      let {data: moneyDate} = await api.getMoneyCost(argv) // 货币花费
      loadingInstance.close()               // 关闭loading


      // 货币花费数据
      if (coinData.data) {
        this.coinCostItem.series = []
        let items = Object.keys(coinData.data)
        console.log(items)
        this.coinCostItem.legend.data = items
        items.forEach(el => {
          this.coinCostItem.series.push({
            name : el,
            type: 'line',
            showSymbol: coinData.data[el].length < config.maxLength,
            data: coinData.data[el]
          })
        })
      } else {
        this.coinCostItem.series = []
      }

      // 现金花费
      if (moneyDate.data) {
        this.moneyCostItem.series = []
        let itemsM = Object.keys(moneyDate.data)
        this.moneyCostItem.legend.data = itemsM
        itemsM.forEach(el => {
          this.moneyCostItem.series.push({
            name : el,
            showSymbol: moneyDate.data[el].length < config.maxLength,
            type: 'line',
            data: moneyDate.data[el]
          })
        })
      }

    },
  }
}
</script>
