<template>
  <div>
    <date-picker :handlerDateChange="getTradeStatus" />
    <div class="padding-top">
      当前时间段内：
      <el-tag type="success">立即成交数量：{{tradeImmedi}}</el-tag>
      <el-tag type="warning">稍后成交：{{tradeAfter}}</el-tag>
      <el-tag type="danger">暂未成交：{{tradePending}}</el-tag>
    </div>
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
      tradeImmedi: 0,
      tradeAfter: 0,
      tradePending: 0,
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
        console.log(tradeStatus)
        tradeStatus.forEach(e => {
          if(e.name === 'resolved Immediately') {
            this.tradeImmedi = e.value
          } else if (e.name === 'resolved later') {
            this.tradeAfter = e.value
          } else {
            this.tradePending = e.value
          }
        })
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
