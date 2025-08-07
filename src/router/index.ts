import { createRouter, createWebHistory } from 'vue-router'
const Login = () => import('@/views/LoginView.vue')
const Home = () => import('@/views/HomeView.vue')
const Register = () => import('@/views/RegisterView.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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

export default router
