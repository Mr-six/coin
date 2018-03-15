<template>
  <div id="app">
    <el-container>
      <el-header>
        <!-- <p class="header">数字货币项目</p> -->
        <com-header />
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<style>

</style>

<script>
  import  comHeader from './components/ComHeader'
  import {api} from './utils'
  export default {
    name: 'app',
    async beforeMount () {
      this.initTitle()
    },
    methods: {
      async initTitle () {
        let {data} = await api.getSysStatus()   // 获取数据
        let hostName = data.data.hostname
        if (hostName) document.title = hostName
      }
    },

    components: {
      comHeader
    }
  }
</script>
