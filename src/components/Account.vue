<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="账户余额" name="first">

      <el-button type="primary" icon="el-icon-refresh" @click="getAccount">点击刷新数据</el-button>

      <chart v-if="activeName=='first'" :options="accountItem"></chart>

    </el-tab-pane>
    <el-tab-pane label="账户信息" name="second">
      空
    </el-tab-pane>
    <el-tab-pane label="其他" name="fourth">
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
      accountItem: {
        title: {
          text: '账户余额'
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
      let {data} = await api.getAccount()   // 账户余额
      loadingInstance.close()               // 关闭loading
      console.log(data)
      let items = Object.keys(data.data)
      this.accountItem.legend.data = items
      items.forEach(el => {
        this.accountItem.series.push({
          name : el,
          type: 'line',
          data: data.data[el]
        })
      })
    },

    handleTabClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
