<style scoped lang='scss'></style>

<template>
    <n-modal v-model:show="props.showEditModal" :mask-closable="true" @update:show="$emit('changeEditModal', false)">
        <n-card style="width: 600px" title="编辑用户" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <template #header-extra>
                <n-icon size="30" class="cursor-pointer" @click="$emit('changeEditModal', false)">
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
                <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                        <div class="flex justify-end">
                            <n-button @click.prevent="userSubmit" round type="primary">
                                更改
                            </n-button>
                        </div>
                    </n-col>
                </n-row>
            </n-form>
        </n-card>
    </n-modal>
</template>

<script setup lang='ts'>
import { api_getUserInfo, api_updateUser } from "@/api/users";
import { CloseOutline } from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
const message = useMessage()
const props = defineProps<{
    showEditModal: boolean,
    user_id: string
}>()
const formInfo = reactive({
    name: '',
    email: '',
})
onMounted(() => {
    api_getUserInfo(props.user_id).then(res => {
        formInfo.email = res.data.email,
        formInfo.name = res.data.name
        
    })
})
const rules = {
    name: [{ required: true, message: "请输入姓名", triggerRef: 'blur' }],
    email: [{ required: true, message: "请输入邮箱", triggerRef: 'blur' }]
}
const formRef = ref()

const emit = defineEmits(['changeEditModal', 'reloadTable'])

const userSubmit = () => {
    formRef.value?.validate(err => { if (err) return });
    api_updateUser(props.user_id,formInfo).then(res => {
        emit('changeEditModal', false)
        emit('reloadTable')
        message.success('更改成功')
    })
}
</script>