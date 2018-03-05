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
  export default {
    name: 'app',
    components: {
      comHeader
    }
  }
</script>
