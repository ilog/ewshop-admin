import type { RouteRecord } from "vue-router";
import Layout from '@/layout/index.vue'
import { renderIcon } from '@/utils'
import {FilmSharp} from '@vicons/ionicons5'

const routeName = 'slide'

const routes: Array<RouteRecord> = [
    {
        path: '/slide',
        name: routeName,
        component: Layout,
        redirect: '/slide/list',
        meta: {
            title: '轮播管理',
            icon: renderIcon(FilmSharp),
            sort:3,
            permissions:['slide','admin']
        },
        children: [
            {
                path: 'list',
                name: `${routeName}_list`,
                meta: {
                    title: '轮播列表',
                    icon: renderIcon(FilmSharp),
                },
                component: () => import('@/views/layout/slide/index.vue'),
            }]
    }
]
export default routes