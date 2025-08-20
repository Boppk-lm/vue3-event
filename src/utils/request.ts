// src/utils/request.ts
import axios from 'axios'
import router from '@/router'
import { useTokenStore } from '@/stores/TokenStore'
import { ElMessage } from 'element-plus'
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
    if (res.data.code !== 0 && res.data.code) {
      ElMessage.error(res.data.message || '出现错误')
      return Promise.reject(new Error(res.data.message || 'Error'))
    }
    return res
  },
  (error) => {
    // HTTP 非 2xx，处理 401
    if (error.response) {
      if (error.response.status === 401) {
        const tokenStore = useTokenStore()
        tokenStore.clearToken()
        ElMessage.error('身份已过期，请重新登录')
        router.push('/login')
      } else {
        // 其他 HTTP 错误
        ElMessage.error(error.response.data?.message || `请求错误: ${error.response.status}`)
      }
    } else {
      ElMessage.error(error.message || '接口请求失败')
    }
    return Promise.reject(error)
  }
)

export default service
