import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TableCoin from "@/components/TableCoin"
import CoinCharts from '@/components/CoinCharts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TableCoin',
      component: TableCoin
    },
    {
      path: '/chart/:id',
      name: 'CoinCharts',
      component: CoinCharts
    }
  ]
})
