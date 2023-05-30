<style scoped lang="scss">
.n-sider {
    background-color: #001529;
    height: 100vh;
    .logo {
        padding: 20px;
        margin-left: 20%;
    }
}

.n-header {
    display: flex;
    align-items: center;
    justify-content: end;
    height: 50px;
    border-bottom: 1px solid #ccc;
    padding-right: 20px;
}

.n-content {
    max-height: calc(100vh - 130px);
    height: calc(100vh - 130px);
    background: #F0F2F5;
}

.n-footer {
    text-align: center;
}
</style>

<template>
    <n-layout has-sider>
        <n-layout-sider bordered="true" class="n-sider">
            <div class="logo">
                <img src="@/assets/img/logo.jpg" alt="">
            </div>
            <PageSider></PageSider>
        </n-layout-sider>
        <n-layout>
            <n-layout-header>
                <PageHeader class="n-header"></PageHeader>
            </n-layout-header>
            <n-layout-content class="n-content">
                <RouterView></RouterView>
            </n-layout-content>
            <n-layout-footer>
                <div class="n-footer">
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