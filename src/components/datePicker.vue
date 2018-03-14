<template>
  <el-row :gutter="20">
    <el-button type="primary" icon="el-icon-refresh" @click="getPeriodData">点击刷新数据</el-button>
    <el-col :span="24">
      <div class="block">
        <p>选择日期</p>
        <el-date-picker
          v-model="period"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          value-format="timestamp"
          :picker-options="pickerOptions"
          @change="getPeriodData">
        </el-date-picker>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {api} from '../utils'
export default {
  data: function () {
    return {
      startDate: '',
      endDate: '',
      pickerOptions: {
        disabledDate: (time) => {
          if (this.startDate && this.endDate) {
            const startDate = this.startDate - 24 * 3600 * 1000  //  当前天数是以零点开始计算的
            const d = time.getTime()
            return (d < startDate || d > this.endDate)
          }
        }
      }
    }
  },
  props: {
    handlerDateChange: {
      type: Function,
      require: true
    },
    // zoom: {
    //   type: Object,
    // }
  },
  async beforeMount () {
    await this.initAvailablePeriod()
    await this.getPeriodData()
  },
  computed: {
    period: {
      get () {
        return this.$store.getters.getPeriod
      },
      set (value) {
        this.$store.dispatch('changePeriod', value)
      }
    }
  },
  methods: {
    // 初始化数据可用日期
    async initAvailablePeriod () {
      try {
        const period = await api.getAvailablePeriod()
        this.startDate = period.start
        this.endDate = period.end
      } catch (e) {
        console.log(e)
      }
    },
    async getPeriodData () {
      if (!this.period || !this.period.length) return
      const start = (new Date(this.period[0])).getTime()
      const end = (new Date(this.period[1])).getTime()
      this.handlerDateChange(start, end)
    }
  },
  watch: {
    // zoom(n, o) {
    //   if (!this.period || !this.period.length) return
    //   if (n.start || n.end) {
    //     console.log(this.period)
    //     let dist = this.period[1] - this.period[0]

    //     let start = this.period[0] + dist * (n.start ? n.start : 100) / 100
    //     let end = this.period[0] + dist * (n.end ? n.end : 100) / 100
    //     this.period = [start, end]
    //     console.log(this.period)
    //     this.getPeriodData()
    //   }
    // }
  }
}
</script>
