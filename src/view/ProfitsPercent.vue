<template>
  <div>
    <date-picker :handlerDateChange="getProfitsPercent" />
    <chart v-if="activeName=='first'" :options="profitPercentItem"></chart>
    <chart v-if="activeName=='first'" :options="profitsDistributionItem"></chart>
    <chart v-if="activeName=='first'" :options="pieItem"></chart>
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
    async getProfitsPercent (start, end) {
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
      })                                   // 开启loading
      // let {data} = await api.getProfitsPercent(argv)   // 价格趋势
      // let {data: distribution} = await api.profitsDistribution(argv)  // 收益率分布
      let [{data}, {data: distribution}] = await Promise.all([api.getProfitsPercent(argv), api.profitsDistribution(argv)])
      loadingInstance.close()             // 关闭loading
      if (data.data && data.data.profitPercent && data.data.yields) {
        let source = data.data.profitPercent  // 原始数据 折线图
        let pie = data.data.yields            // 收益率

        // 时间收益表- 数据-------------
        this.profitPercentItem.dataset = {
          sourceHeader: false,
          source: source
        }
        // 数据格式
        this.profitPercentItem.series = [
          {
            type: 'line',
            name: '盈利',
            showSymbol: source.length < config.maxLength,
            encode: {
              x: 'timestamp',  // 将 "timestamp" 列映射到 X 轴
              y: 'profitPercent', // 将 "profit" 列映射到 Y 轴
              tooltip: ['timestamp', 'profitRate', 'sellExchange', 'sellAmount', 'sellPrice', 'buyExchange', 'buyAmount', 'buyPrice', 'symbol']
            },
          }
        ]
        // 收益率饼图
        this.pieItem.series[0].data = pie
        console.log()
      } else {
        // this.profitPercentItem.dataset = []    // 清空数据
        // this.pieItem.series[0].data = []
      }
      // 收益率分布
      if (distribution.data && distribution.data.length) {
        this.profitsDistributionItem.dataset = {
          sourceHeader: false,
          source: distribution.data
        }
        this.profitsDistributionItem.series = [{
          type: 'bar',
          name: '盈利率',
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
