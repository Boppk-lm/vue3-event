import request from '@/utils/request'
// 请求文章数据
export const getarticle = () => {
  return request.get('/my/cate/list')
}
export interface article {
  id?: number
  cate_name: string
  cate_alias: string
}

// 新增文章数据
export const addarticle = (data: article) => {
  return request.post('/my/cate/add', data)
}

// 修改文章数据
export const updatearticle = (data: article) => {
  return request.put('/my/cate/info', data)
}
// 删除文章数据
export const deletearticle = (id:number) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}
