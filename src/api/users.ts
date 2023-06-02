import request from "@/utils/request"

export function api_getUserList(params:any){
    return request({
        url: '/api/admin/users',
        method: 'get',
        params
    })
}