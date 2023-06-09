<style scoped lang='scss'></style>

<template>
    <n-modal :show="props.showModal" :mask-closable="true" @update:show="$emit('changeShowModal', false)">
        <n-card style="width: 600px" title="添加用户" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <template #header-extra>
                <n-icon size="30" class="cursor-pointer" @click="$emit('changeShowModal', false)">
                    <CloseOutline />
                </n-icon>
            </template>
            <n-form ref="formRef" :model="formInfo" :rules="rules">
                <n-form-item path="title" label="标题">
                    <n-input v-model:value="formInfo.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item path="url" label="跳转URL">
                    <n-input v-model:value="formInfo.url" placeholder="请输入url" />
                </n-form-item>
                <n-form-item label="是否启用" path="status">
                    <n-radio-group v-model:value="formInfo.status" name="status">
                        <n-space>
                            <n-radio :value="0">
                                否
                            </n-radio>
                            <n-radio :value="1">
                                是
                            </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item path="img" label="图片上传">
                    <upload @fileName="fileName"></upload>  
                </n-form-item>
                <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                        <div class="flex justify-end">
                            <n-button @click.prevent="slideSubmit" round type="primary">
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
import upload from '@/components/Upload/index.vue'
import { api_addSlides } from "@/api/slides";
import { CloseOutline } from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
const message = useMessage()
const props = defineProps<{ showModal: boolean }>()
const formInfo = reactive({
    title: '',
    url: '',
    status: 0,
    img: ''
})

const rules = {
    title: [{ required: true, message: "请输入标题", triggerRef: 'blur' }],
    url: [{ required: true, message: "请输入地址", triggerRef: 'blur' }],
    img: [{ required: true, message: "请输入选择图片", triggerRef: 'blur' }],
}
const formRef = ref()

const emit = defineEmits(['changeShowModal', 'reloadTable'])

const slideSubmit = () => {
    formRef.value?.validate(err => { if (err) return });
    console.log(formInfo);
    
    api_addSlides(formInfo).then(res => {
        console.log(res);
        message.success('添加成功')
        emit('changeShowModal', false)
        emit('reloadTable')
        
    })
}
const fileName = (key:string) => {
    formInfo.img = key
}
</script>