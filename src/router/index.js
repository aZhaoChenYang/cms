import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'
import dramaIndex from '../views/drama/dramaIndex.vue'
import dramaAdd from '../views/drama/dramaAdd.vue'
import shopIndex from '../views/shop/shopIndex.vue'
import shopAdd from '../views/shop/shopAdd.vue'
import shopEdit from '../views/shop/shopEdit.vue'
import userIndex from '../views/user/userIndex.vue'
import adminIndex from '../views/admin/adminIndex.vue'
import labelIndex from '../views/label/labelIndex.vue'
import setIndex from '../views/set/setIndex.vue'
import orderIndex from '../views/order/orderIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/dramaIndex',
      name: 'dramaIndex',
      component: dramaIndex
    }, {
      path: '/dramaIndex/dramaAdd',
      name: 'dramaAdd',
      component: dramaAdd
    }, {
      path: '/shopIndex',
      name: 'shopIndex',
      component: shopIndex
    }, {
      path: '/shopIndex/shopAdd',
      name: 'shopAdd',
      component: shopAdd
    }, {
      path: '/shopIndex/shopEdit',
      name: 'shopEdit',
      component: shopEdit
    }, {
      path: '/userIndex',
      name: 'userIndex',
      component: userIndex
    }, {
      path: '/adminIndex',
      name: 'adminIndex',
      component: adminIndex
    }, {
      path: '/labelIndex',
      name: 'labelIndex',
      component: labelIndex
    }, {
      path: '/orderIndex',
      name: 'orderIndex',
      component: orderIndex
    }, {
      path: '/setIndex',
      name: 'setIndex',
      component: setIndex
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: () => import('../views/swiper/swiper.vue')
    }]
})
