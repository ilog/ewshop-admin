<style scoped lang="scss">
.n-content {
    max-height: calc(100vh - 90px);
    height: calc(100vh - 00px);
    background: #F0F2F5;
}
</style>

<template>
    <n-layout has-sider>
        <n-layout-sider bordered=true class="h-screen bg-[#001529]">
            <div>
                <img class="p-5 ml-11" src="@/assets/img/logo.jpg" alt="">
            </div>
            <PageSider></PageSider>
        </n-layout-sider>
        <n-layout>
            <n-layout-header>
                <PageHeader></PageHeader>
            </n-layout-header>
            <n-layout-content class="n-content">
                <RouterView></RouterView>
            </n-layout-content>
            <n-layout-footer>
                <div class="text-center">
                    <span>Copyright © 2020</span>
                </div>
            </n-layout-footer>
        </n-layout>
    </n-layout>
</template>

<script setup lang='ts'>
import PageSider from './components/PageSider.vue';
import PageHeader from './components/PageHeader.vue';

import { useMessage } from 'naive-ui';
window.$message = useMessage();
</script>