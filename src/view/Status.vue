<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <router-link :to="{ name: 'PlatformInfo'}">平台信息</router-link>
          <!-- <span slot="title">平台信息</span> -->
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <router-link :to="{ name: 'ErrorLog'}">错误日志</router-link>
          <!-- <span slot="title"></span> -->
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">其他</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>测试</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
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
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
