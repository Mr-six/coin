// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// element ---------------------
import {
  Table,
  TableColumn,
  Header,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Main,
  Container,
  Tabs,
  TabPane,
  Button,
  Card,
  Row,
  Select,
  Option,
  Col
} from 'element-ui'

Vue.use(Header)
Vue.use(Main)
Vue.use(Table)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(TableColumn)
Vue.use(Container)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Button)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Option)
// element ---------------------

// echarts ---------------------
import ECharts from 'vue-echarts/components/ECharts.vue'

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/dataset'
import 'echarts/lib/chart/pie'

// import 'echarts/lib/chart/map'
// import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/scatter'
// import 'echarts/lib/chart/effectScatter'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/geo'
// import 'echarts/lib/component/visualMap'


// 注册组件后即可使用
Vue.component('chart', ECharts)
// echarts ---------------------




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
