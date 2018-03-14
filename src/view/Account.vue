<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="账户余额" name="first">
      <el-row v-if="accountPreview" :gutter="20">
        <el-col :span="6" v-for="(v, k) in accountPreview" :key="k">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ '余额 ' + k }}</span>
              <el-button style="float: right; padding: 3px 0" type="text">时间 {{balanceTimestamp}}</el-button>
            </div>
            <div v-for="(val, key) in v" :key="key" class="balnce-item">
              <balance-item :symbol="key" :amount="val">
                {{ key + ': ' + val }}
              </balance-item>

            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="图表展示" name="second">
      <date-picker :handlerDateChange="balanceTotal"/>

      <chart v-if="activeName=='second'" :options="accountItem"></chart>
      <h3>对比图</h3>
      <el-select v-model="selectVal" @change="selectChange" placeholder="请选择">
        <el-option
          v-if="balanceAllDate"
          v-for="(v, k) in balanceAllDate"
          :key="k"
          :value="k">
        </el-option>
      </el-select>
      <chart v-if="activeName=='second'" :options="symbolItem"></chart>
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
.el-card {
  margin-bottom: 20px;
}
.box-card {
  width: auto;
}
</style>

<script>
import {api} from '../utils'
import balanceItem from '../components/balanceItem.js'
import { Loading } from 'element-ui'
export default {
  data: function () {
    return {
      selectVal: 'BTC',
      activeName: 'first',
      balanceTimestamp: '',
      accountPreview: '',
      balanceAllDate: '',

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
      },
      symbolItem: {
        title: {
          text: 'BTC账户余额'
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
    await this.getPreview()
    console.log('数据加载完成')
  },

  methods: {
    // 获取账户预览
    async getPreview () {
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })
      let {data} = await api.getBalance({
        sort: { timestamp: -1 },
        limit: 1
      })   // 账户余额
      loadingInstance.close()               // 关闭loading
      if (data.success) {

        let t = data.data[0].timestamp
        if (t) {  // 设置余额最后更新时间
          t = new Date(t)
          this.balanceTimestamp = t.toLocaleDateString() + '-' + t.toLocaleTimeString()
        }
        let balances = data.data[0].balances
        if (typeof balances === 'object') {
          for (let k in balances) {
            balances[k] = typeof balances[k] === 'string' ? JSON.parse(balances[k]) : balances[k]
          }
        }
        this.accountPreview = balances
      }
    },
    // 获取收益数据
    async balanceTotal (start, end) {
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
      let {data} = await api.getBalanceTotal(argv)   // 账户余额
      console.log(data)
      loadingInstance.close()                 // 关闭loading
      if (data.success) {
        this.balanceAllDate = data.data
        this.accountItem.series = []
        let items = Object.keys(data.data)
        this.accountItem.legend.data = items
        items.forEach(el => {
          this.accountItem.series.push({
            name : el,
            type: 'line',
            data: data.data[el]
          })
        })
        this.showCompare()
      }
    },

    // 绘制对比图
    showCompare () {
      const symbol = this.selectVal
      const allData = this.balanceAllDate
      this.symbolItem.title.text = `${symbol}账户余额`
      this.symbolItem.series= []
      this.symbolItem.series.push({
        name : symbol,
        type: 'line',
        data: allData[symbol]
      })
    },

    // 列表切换
    handleTabClick(tab, event) {
      // console.log(tab, event)
      if (tab.name === 'second') {
        // this.balanceTotal()
      }
    },
    // select 切换
    selectChange (e) {
      console.log(e)
      this.showCompare()
    },
  },
  computed: {
    test: function (e) {
      console.log(e)
    }
  },
  components: {
      balanceItem
    }
}
</script>
