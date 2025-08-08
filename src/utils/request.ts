// src/utils/request.ts
import axios from 'axios'
import router from '@/router'
import { useTokenStore } from '@/stores/TokenStore'
// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 5000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 自动携带 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response
    if (res.status !== 200) {
      console.error(res.data.message || '请求错误')
      return Promise.reject(new Error(res.data.message || 'Error'))
    }
    // 业务层code判断
    if (res.data.code === 401) {
      // token 过期处理逻辑
      const tokenStore = useTokenStore()
      tokenStore.clearToken() // 清除token
      // 跳转登录页，防止无限循环登录可以做判断
      router.push('/login')

      return Promise.reject(new Error('身份已过期，请重新登录'))
    }

    if (res.data.code !== 0) {
      return Promise.reject(new Error(res.data.message || '业务错误'))
    }
    return res
  },
  (error) => {
    console.error('接口异常:', error)
    return Promise.reject(error)
  },
)

export default service
