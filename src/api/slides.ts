import request from "@/utils/request"


// 图片上传
export function api_uploadToken() {
    return request({
        url: '/api/auth/oss/token',
        method: 'get'
    })
}

//查询轮播
export function api_getSlidesData(){
    return request({
        url: '/api/admin/slides'
    })
}
// 添加轮播
export function api_addSlides(data: any) {
    return request({
        url: 'api/admin/slides',
        method: 'post',
        data
    })
}