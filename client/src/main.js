import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store/store"

import cookies from 'vue-cookies'
Vue.use(cookies)

import '@/assets/common/common.less'
// 字体图标
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'

import 'view-design/dist/styles/iview.css'
import { Button, Message, Modal, Icon, List, DropdownMenu, Dropdown, DropdownItem,
  RadioGroup, Radio, Page, Rate, Select, Option, Input, Upload, Table, Carousel, 
  CarouselItem, Spin} from 'view-design'

Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Modal', Modal)
Vue.component('List', List)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownItem', DropdownItem)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Page', Page)
Vue.component('Rate', Rate)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Input', Input)
Vue.component('Upload', Upload)
Vue.component('Table', Table)
Vue.component('Carousel', Carousel)
Vue.component('CarouselItem', CarouselItem)
Vue.component('Spin', Spin)

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

Vue.config.productionTip = false

// 获取 等级
Vue.filter('grade', (grade) =>{
  switch(grade){
    case 2:
      return '中级'
    case 3:
      return '高级'
    default:
      return '初级'
  }
})

Vue.filter('dateTime', (dateTime, flag) =>{

  dateTime = new Date(dateTime)

  const time = `${dateTime.getFullYear()}-${('0'+(1+dateTime.getMonth())).slice(-2)}-${('0'+dateTime.getDate()).slice(-2)}`
  // flag 存在 说明需要 带 小时分 否则不需要
  return !flag? time: `${time} ${('0'+dateTime.getHours()).slice(-2)}: ${('0'+dateTime.getMinutes()).slice(-2)}`
})


Vue.filter('filterNum', list =>{

  // 如果 不存在 返回 0
  if(!list) return 0

  return list.split('|').filter(n => n).length
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")