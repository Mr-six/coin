<template>
  <div id="app">
    <el-container>
      <el-header>
        <p class="header">数字货币项目</p>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .header {
    text-align: center;
  }
</style>
