<style scoped lang='scss'></style>

<template>
    <n-modal :show="props.showModal" :mask-closable="true" @update:show="$emit('changeShowModal', false)">
        <n-card style="width: 600px"  title="添加用户" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <template #header-extra>
                <n-icon size="30" class="cursor-pointer" @click="$emit('changeShowModal', false)">
                    <CloseOutline />
                </n-icon>
            </template>
            <n-form ref="formRef" :model="formInfo" :rules="rules">
                <n-form-item path="name" label="姓名">
                    <n-input v-model:value="formInfo.name" placeholder="请输入姓名" />
                </n-form-item>
                <n-form-item path="email" label="邮箱">
                    <n-input v-model:value="formInfo.email" placeholder="请输入邮箱" />
                </n-form-item>
                <n-form-item path="password" label="密码:">
                    <n-input v-model:value="formInfo.password" type="password" show-password-on="click"
                        placeholder="请输入密码" />
                </n-form-item>
                <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                        <div class="flex justify-end">
                            <n-button @click.prevent="userSubmit" round type="primary">
                                添加
                            </n-button>
                        </div>
                    </n-col>
                </n-row>
            </n-form>
        </n-card>
    </n-modal>
</template>

<script setup lang='ts'>
import { api_addUser } from "@/api/users";
import { CloseOutline } from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
import { addUserForm } from "@/types/user";
const message = useMessage()
const props = defineProps<{ showModal: boolean }>()
const formInfo:addUserForm = reactive({
    name: '',
    email: '',
    password: ''
})

const rules = {
    name: [{ required: true, message: "请输入姓名", triggerRef: 'blur' }],
    email: [{ required: true, message: "请输入邮箱", triggerRef: 'blur' }],
    password: [{ required: true, message: "请输入密码", triggerRef: 'blur' }],
}
const formRef = ref()


const emit = defineEmits(['changeShowModal', 'reloadTable'])

const userSubmit = () => {
    formRef.value?.validate(err => { if (err) return });
    api_addUser(formInfo).then(() => {
        emit('changeShowModal', false)
        emit('reloadTable')
        message.success('添加成功')
    })
}
</script>