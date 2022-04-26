/* eslint-disable */
import axios from 'axios'
import { Api_url } from './config'
import ElementUI from 'element-ui'
//创建axios实例
var service = axios.create({
  baseURL: Api_url,
  timeout: 5000
})

//添加响应拦截器
service.interceptors.response.use(response => {
  // 对响应数据做点什么
  if (response.data.code === 401) {
    ElementUI.Message.error('登录超时，请重新登录')
    setTimeout(() => {
      window.location.href = '/cms/#/login'
    }, 1000)
  } else if (response.data.code === 0) {
    return response.data
  } else {
    ElementUI.Message.error(response.data.message)
    return Promise.reject()
  }
}, error => {
  // 对响应错误做点什么
  ElementUI.Message.error('网络错误，请稍后重试')
  return Promise.reject(error)
})

service.interceptors.request.use(request => {
  if (localStorage.getItem('Authorization')) {
    request.headers.Authorization = localStorage.getItem('Authorization')
  }
  return request
})

export default {
  //get请求
  get (url, data) {
    return service({
      url: url,
      method: 'get',
      data
    })
  },
//post请求
  post (url, data) {
    return service({
      url: url,
      method: 'post',
      data
    })
  },
  //便于切换演示版
  post_show (url, data) {
    if (IsDemo) {
      check_demo()
      return
    }
    return service({
      url: url,
      method: 'post',
      data
    })
  },
  //put请求
  put (url, data) {
    return service({
      url: url,
      method: 'put',
      data
    })
  },

  delete (url, data) {
    return service({
      url: url,
      method: 'delete',
      data
    })
  }
}
