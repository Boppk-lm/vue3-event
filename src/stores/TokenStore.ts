
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', {
  state: ()=> ({
    token:'' as string
  }),
  actions: {
    setToken(token:string) {
      this.token = token
      localStorage.setItem('token',token)
    },
    getToken() {
      const saveToken = localStorage.getItem('token')
      return saveToken
    },
    clearToken() {
      this.token = ''
      localStorage.removeItem('token')
    }

  }
})

