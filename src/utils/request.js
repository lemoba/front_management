/**
 * axios封装
 */
import axios from "axios";
import config from "./../config"
import { ElMessage } from "element-plus"
import router from './../router'

const TOKEN_INVALID = "token验证错误"
const NETWORK_ERROR = "网络请求异常"

// 创建axios实例对象，添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000,
})

// 请求拦截
service.interceptors.request.use((req) => {
    // TODO:
    const headers = req.headers;
    if (headers.Authorization) headers.Authorization = 'Bearer Ranen'
    return req;
})

// 响应拦截
service.interceptors.response.use((res) => {
    const {code, data, msg} = res.data;
    if (code === 200) {
        return data;
    }else if(code === 401) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(() =>{
            router.push('/login')
        }, 2000)      
        return Promise.reject(TOKEN_INVALID)
    }else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject( msg || NETWORK_ERROR)
    }
})

/**
 * 请求函数
 * @param {*} options 请求配置
 * @returns 
 */
function request(options) {
    options.method = options.method || 'GET';
    if(options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }

    if(config.env === 'prod') {
        service.defaults.baseURL = config.baseApi
    }else {
        service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
    }
    return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
    request[item] = (url, data, options) => {
        return request({
            url, 
            data, 
            method:item,
            ...options
        })
    }
})

export default request;