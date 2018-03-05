<template>
  <div>
    <date-picker :handlerDateChange="getTradeStatus" />
    <chart :options="statusItem"></chart>
  </div>
</template>

<style>

</style>

<script>
import {api} from '../utils'
import { Loading, Notification } from 'element-ui'
export default {
  data: function () {
    return {
      activeName: 'first',

      statusItem: {
        title: {
          text: '成交率率 - 饼图'
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
  },

  methods: {
    // 获取收益数据
    async getTradeStatus (start, end) {
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
      })                                            // 开启loading
      let {data} = await api.getTradeStatus(argv)   // 订单状态
      loadingInstance.close()                       // 关闭loading
      let tradeStatus = data.data

      if (data.data && data.data.length) {
        // 收益率饼图
        this.statusItem.series[0].data = tradeStatus
        const allTrades = data.data.reduce((a, b) => a.value + b.value)

        if (allTrades === 0) {
          Notification.error({
            title: '无数据',
            message: '暂无交易数据',
            duration: 2000
          })
        }
      }
    },
  }
}
</script>
