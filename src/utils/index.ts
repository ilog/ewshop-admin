import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { type Component } from 'vue';

// 传一个icon name 变成icon
export function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
import { type MenuOption } from 'naive-ui';

// 将路由集合转变成组件可以使用的状态
/* 
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
 */
export function generatorMenu(routerMap: Array<any>) {
    routerMap.sort((a, b) => a.meta.sort - b.meta.sort)
    let result = routerMap.map(item => {
        let menu: MenuOption = {
            label: item?.meta?.title,
            key: item?.name,
            icon: item?.meta?.icon,
            value: item?.meta?.value
        }
        if (item.children && item.children.length > 1) {
            menu.children = generatorMenu(item.children)
        }
        return menu
    })
    return result
}

