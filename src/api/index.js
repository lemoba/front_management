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
    }
}