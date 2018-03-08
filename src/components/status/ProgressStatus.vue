<template>
  <el-row :gutter="20">

    <el-col :span="24" class="progress-status">
      <h2 v-if="!progressData.length">获取不到move_bricks的进程数据</h2>
      <el-card v-if="progressData.length">
        <div slot="header">
          <span>move_bricks 进程状态</span>
        </div>
        <div>
          <div v-for="(row, i) in progressData" :key="i" class="line clearfix">
            <el-col :span="2" v-for="(e, i) in row" :key="i">
              <span>{{ (10 > i) ? e : '' }}</span>
            </el-col>
          </div>
        </div>
      </el-card>
    </el-col>

    <el-col :span="24" class="">
      <div v-for="(v, k) in exchangeStatus" :key="k">
        <el-col :span="12" class="status-card">
          <el-card>
            <div slot="header">
              <b>{{ k + ' 服务状态'}}</b>
            </div>
            <div class="status-card-item">
              <span>Deep WebSocket：</span>
              <el-tag :type="v.is_depth_websocket_ok ? 'success' : 'danger'">{{ v.is_depth_websocket_ok ? '链接正常' : '未链接' }}</el-tag>
            </div>
            <div class="status-card-item">
              <span>Order WebSocket：</span>
              <el-tag :type="v.is_order_websocket_ok ? 'success' : 'danger'">{{ v.is_order_websocket_ok ? '链接正常' : '未链接' }}</el-tag>
            </div>
            <div class="status-card-item">
              <span>Deep REST API：</span>
              <el-tag :type="v.is_order_rest_ok ? 'success' : 'danger'">{{ v.is_order_rest_ok ? '链接正常' : '未链接' }}</el-tag>
            </div>
            <div class="status-card-item">
              <span>Account REST API：</span>
              <el-tag :type="v.is_account_rest_ok ? 'success' : 'danger'">{{ v.is_account_rest_ok ? '链接正常' : '未链接' }}</el-tag>
            </div>
            <div class="status-card-item">
              <span>Order WebSocket Msg：</span>
              <el-tag :type="v.order_websocket_msg ? 'danger' : 'info'">{{ v.order_websocket_msg ? v.order_websocket_msg : '無消息' }}</el-tag>
            </div>
            <div class="status-card-item">
              <span>Order REST Msg：</span>
              <el-tag :type="v.order_rest_msg ? 'danger' : 'info'">{{ v.order_rest_msg ? v.order_rest_msg : '無消息' }}</el-tag>
            </div>
            <div class="status-card-item">
              <span>Deep WebSocket Msg：</span>
              <el-tag :type="v.depth_websocket_msg ? 'danger' : 'info'">{{ v.depth_websocket_msg ? v.depth_websocket_msg : '無消息' }}</el-tag>
            </div>
            <div class="status-card-item">
              <span>Deep WebSocket Restart：</span>
              <el-tag :type="v.depth_restart_time ? 'danger' : 'info'">{{ v.depth_restart_time ? v.depth_restart_time : '暂不需要重启' }}</el-tag>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-col>


  </el-row>
</template>

<style>
.progress-status {
  margin-bottom: 30px;
}
.status-card {
  padding-bottom: 30px;
}
.status-card-item {
  padding: 6px;
}
.status-card-item >span {
  display: inline-block;
  width: 40%;
  text-align: center;
}

.line {
  padding: 10px;
  text-align: left;
}
</style>


<script>
  import {api} from '../../utils'
  import { Loading } from 'element-ui'
  export default {
    data() {
      return {
        exchangeStatus: {},
        progressData: []
      }
    },

    async beforeMount () {
      this.getSysInfo()
    },
    methods: {
      async getSysInfo () {
        let loadingInstance = Loading.service({
          fullscreen: true,
          body: true,
          text: '数据加载中……'
        })

        let {data: exchangeStatus} = await api.getExchangeStatus()   // 获取交易所链接状态数据
        let {data: progressData} = await api.getProgressStatus()  // 进程数据
        loadingInstance.close()              // 关闭loading
        this.progressData = progressData.data  // 进程数据
        if (exchangeStatus.data instanceof Object) {
          const ExchangeStatus = exchangeStatus.data.ExchangeStatusStore

          for (let v in ExchangeStatus) {
            if (typeof ExchangeStatus[v] === 'string') {
              ExchangeStatus[v] = JSON.parse(ExchangeStatus[v])
            }
          }

          this.exchangeStatus = ExchangeStatus  // 交易所状态信息



          console.log(ExchangeStatus)
        }

      },
    },
    computed: {
      checkStatus: function (bool) {
        return bool ? 'success' : 'danger'
      }
    }
  }
</script>
