import { api_login, api_getUserInfo } from "@/api/auth";
import { UserInfo } from "@/types/user";
import { defineStore } from "pinia";

export interface IUserState {
    token: string;
    username: string;
    avatar: string;
}
export const useUserStore = defineStore({
    id: 'user',
    state: ():IUserState => ({
        token: localStorage.getItem('token') || '',
        username: '',
        avatar:'',
    }),
    getters: {
        getToken(): string {
            return this.token
        },
        getUserName(): string {
            return this.username
        },
        getAvatar(avatar: string) {
            return this.avatar
        },
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUserName(name: string) {
            this.username = name

        },
        setAvatar(avatar: string) {
            this.avatar = avatar;
        },
        // 登录
        async login(userInfo: UserInfo) {
            const response = await api_login(userInfo)
            if (response.data.access_token) {
                this.setToken(response.data.access_token)
                localStorage.setItem('token', this.token)
                this.getUser()
            }
            return response

        },
        // 获取用户信息
        async getUser(){
            try {
                const response = await api_getUserInfo();
                // console.log(response.data);
                this.setAvatar(response.data.avatar ?? "https://api.shop.eduwork.cn/image/avatar.png");
                this.setUserName(response.data.name);
                
                return response;
            } catch {}
                
        }
    }
})
export default useUserStore