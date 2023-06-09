<template>
    <div class="p-5 h-58 bg-white">
        <div>
            <span class="text-slate-400 pr-2">首页</span>
            <span class="font-bold">/</span>
            <span class="pl-2 font-bold">轮播管理</span>
        </div>
        <div class="pt-3"><span class="font-bold text-2xl">轮播管理</span></div>
    </div>

    <div class="px-5 mt-5">
        <div class="bg-white">
            <div class="text-xl px-5 py-4  flex justify-between">
                <span>用户列表</span>
                <span><n-button @click.prevent="showModal = true">添加图片</n-button></span>
            </div>
            <div>
                <n-data-table :columns="columns" :data="data" :slidesbordered="false" />
                <div class="p-4 flex justify-end pr-10">
                    <n-pagination @update-page="updatePage" v-model:page="page" :page-count="totalPages" />
                </div>
            </div>
        </div>
    </div>
    <Addslide :reform="true" :showModal="showModal" @changeShowModal="changeShowModal" @reloadTable="reload"></Addslide>
</template>

<script setup lang='ts'>
import Addslide from './components/AddSlide.vue';
import { h } from 'vue'
import { NImage, NButton, NSwitch } from 'naive-ui'
import { api_getSlidesData } from '@/api/slides';
const columns = [
    {
        title: 'Logo图片',
        key: 'img_url',
        render(row: object) {
            return h(NImage, { round: true, src: row['img_url'], size: 'small',width:'130' })
        },
        align:'center'
    },
    {
        title: '标题',
        key: 'title',
        align:'center'
    },
    {
        title: '跳转链接',
        key: 'url'
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
                value: row.is_locked === 1 ? false : true,
                onclick: () => {

                }
            })
        }
    },
    {
        title: '排序',
        key: 'id'
    },
    {
        title: '更新时间',
        key: 'updated_at'
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
                    slide_id.value = row.id
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
    api_getSlidesData().then(res => {
       data.value =  res.data.data

    })
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
const slide_id = ref('')
const changeShowModal = (status: boolean) => {
    showModal.value = status
}
const changeEditModal = (status: boolean) => {
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