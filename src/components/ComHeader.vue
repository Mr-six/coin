<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
  <el-menu-item index="1"><router-link :to="{ name: 'DashBoard'}">首页</router-link></el-menu-item>
  <el-submenu index="2">
    <template slot="title">交易详情</template>
    <el-menu-item index="2-1"><router-link :to="{ name: 'Profits'}">收益统计</router-link></el-menu-item>
    <el-menu-item index="2-2"><router-link :to="{ name: 'ExchangeTrades'}">交易所交易详情</router-link></el-menu-item>
    <el-menu-item index="2-3"><router-link :to="{ name: 'ProfitsPercent'}">盈利率统计</router-link></el-menu-item>
    <el-menu-item index="2-3"><router-link :to="{ name: 'TradeStatus'}">交易状态</router-link></el-menu-item>

  </el-submenu>
  <el-menu-item index="3" disabled><router-link :to="{ name: 'Account'}">用户中心</router-link></el-menu-item>
  <el-menu-item index="4" disabled><router-link :to="{ name: 'Status'}">系统监控</router-link></el-menu-item>
  <el-menu-item index="5"><router-link :to="{ name: 'TableCoin'}">数字货币行情</router-link></el-menu-item>
</el-menu>
</template>

<script>
  export default {
    name: 'com-header',
    data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
