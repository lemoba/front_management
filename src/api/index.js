/**
 * Api管理
 */

import request from "@/utils/request";

export default{
    //登录
    login(params) {
        return request ({
            url: '/auth/login',
            method: 'POST',
            data: params
        })
    },

    // 获取个人信息
    me() {
        return request ({
            url: '/auth/me',
            method: 'GET',
        })
    },

    // 获取用户列表
    getUserList(params) {
        return request ({
            url: '/admin/users',
            method: 'GET',
            data: params
        })
    },

    // 获取菜单列表
    getMenuList(params) {
        return request ({
            url: '/admin/all_permission',
            method: 'GET',
            data: params
        })
    },
}