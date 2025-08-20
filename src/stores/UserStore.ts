import { getUser } from "@/api/user";
import { defineStore } from "pinia";

export interface UserItem {
  id: string
  username: string
  nickname: string
  email: string
  user_pic: string | null
}

export const useUserStore = defineStore('user', {
  state: (): { userinfo: UserItem } => ({
    userinfo: {
      id: '',
      username: '',
      nickname: '',
      email: '',
      user_pic: null
    }
  }),
  actions: {
    async getUserinfo() {
      const { data: { data: res } } = await getUser()
      this.userinfo = res
      console.log( this.userinfo); //{id: 56209, username: 'lvmeng123', nickname: '', email: '', user_pic: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…+FEGlma8m/wBd6V1o+G+i4/5ZH3q7af8ALepgOKxdQx52j//Z'}
    }
  }
})
