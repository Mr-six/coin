<template>
  <div>
    <el-button type="primary" icon="el-icon-refresh" @click="getTradeStatus">点击刷新数据</el-button>
      <chart :options="statusItem"></chart>
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
    await this.getTradeStatus()
    console.log('数据加载完成')
  },

  methods: {
    // 获取收益数据
    async getTradeStatus () {
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })                                   // 开启loading
      let {data} = await api.getTradeStatus()   // 订单状态
      loadingInstance.close()             // 关闭loading
      let tradeStatus = data.data


      // 收益率饼图
      this.statusItem.series[0].data = tradeStatus

    },
  }
}
</script>
