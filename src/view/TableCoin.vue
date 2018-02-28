<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      prop="rank"
      label="rank">
    </el-table-column>
    <el-table-column
      prop="name"
      label="name"
      sortable>
    </el-table-column>
    <el-table-column
      prop="price_usd"
      sortable
      :formatter="formatter"
      label="price">
    </el-table-column>
    <el-table-column
      prop="market_cap_usd"
      sortable
      label="market_cap">
    </el-table-column>

    <el-table-column
      prop="percent_change_1h"
      sortable
      label="change_1h">
    </el-table-column>
    <el-table-column
      prop="percent_change_24h"
      sortable
      label="change_24h">
    </el-table-column>
    <el-table-column
      prop="percent_change_7d"
      sortable
      label="change-7d"
      >
    </el-table-column>
  </el-table>
</template>

<script>
  import {api} from '../utils'
  import { Loading } from 'element-ui'
  export default {
    data() {
      return {
        tableData: []
      }
    },

    async beforeMount () {
      let loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        text: '数据加载中……'
      })
      let {data} = await api.getAllCoin()  // 首页列表
      // let {data} = await api.getPriceById('bitcoin')  // 价格趋势
      // let {data} = await api.getCoinRedditSub('bitcoin')  // 订阅趋势
      loadingInstance.close()               // 关闭loading
      this.tableData = data
      console.log(data)
    },
    methods: {
      mysort (a, b) {
        return Number(parseFloat(a.price_usd) > parseFloat(b.price_usd))
      },
      formatter(row, column) {
        // console.log(row.price_usd)
        return parseFloat(row.price_usd)
      }
    }
  }
</script>
