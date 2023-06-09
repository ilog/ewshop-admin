import request from "@/utils/request"

// 获取用户列表 params：直接拼接在url后边 data body传参
export function api_getUserList(params:any){
    return request({
        url: '/api/admin/users',
        method: 'get',
        params
    })
}

// 添加用户
export function api_addUser(data) {
    return request({
        url: '/api/admin/users',
        method: 'post',
        data
    })
}

// 获取用户信息 通过id
export function api_getUserInfo(userId) {
    return request({
        url: `api/admin/users/${userId}`
    })
}

// 更改用户信息
export function api_updateUser(userId,data) {
    return request({
        url: `api/admin/users/${userId}`,
        method: 'put',
        data
    })
}

// 禁用和启用
export  function api_getUserLock(userid) {
	return request(
		{
			url: `/api/admin/users/${userid}/lock`,
			method: "PATCH"
		}
	);
}