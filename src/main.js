import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import http from './common/axios.js'
import './common/vuequilleditor.js'
import {Api_url} from './common/config'
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$getimg = Api_url
Vue.use(ElementUI)
Vue.use(BaiduMap , {
    ak:"O595llz9ILgZx1YeTnhe5nsmbRLtSflc"
})

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app")
