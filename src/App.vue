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
  body {
    margin: 0;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
  .el-header {
    padding: 0;
  }
  .header {
    text-align: center;
  }
  .text-center {
    text-align: center;
  }
  .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
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
