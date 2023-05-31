import { createRouter, createWebHistory } from 'vue-router'


const Login = () => import('@/views/login/index.vue')
const baseUrl = [
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        name:'Login',
        component:Login
    }

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseUrl
})

export default router
