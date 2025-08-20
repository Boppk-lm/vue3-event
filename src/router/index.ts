import { useTokenStore } from '@/stores/TokenStore'
import { useUserStore } from '@/stores/UserStore'
import { createRouter, createWebHistory } from 'vue-router'
const Login = () => import('@/views/LoginView.vue')
const Layout = () => import('@/views/LayoutView.vue')
const Register = () => import('@/views/RegisterView.vue')
const Home = () => import('@/views/layout/HomeView.vue')
const Avatar = () => import('@/views/layout/AvatarView.vue')
const User = () => import('@/views/layout/UserView.vue')
const Userpwd = () => import('@/views/layout/UserpwdView.vue')
const Atrcate = () => import('@/views/layout/AtrcateView.vue')
const Atrlist = () => import('@/views/layout/AtrlistView.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: Layout,
      children: [
       {
         path:'home',
        component:Home
       },
        {
        // 基本资料
        path: 'user-info',
        component: User
      },
      {
        // 用户头像
        path: 'user-avatar',
        component: Avatar
      },
      {
        // 重置密码
        path: 'user-pwd',
        component: Userpwd
      },
      {
        // 文章分类
        path: 'art-cate',
        component: Atrcate
      },
      {
        // 文章列表
        path: 'art-list',
        component: Atrlist
      }
      ]
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
router.beforeEach(async (to, from, next) => {
  // console.log(to, from, next)
  // 看 to.path 是否在 authUrls 中出现过
  if  (authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }

  // 是权限页面，需要判断token
  const tokenStore = useTokenStore()
  const token =tokenStore.getToken()
  const UserStore = useUserStore()
  if (token) {
    if(UserStore.userinfo.id) {
      await UserStore.getUserinfo()
    }
    next()
  } else {
    next('/login')
  }
})
export default router
