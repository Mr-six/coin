<template>
<chart :options="data"></chart>
</template>

<style>
.echarts {
  height: 500px;
}
</style>

<script>
import {api} from '../utils'
export default {
  data: function () {
    return {
      data: {
        title: {
          text: '相关性测试'
        },
        tooltip: {},
        legend: {
          data:[]
        },
        xAxis: {
          type: 'time'
        },
        yAxis: {},
        dataZoom: [{
          type: 'slider',
          xAxisIndex: [0],
          show: true,
          start: 60,
          end: 100,
        }],
        series: [],
        // animationDuration: 2000
      }
    }
  },

  async beforeMount () {
    await this.getPriceById()
    await this.getCoinRedditSub()
    console.log('数据加载完成')
  },

  methods: {
    async getPriceById () {
      let {data} = await api.getPriceById('bitcoin')  // 价格趋势
      this.data.legend.data.push('price')
      this.data.series.push({
        name: 'price',
        type: 'line',
        data: data.price_usd
    })
    },
    async getCoinRedditSub () {
      let {data} = await api.getCoinRedditSub('bitcoin')  // 订阅趋势
      this.data.legend.data.push('online', 'subscribers')
      this.data.series.push(
        {
          name: 'online',
          type: 'line',
          data: data.data[0].reddit_active_user_num
        },{
          name: 'subscribers',
          type: 'line',
          data: data.data[0].reddit_subscribers_num
        }
      )
    }
  }
}
</script>
