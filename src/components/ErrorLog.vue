<template>
  <div>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="15"
      @current-change="handlePageChange"
      :total="tatolLog"
      class="text-center err-pagi">
    </el-pagination>
  </div>

</template>

<style>
.err-pagi {
  padding: 30px;
  margin-bottom: 30px;
}
</style>


<script>
  import {api} from '../utils'
  import { Loading } from 'element-ui'
  export default {
    data() {
      return {
        errorData: [],
        tatolLog: 0
      }
    },

    async beforeMount () {
      this.getErrorLog()
    },
    methods: {
      async getErrorLog (page = 1, limit = 15) {
        let loadingInstance = Loading.service({
          fullscreen: true,
          body: true,
          text: '数据加载中……'
        })
        let {data} = await api.getErrLog({
          limit: limit,
          skip: page * limit
        })   // 获取数据
        loadingInstance.close()              // 关闭loading
        this.errorData = data.data.errorLog
        this.tatolLog = data.data.tatol
        // console.log(data)
      },
      mysort (a, b) {
        return Number(parseFloat(a.price_usd) > parseFloat(b.price_usd))
      },
      formatterTime(row, column) {
        // console.log(row.price_usd)
        let t = new Date(row.timestamp)
        return (t.toLocaleDateString() + '-' + t.toLocaleTimeString())
      },
      handlePageChange (val) {
        this.getErrorLog(val)
      }
    }
  }
</script>
