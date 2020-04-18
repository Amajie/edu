import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import '@/assets/common/common.less'
// 字体图标
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")