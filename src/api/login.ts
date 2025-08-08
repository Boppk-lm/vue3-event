// src/api/user.ts
import request from '@/utils/request'
// 定义请求参数类型
interface LoginParams {
  username:string
  password:string
}
// 定义返回数据类型
interface LoginResponse {
  code:number
  message:string
  token:string
}
// 登录接口
export const login = (data:LoginParams) => {
  return request.post<LoginResponse>('/api/login',data)
}
