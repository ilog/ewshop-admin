import type { RouteRecord } from "vue-router";
import { NIcon } from "naive-ui";
import { renderIcon } from '@/utils'
import { Browsers } from "@vicons/ionicons5";
const routeName = 'dashboard'

import Layout from '@/layout/index.vue'
const routes: Array<RouteRecord> = [
    {
        path: '/dashboard',
        name: routeName,
        component: Layout,
        redirect: '/dashboard/console',
        meta: {
            title: '首页管理',
            icon: renderIcon(Browsers),
            sort: 0,
        },
        children: [
            {
                path: 'console',
                name: `${routeName}_console`,
                component: () => import('@/views/layout/dashboard/index.vue'),
                meta: {
                    title: '主控台'
                },
            }
        ]
    }
]
export default routes