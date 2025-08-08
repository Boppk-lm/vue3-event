
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
    loadToken() {
      const saveToken = localStorage.getItem('token')
      if(saveToken) {
        this.token =saveToken
      }
    },
    clearToken() {
      this.token = ''
      localStorage.removeItem('token')
    }

  }
})

