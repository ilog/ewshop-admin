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
                    <n-button class="mr-4" attr-type="button" @click.prevent="searchReload">
                        重置
                    </n-button>
                    <n-button type="info" attr-type="button" @click.prevent="searchSubmit">
                        搜索
                    </n-button>
                </n-form-item>
            </n-form>
        </div>
    </div>
    <div class="px-5">
        <div class="bg-white">
            <div class="text-xl px-5 py-4  flex justify-between">
                <span>用户列表</span>
                <span><n-button @click.prevent="showModal = true">添加用户</n-button></span>
            </div>
            <div>
                <n-data-table :columns="columns" :data="data" :bordered="false" />
                <div class="p-4 flex justify-end pr-10">
                    <n-pagination @update-page="updatePage" v-model:page="page" :page-count="totalPages" />
                </div>
            </div>
        </div>
    </div>
    <add-user :reform="true" :showModal="showModal" @changeShowModal="changeShowModal" @reloadTable="reload"></add-user>
    <edit-user v-if="showEditModal" :user_id="user_id" :showEditModal="showEditModal" @changeEditModal="changeEditModal" @reloadTable="reload"></edit-user>
</template>

<script setup lang='ts'>
import AddUser from './components/AddUser.vue';
import EditUser from './components/EditUser.vue';
import { h } from 'vue'
import { NAvatar, NButton, NSwitch, useMessage } from 'naive-ui'
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
                    user_id.value = row.id 
                    showEditModal.value = true
                }
            }, '编辑')
        }
    }
]
const data = ref<object[]>([])
const totalPages = ref<number>(0)
const page = ref<number>(1)
// 初始化列表
const listInit = (params: object) => {
    api_getUserList(params).then(res => {
        data.value = res.data.data
        totalPages.value = res.data.meta.pagination.total_pages
        page.value = res.data.meta.pagination.current_page
    })
}
interface search {
    email: string,
    name: string
}
const search = reactive<search>({
    email: '',
    name: ''
})

onMounted(() => {
    listInit({})
})
// 更新页数 重新渲染
const updatePage = (pageNum: number) => {
    listInit({
        current: pageNum,
        name: search.name,
        email: search.email
    })
}
// 重置按钮
const searchReload = () => {
    search.name = ''
    search.email = ''
    listInit({})
}
// 提交按钮
const searchSubmit = () => {
    listInit({
        name: search.name,
        email: search.email,
        current: 1
    })
}
// 添加用户
const showModal = ref(false)
// 编辑用户
const showEditModal = ref(false)
const user_id = ref('')
const changeShowModal = (status:boolean) => {
    showModal.value = status
}
const changeEditModal = (status:boolean) => {
    showEditModal.value = status
}
// 添加后刷新列表
const reload = () => {
    listInit({
        name: search.name,
        email: search.email,
        current: 1
    })
}
</script>