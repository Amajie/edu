import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store/store"

import '@/assets/common/common.less'
// 字体图标
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'

import 'view-design/dist/styles/iview.css'
import { Button, Message, Modal, Icon, List, DropdownMenu, Dropdown, DropdownItem} from 'view-design'

Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Modal', Modal)
Vue.component('List', List)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownItem', DropdownItem)

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")