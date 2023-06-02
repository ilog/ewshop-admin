<style scoped lang='scss'></style>

<template>
    <div class="p-5 h-58 bg-white">
        <div>
            <span class="text-slate-400 pr-2">首页</span>
            <span class="font-bold">/</span>
            <span class="pl-2 font-bold">用户管理</span>
        </div>
        <div class="pt-3"><span class="font-bold text-2xl">用户管理</span></div>
    </div>
    <div class="h-20 bg-white m-5 p-6">
        <div>
            <n-form :label-width="80" inline label-placement="left">
                <n-form-item label="姓名：" path="name">
                    <n-input v-model:value="search.name" placeholder="请输入姓名" />
                </n-form-item>
                <n-form-item label="邮箱：" path="email">
                    <n-input v-model:value="search.email" placeholder="请输入邮箱" />
                </n-form-item>
                <n-form-item class="ml-auto">
                    <n-button class="mr-4" attr-type="button" @click="searchReload">
                        重置
                    </n-button>
                    <n-button type="info" attr-type="button" @click="searchSubmit">
                        搜索
                    </n-button>
                </n-form-item>
            </n-form>
        </div>
    </div>
    <div class="px-5">
        <div class="bg-white">
            <div class="text-xl pt-4 py-4 pl-4">用户列表</div>
            <div>
                <n-data-table :columns="columns" :data="data" :bordered="false" />
                <div class="p-4 flex justify-end pr-10">
                    <n-pagination @update-page="updatePage" v-model:page="page" :page-count="totalPages" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { h, defineComponent } from 'vue'
import { NAvatar, NButton, NSwitch, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { api_getUserList } from '@/api/users';
const message = useMessage()
const columns = [
    {
        title: '头像',
        key: 'avatar_url',
        render(row: object) {
            // return h('img',{src:row.avatar_url,class:'w-10 h-10 rounded-full'})
            return h(NAvatar, { round: true, src: row['avatar_url'], size: 'medium' })
        }
    },
    {
        title: '姓名',
        key: 'name'
    },
    {
        title: '邮箱',
        key: 'email'
    },
    {
        title: '是否禁用',
        key: 'status',
        render(row) {
            return h(NSwitch, {
                size: 'medium',
                color: '#1890ff',
                activeColor: '##52c41a',
                inactiveColor: '#d9d9d9',
                activeValue: 1,
                inactiveValue: 0,
                value: row.is_locked === 1 ? false : true
            })
        }
    },
    {
        title: '创建时间',
        key: 'created_at'
    },
    {
        title: '操作',
        key: '',
        render(row) {
            return h(NButton, {
                size: 'small',
                color: '#1890ff',
                strong: true,
                onClick: () => {
                    message.info('正在编辑' + row.name)
                }
            }, '编辑')
        }
    }
]
const data = ref<object[]>([])
const totalPages = ref<number>(0)
const page = ref<number>(1)
// 初始化列表
const listInit = () => {
    api_getUserList({ current: page.value }).then(res => {
        data.value = res.data.data
        totalPages.value = res.data.meta.pagination.total_pages
        page.value = res.data.meta.pagination.current_page
    })
}
onMounted(() => {
   listInit()
})
// 更新页数 重新渲染
const updatePage = (pageNum: number) => {
    page.value = pageNum
    listInit()
}

interface search {
    email: string,
    name: string
}
const search = reactive<search>({
    email: '',
    name: ''
})

const searchReload = () => {

}
const searchSubmit = () => {

}
</script>