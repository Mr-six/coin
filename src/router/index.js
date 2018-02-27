import Vue from 'vue'
import Router from 'vue-router'
import TableCoin from "@/components/TableCoin"
import CoinCharts from '@/components/CoinCharts'
import Trades from '@/components/Trades'
import Account from '@/components/Account'
import ProfitsPercent from '@/components/ProfitsPercent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Trades',
      component: Trades
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/ProfitsPercent',
      name: 'ProfitsPercent',
      component: ProfitsPercent
    },
    {
      path: '/tableCoin',
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
