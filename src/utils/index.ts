import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { type Component } from 'vue';

// 传一个icon name 变成icon
export function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}


import { type MenuOption } from 'naive-ui';

// 将路由集合转变成组件可以使用的状态

export function generatorMenu(routerMap: Array<any>) {
    // 排序 按照meta里的sort 小的在上
    routerMap.sort((a, b) => a.meta.sort - b.meta.sort)
    // 遍历
    let result = routerMap.map(item => {
        let menu: MenuOption = {
            label: item?.meta?.title,
            key: item?.name,
            icon: item?.meta?.icon,
        }
        if (item.children && item.children.length > 1) {
            menu.children = generatorMenu(item.children)
        }else if (item.children && item.children.length === 1){
			menu.key = item?.children[0].name;
		}
        return menu
    })
    return result
}

