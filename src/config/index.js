
const env = import.meta.env.MODE || 'prod';
const Envconfig = {
    dev:{
        baseApi:'http://api-admin.lizhenguo.cn:8087/sanhua/api',
        mockApi: 'https://www.fastmock.site/mock/5ed13fa033dbddf0164d8a5c493a371c/api'
    },
    test:{
        baseApi:'http://api-admin.lizhenguo.cn:8087/sanhua/api',
        mockApi: 'https://www.fastmock.site/mock/5ed13fa033dbddf0164d8a5c493a371c/api'
    },
    prod:{
        baseApi:'http://api-admin.lizhenguo.cn:8087/sanhua/api',
        mockApi: 'https://www.fastmock.site/mock/5ed13fa033dbddf0164d8a5c493a371c/api'
    }
}
export default { 
    env,
    mock: false,
    namespace: 'management',
    ...Envconfig[env]
}