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
        <el-progress :text-inside="true" :stroke-width="18" :percentage="infoData.memory.memoryRate" status="exception"></el-progress>
        <p>可用内存: {{infoData.memory.memoryFree}} G</p>
        <p>内存总量: {{infoData.memory.totalMem}} G</p>
      </el-card>
    </el-col>

    <el-col :span="24" class="cpu-card">
      <el-card>
        <div slot="header">
          <span>cpu使用情况</span>
        </div>
        <el-col :span="6" v-if="cpusData.length" v-for="(e, i) in cpusData" :key="i" class="text-center">
          <el-progress type="circle" :percentage="e.useRate"></el-progress>
          <h5>{{e.model}}</h5>
        </el-col>
      </el-card>
    </el-col>
    <el-col :span="24" class="cpu-card">
      <el-card>
        <div slot="header">
          <span>文件系统</span>
        </div>
        <div>
          <div v-for="(row, i) in infoData.dirc" :key="i" class="line clearfix">
            <el-col :span="4" v-for="(e, i) in row" :key="i">
              <span>{{ e }}</span>
            </el-col>
          </div>
        </div>
      </el-card>
    </el-col>

  </el-row>
</template>

<style>
.cpu-card {
  padding: 30px 0 0 0;
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
        infoData: '',
        cpusData: []
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
        let {data} = await api.getSysStatus()   // 获取数据
        loadingInstance.close()              // 关闭loading
        this.infoData = data.data
        const cpus = data.data.cpus ? data.data.cpus : []
        if (cpus.length) {
          cpus.forEach((el, i) => {
            let all = Object.values(el.times).reduce((a, b) => a + b)
            let idle = el.times.idle
            let idleRate = parseFloat((idle / all * 100).toFixed(2))
            let useRate = parseFloat((100 - idleRate).toFixed(2))
            let model = el.model
            this.cpusData.push({
              model,
              useRate
            })
          })
        }
        console.log(this.infoData)
      },
    },
    computed: {
    }
  }
</script>
