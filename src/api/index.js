/**
 * Api管理
 */

import request from "../utils/request";

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
    // 获取菜单列表
    getMenuList() {
        return request({
            url: '/menu/list',
            method: 'GET',
            data: {},
            mock: true
        })    
    },
    // 用户列表
    getUserList(params) {
        return request({
            url: '/users/list',
            method: 'GET',
            data: params,
            mock: true
        })    
    }
}