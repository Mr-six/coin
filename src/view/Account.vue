<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="账户余额" name="first">
      <el-row v-if="accountPreview.length" :gutter="20">
        <el-col :span="6" v-for="ex in accountPreview" :key="ex.timestamp">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ '余额 ' + ex.exchange_name }}</span>
              <el-button style="float: right; padding: 3px 0" type="text">查看图表</el-button>
            </div>
            <div v-for="(v, k) in ex.account_ballance" :key="v">
              <balance-item :symbol="k" :amount="v">
                {{ k + ': ' + v }}
              </balance-item>

            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="图表展示" name="second">
      <el-button type="primary" icon="el-icon-refresh" @click="getAccount">点击刷新数据</el-button>
      选择币种：
      <el-select v-model="selectVal" placeholder="btc" @change="selectChange">
        <el-option
          v-for="item in selects"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>

      <chart v-if="activeName=='second'" :options="accountItem"></chart>
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
</style>

<script>
import {api} from '../utils'
import balanceItem from '../components/balanceItem.js'
import { Loading } from 'element-ui'
export default {
  data: function () {
    return {
      selectVal: 'btc',
      activeName: 'first',
      accountPreview: [],
      selects: [{value: 'btc'},{value: 'eth'},{value: 'usd'},{value: 'bch'}],
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
      let {data} = await api.getAccountPreview()   // 账户余额
      if (data.success) {
        this.accountPreview = data.data
        loadingInstance.close()               // 关闭loading
      }
    },
    // 获取收益数据
    async getAccount () {
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })
      const symbol = this.selectVal
      let {data} = await api.getAccount(symbol)   // 账户余额
      loadingInstance.close()                     // 关闭loading
      console.log(data)
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
    },

    // 列表切换
    handleTabClick(tab, event) {
      // console.log(tab, event)
      if (tab.name === 'second') {
        this.getAccount()
      }
    },
    // select 切换
    selectChange (e) {
      this.getAccount()
    },
    getClass (k, v) {
      return v
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
