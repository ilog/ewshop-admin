import { api_login, api_getLoginInfo } from "@/api/auth";
import { UserInfo } from "@/types/user";
import { defineStore } from "pinia";

export interface IUserState {
    token: string;
    username: string;
    avatar: string;
}
export const useUserStore: Store<string, {}, {}, { login: object }> = defineStore({
    id: 'user',
    state: (): IUserState => ({
        token: '',
        username: '',
        avatar: '',
    }),
    persist: true,
    getters: {

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
            try {
                const response = await api_login(userInfo);
                if (response.data.access_token) {
                    this.setToken(response.data.access_token);
                    localStorage.setItem('token', this.token)
                    this.getUser()
                }
                return response
            } catch{}
        },
        // 获取用户信息
        async getUser() {
            try {
                const response = await api_getLoginInfo();
                
                this.setAvatar(response.data.avatar ?? "https://api.shop.eduwork.cn/image/avatar.png");
                this.setUserName(response.data.name);
                return response;
            } catch { }

        }
    }
})
export default useUserStore