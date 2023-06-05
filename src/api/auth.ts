import request from "../utils/request";

// 登录
export function api_login(data: object) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    })
}

// 获取用户信息
export function api_getLoginInfo() {
    return request( '/api/admin/user' )
}

// 退出登录
export function api_logout() {
    return request({
        url: '/api/auth/logout',
        method: 'post'
    })
}
