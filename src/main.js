import Vue from 'vue'

import App from './App'
import router from './router'
// import store from './store'
import './style/main.css'
import datePicker from './components/datePicker'

// element ---------------------
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)

import {
  Table,
  TableColumn,
  Header,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Main,
  Container,
  Tabs,
  TabPane,
  Button,
  Card,
  Row,
  Select,
  Option,
  Col,
  Aside,
  Progress,
  Pagination,
  DatePicker,
  Tag,
  TimeSelect,
  TimePicker,
} from 'element-ui'

Vue.use(Header)
Vue.use(Main)
Vue.use(Table)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
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
Vue.use(Tag)
Vue.use(Aside)
Vue.use(Progress)
Vue.use(Pagination)
Vue.use(DatePicker)
// Vue.use(TimePicker)
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

Vue.component('datePicker', datePicker)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
