/* eslint-disable */
import axios from 'axios'
import {
  Api_url
} from './config'
//创建axios实例
var service = axios.create({
  baseURL: Api_url,
  timeout: 5000
})

//添加响应拦截器
service.interceptors.response.use(function (response) {
  const res = response.data
  if (res.errno == 4101) {
    location.href = '/cms/#/login'
  }
  return res
})

export default {
  service,

  //get请求
  get (url, data) {
    return service({
      url: url,
      method: 'get',
      data
    })
  },
  //便于切换演示版
  get_show (url, data) {
    if (IsDemo) {
      check_demo()
      return
    }
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
  },
  //便于切换演示版
  put_show (url, data) {
    if (IsDemo) {
      check_demo()
      return
    }
    return service({
      url: url,
      method: 'put',
      data
    })
  }
}
