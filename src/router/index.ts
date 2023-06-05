import { createRouter, createWebHistory } from 'vue-router'
import { createVNode, render } from 'vue'
import loadingBar from '@/components/loadingBar.vue'
// 通过createVNode方法将组件转成虚拟dom
const Vnode = createVNode(loadingBar)
//通过render函数将虚拟dom挂在到页面
render(Vnode, document.body)

// 定义路由元信息 meta里的信息
declare module 'vue-router' {
    interface RouteMeta {
        title: string,
    }
}
// 把modules下的所有文件都导入
import  {type RouteRecordRaw } from 'vue-router'
const modules = import.meta.glob('./modules/**/*.ts', { eager: true, import: 'default' })
const routeModuleList: RouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
    const mod = modules[key] || {};
    const modList = Array.isArray(mod) ? [...mod] :[mod]
    routeModuleList.push(...modList)
})


const Login = () => import('@/views/login/index.vue')
const baseRoutes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { title: 'Login' }
    },
]
const routes = [...baseRoutes,...routeModuleList]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})
// 前置守卫
router.beforeEach((to) => {
    // 刚进入页面加载进度条
    Vnode.component?.exposed?.startLoading()
    document.title = (to?.meta?.title) ?? document.title
    if (to.name !== 'login' && !localStorage.getItem('token')) {
        return '/login'
    } else if (to.name === 'login' && localStorage.getItem('token')){
        return '/dashboard'
    }
    return
})
// 后置守卫
router.afterEach((to,from) => {
    // 结束页面结束进度条
    Vnode.component?.exposed?.endLoading()
})

export { routeModuleList }
export default router
