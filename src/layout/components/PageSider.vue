<style scoped></style>

<template>
    <div>
        <n-menu inverted v-model:value="defaultKey" 
        @update:value="handleUpdateValue" 
        :options="menuOptions" />
    </div>
</template>

<script setup lang='ts'>
import type { MenuOption } from 'naive-ui';
import { routeModuleList } from '@/router';
import { generatorMenu } from '@/utils/index'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

const defaultKey = ref()
const route = useRoute();
onMounted(() => {
    // const route = useRoute();
    defaultKey.value = route.name;
})

// 点击列表触发事件
const handleUpdateValue = (key: string): void => {
    // 通过name来跳转页面 key在generatorMenu方法里定义
    router.push({ name: key })
}
// 将路由列表routeModulesList通过generatorMenu 方法转成menu组件支持的数据格式
const menuOptions: MenuOption[] = generatorMenu(routeModuleList)

</script>