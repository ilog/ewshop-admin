<style scoped lang="acss"></style>
<template>
    <div class="bg-[url('@/assets/img/bg.jpg')] w-screen h-screen flex justify-center items-center bg-slate-50">
        <div class="flex justify-center items-center flex-col w-96 h-2/3 overflow-hidden bg-white">
            <div class="text-[#1877f2] pb-14 -mt-6  font-medium text-4xl">Login</div>
            <n-form label-placement="left" class="w-80" ref="formRef" :model="formInfo" :rules="rules">
                <n-form-item path="formInfo.email" label="邮箱:">
                    <n-input v-model:value="formInfo.email" @keydown.enter.prevent placeholder="请输入邮箱" />
                </n-form-item>
                <n-form-item path="formInfo.password" label="密码:">
                    <n-input v-model:value="formInfo.password" type="password" show-password-on="click"
                        @keydown.enter.prevent placeholder="请输入密码" />
                </n-form-item>
                <n-form-item>
                    <n-button color="#1877f2" :loading="loading" block type="success"
                        @click.prevent="handleSubmit">登录</n-button>
                </n-form-item>
            </n-form>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';

import { FormInst, useMessage, FormRules } from 'naive-ui'
window.$message = useMessage()
const router = useRouter()
const useStore = useUserStore()

interface ModelType {
    email: string | null
    password: string | null
}
const formRef = ref<FormInst | null>(null)
const formInfo = reactive<ModelType>({
    email: 'admin@api.com',
    password: '123123'
})
const rules: FormRules = {
    email: [{ required: true, message: "请输入正确的邮箱", trigger: 'blur' }],
    password: [{ required: true, message: "请输入正确的密码", trigger: 'blur' }],
}
let loading = ref(false)
const handleSubmit = async function () {
    formRef.value?.validate(errors => {
        if (errors) return
    })
    loading.value = true
    try {
        useStore.login(formInfo).then(() => {
            window.$message.success('登录成功')
            router.push('/dashboard');
            loading.value = false
        })
    } catch { }
}
</script>