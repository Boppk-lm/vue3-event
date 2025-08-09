// src/api/user.ts
import request from '@/utils/request'
// 定义请求参数类型
interface ReginParams {
  username:string
  password:string
  repassword:string
}
// 定义返回数据类型
interface ReginResponse {
  code:number
  message:string
}
// 登录接口
export const register = (data:ReginParams) => {
  return request.post<ReginResponse>('/api/reg',data)
}
