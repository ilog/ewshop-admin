<style scoped>
.form {
    width: 358px;
    height: 488px;
    border-radius: 15px;
    padding: 30px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.96;
}

.bg {
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-image: url('@/assets/img/login.svg');
    background-color: #F0F2F5;
    overflow: hidden;
    min-height: 100vh;
}

.header {
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    line-height: 150px;
    color: #1877f2;
}

.btn {
    border-radius: 6px;
    /* background-image: linear-gradient(to right, #5F909E, #3A656E); */
    cursor: pointer;
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    font-weight: bold;
}
</style>

<template>
    <div class="bg">
        <div class="form">
            <div class="header">Login</div>
            <n-form require-mark-placement="left" class="content" label-placement="left" ref="formRef" v-model:model="info"
                :rules="rules">
                <n-form-item path="email" label="邮箱">
                    <n-input placeholder="请输入邮箱" v-model:value="info.email" type="email" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="password" label="密码">
                    <n-input v-model:value="info.password" placeholder="请输入密码" type="password" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item>
                    <n-button color="#1877f2" class="btn" :loading="loading" block type="success"
                        @click="handleSubmit">登录</n-button>
                </n-form-item>
            </n-form>
        </div>
    </div>
</template>

<script setup lang='ts'>
import useUserStore from '@/stores';
import { UserInfo } from '@/types/user';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui'
window.$message = useMessage()

const router = useRouter()
const useStore = useUserStore();
const loading = ref(false)
const formRef = ref()

const info: UserInfo = reactive({
    email: 'admin@api.com',
    password: '123123'
})
const rules = {
    email: { required: true, message: '请输入邮箱', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' }
}

const handleSubmit = (e: Event) => {
    // 取消默认事件
    e.preventDefault()
    formRef.value?.validate(async (error: object) => {
        if (error) return
        loading.value = true
        useStore.login(info).then(() => {
            window.$message.success('登录成功')
            router.push('/dashboard/console');
        })
        loading.value = false
    })

}
</script>