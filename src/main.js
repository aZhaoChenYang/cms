// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import http from './common/axios.js'
import './common/vuequilleditor.js'
// eslint-disable-next-line
import {Api_url} from './common/config'
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false
Vue.prototype.$http = http
// eslint-disable-next-line
Vue.prototype.$getimg = Api_url
Vue.use(ElementUI)
Vue.use(BaiduMap , {
    ak:"O595llz9ILgZx1YeTnhe5nsmbRLtSflc"
})

/* eslint-disable no-new */
//runtime

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
