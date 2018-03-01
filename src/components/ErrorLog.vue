<template>
  <el-table
    :data="errorData"
    style="width: 100%"
    >
    <el-table-column
      prop="timestamp"
      :formatter="formatterTime"
      sortable
      label="timestamp">
    </el-table-column>
    <el-table-column
      label="level">
      <template slot-scope="scope">
        <el-tag type="danger">{{ scope.row.level }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="threadName"
      sortable
      label="threadName">
    </el-table-column>
    <el-table-column
      prop="fileName"
      sortable
      label="fileName">
    </el-table-column>

    <el-table-column
      prop="lineNumber"
      label="lineNumber">
    </el-table-column>
    <el-table-column
      prop="message"
      label="message">
    </el-table-column>
  </el-table>
</template>

<script>
  import {api} from '../utils'
  import { Loading } from 'element-ui'
  export default {
    data() {
      return {
        errorData: []
      }
    },

    async beforeMount () {
      this.getErrorLog()
    },
    methods: {
      async getErrorLog () {
        let loadingInstance = Loading.service({
          fullscreen: true,
          body: true,
          text: '数据加载中……'
        })
        let {data} = await api.getErrLog()   // 获取数据
        loadingInstance.close()              // 关闭loading
        this.errorData = data.data
        console.log(data)
      },
      mysort (a, b) {
        return Number(parseFloat(a.price_usd) > parseFloat(b.price_usd))
      },
      formatterTime(row, column) {
        // console.log(row.price_usd)
        let t = new Date(row.timestamp)
        return (t.toLocaleDateString() + '-' + t.toLocaleTimeString())
      }
    }
  }
</script>
