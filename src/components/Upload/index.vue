<template>
    <n-upload :custom-request="customRequest">
        <n-button v-if="!imgUrl">上传图片</n-button>
        <n-image v-else width="100" :src="imgUrl" :preview-disabled="true" />
    </n-upload>
</template>

<script setup lang='ts'>
import axios from "axios";
import { api_uploadToken } from "@/api/slides";
const emit = defineEmits(['fileName'])
const imgUrl = ref(null)
const customRequest = (option): void => {
    const { file, onFinish, onError } = option
    api_uploadToken().then(res => {
        // 图片上传逻辑

        const formData = new FormData();
        // 随机生成图片名称
        const fileName = `${Date.now()}${Math.floor(Math.random() * 1000)}.${file.name.split('.').pop()}`
        formData.append('key', fileName);
        formData.append('OSSAccessKeyId', res.data.accessid)
        formData.append('policy', res.data.policy)
        formData.append('Signature', res.data.signature)
        formData.append('file', file.file)
        // 发送请求

        axios.post(res.data.host, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            emit('fileName',fileName)
            imgUrl.value = `${res.data.host}/${fileName}`            
            onFinish(fileName)
        }).catch(err => {
            onError(err)
        })
    })
}
</script>