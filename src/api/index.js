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
    // 获取菜单列表
    getMenuList() {
        return request({
            url: '/menu/list',
            method: 'GET',
            data: {},
            mock: true
        })    
    },
    // 获取角色列表
    getRoleList() {
        return request({
            url: '/admin/all_role',
            method: 'GET',
            data: {},
        })
    },
    // 获取部门列表
    getDeptList() {
        return request({
            url: '/admin/all_department',
            method: 'GET',
            data: {},
        })
    },
    // 用户列表
    getUserList(params) {
        return request({
            url: 'admin/users',
            method: 'GET',
            data: params,
        })    
    },

    // 新增用户
    userSubmit(params) {
        return request({
            url: 'admin/users',
            method: 'POST',
            data: params,
        })
    },
    // 用户删除
    userDelete(params) {
        return request({
            url: 'admin/users/' + params,
            method: 'DELETE',
        })
    },
    // 添加菜单
    menuSubmit(params) {
        return request({
            url: '/menu/add',
            method: 'POST',
            data: params,
            mock: true
        }) 
    }
}