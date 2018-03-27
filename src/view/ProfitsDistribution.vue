<template>
  <div>
    <date-picker :handlerDateChange="profitsDistribution" />
    <chart v-if="activeName=='first'" :options="profitsDistributionItem"></chart>
  </div>
</template>

<style>
.echarts {
  height: 600px;
  padding: 60px 0;
}
</style>

<script>
import {api, config} from '../utils'
import { Loading } from 'element-ui'
export default {
  data: function () {
    return {
      activeName: 'first',
      profitsDistributionItem: {
        title: {
          text: '收益率 - 分布图'
        },
        tooltip: {},
        legend: {
          data:['收益率']
        },
        xAxis: {type: 'category'},
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
    // 获取收益数据
    async profitsDistribution (start, end) {
      const argv = {
        $match: {
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
      })                                   // 开启loading
      let {data} = await api.profitsDistribution(argv)   // 价格趋势
      loadingInstance.close()             // 关闭loading
      console.log(data)
      if (data.data && data.data.length) {
        console.log(data.data)
        this.profitsDistributionItem.dataset = {
          sourceHeader: false,
          source: data.data
        }
        this.profitsDistributionItem.series = [{
          type: 'bar',
          name: '盈利',
          encode: {
              x: 'name',  // 将 "timestamp" 列映射到 X 轴
              y: 'value', // 将 "profit" 列映射到 Y 轴
            },
        }]
      }

    },
  }
}
</script>
