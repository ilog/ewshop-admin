import type { RouteRecord } from "vue-router";
import Layout from '@/layout/index.vue'
import { NIcon } from "naive-ui";
import { renderIcon } from '@/utils'
import {Body} from '@vicons/ionicons5'

const routeName = 'user'

const routes: Array<RouteRecord> = [
    {
        path: '/users',
        name: routeName,
        component: Layout,
        redirect: '/users/list',
        meta: {
            title: '用户管理',
            icon: renderIcon(Body),
            sort:1,
            permissions:['users','admin']
        },
        children: [
            {
                path: 'list',
                name: `${routeName}_list`,
                meta: {
                    title: '用户列表',
                    icon: renderIcon(Body),
                },
                component: () => import('@/views/layout/user/index.vue'),
            }]
    }
]
export default routes