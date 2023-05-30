<style scoped>

</style>

<template>
    <div>
        <n-menu 
        inverted 
        @update:value="handleUpdateValue" 
        :options="menuOptions" />
    </div>
</template>

<script setup lang='ts'>
import type { MenuOption } from 'naive-ui';
import { routeModuleList } from '@/router';
import { generatorMenu } from '@/utils/index'
import { useRouter,useRoute } from 'vue-router';
const router = useRouter();

// const defaultKey = ref()
// onMounted(()=>{
//   const route = useRoute();
//   console.log(route.name);
//   // 获取当前路由的key
//    defaultKey.value = route.name;
// })
const handleUpdateValue = (key: string, item: MenuOption):void => {
    router.push({name:key})
}
const menuOptions: MenuOption[] = generatorMenu(routeModuleList)

</script>