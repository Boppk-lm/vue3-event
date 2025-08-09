import { useTokenStore } from '@/stores/TokenStore'
import { createRouter, createWebHistory } from 'vue-router'
const Login = () => import('@/views/LoginView.vue')
const Home = () => import('@/views/HomeView.vue')
const Register = () => import('@/views/RegisterView.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: Home,
    },
    {
      path: '/login',
      component: Login,
    },
      {
      path: '/register',
      component: Register,
    },
  ],
})
// 权限界面 路由守卫
// 定义一个数组，专门用户存放所有不需要权限访问的页面
const authUrls = ['/login', '/register']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看 to.path 是否在 authUrls 中出现过
  if (authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }

  // 是权限页面，需要判断token
  const tokenStore = useTokenStore()
  const token =tokenStore.getToken()
  if (token) {
    // if (!store.state.userinfo.username) {
    // // 从vuex获取用户数据
    //   store.dispatch('getUserinfo')
    // }
    next()
  } else {
    next('/login')
  }
})
export default router
