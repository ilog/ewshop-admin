import axios from 'axios'

const request = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 3000
})
request.interceptors.request.use(
    config => {
        // 请求前做什么 （token
        const token: string | null = localStorage.getItem('token');
        if (token !== '') config.headers['Authorization'] = `Bearer ${token}`
        return config
    }
)
request.interceptors.response.use(
    res => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return res;
    }, error => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        const { response } = error

        switch (response.status) {
            case 401: window.$message.error('账号或密码错误'); break;
            case 422: 
                let msg = response.data.errors[Object.keys(response.data.errors)[0]][0] ?? '参数异常'
                window.$message.error(msg); break;
            case 500:
            case 502: window.$message.error('网络异常'); break;

        }
        // 直接中断 不用写catch
        return new Promise(() => { })
    }
)
export default request
