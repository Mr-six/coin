<template>
  <el-row :gutter="20" v-if="infoData">
    <el-col :span="8">
      <el-card>
        <div slot="header">
          <span>系统信息</span>
        </div>
        <p>系统平台：{{infoData.platform + ' ' + infoData.arch}}</p>
        <p>主机名称：{{infoData.hostname}}</p>
        <p>发行版本：{{infoData.release}}</p>
      </el-card>
    </el-col>

    <el-col :span="8">
      <el-card>
        <div slot="header">
          <span>平均负载</span>
        </div>
        <p>1min: {{infoData.loadavg[0]}}</p>
        <p>5min: {{infoData.loadavg[1]}}</p>
        <p>15min: {{infoData.loadavg[2]}}</p>
      </el-card>
    </el-col>

    <el-col :span="8">
      <el-card>
        <div slot="header">
          <span>内存占用</span>
        </div>
        <el-progress :percentage="10"></el-progress>
        <p>内存总量: {{infoData.memory.totalmem}} G</p>
        <p>空闲内存: {{infoData.memory.freemem}} G</p>
      </el-card>
    </el-col>

  </el-row>
</template>

<script>
  import {api} from '../utils'
  import { Loading } from 'element-ui'
  export default {
    data() {
      return {
        infoData: ''
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
        let {data} = await api.getSysStatus()   // 获取数据
        loadingInstance.close()              // 关闭loading
        this.infoData = data.data
        console.log(this.infoData)
      },
    }
  }
</script>
