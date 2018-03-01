import Vue from 'vue'
import Router from 'vue-router'

import DashBoard from '../view/DashBoard'
import Profits from '../view/Profits'
import ExchangeTrades from '../view/ExchangeTrades'
import ProfitsPercent from '../view/ProfitsPercent'
import Account from '../view/Account'
import TableCoin from '../view/TableCoin'
import TradeStatus from '../view/TradeStatus'
import Status from '../view/Status'
import ErrorLog from '../components/ErrorLog'
import PlatformInfo from '../components/PlatformInfo'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/Profits',
      name: 'Profits',
      component: Profits
    },
    {
      path: '/TradeStatus',
      name: 'TradeStatus',
      component: TradeStatus
    },
    {
      path: '/ExchangeTrades',
      name: 'ExchangeTrades',
      component: ExchangeTrades
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
      path: '/Status',
      name: 'Status',
      component: Status,
      children: [
        {
          path: 'PlatformInfo',
          name: 'PlatformInfo',
          component: PlatformInfo
        },
        {
          path: 'ErrorLog',
          name: 'ErrorLog',
          component: ErrorLog
        }
      ]
    }
  ]
})
