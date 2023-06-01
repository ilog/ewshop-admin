<style scoped lang="scss">
.content {
    .img {
        display: flex;
        align-items: center;
        .text {
            margin-left: 8px;
        }
    }
}
</style>

<template>
    <div class="content">
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
            <div class="img">
                <n-avatar round size="small" src="https://api.shop.eduwork.cn/image/avatar.png"></n-avatar>
                <span class="text">{{ useStore.username }}</span>
            </div>
        </n-dropdown>
    </div>
</template>
<script setup lang='ts'>
import { renderIcon } from '@/utils';
import { ref } from 'vue';
import { LogOutOutline } from '@vicons/ionicons5';
import { useUserStore } from '@/stores/index';
const useStore = useUserStore()


import { api_logout } from '@/api/auth';
const options = ref([
    {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogOutOutline)
    }
])
const handleSelect = (key:string) => {
    switch (key) {
        case 'logout' : api_logout().then(()=>{
            localStorage.removeItem('token');
            window.location.reload()
        });break;
        default: break;
    }
}
</script>