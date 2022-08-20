
const env = import.meta.env.MODE || 'prod';
const Envconfig = {
    dev:{
        baseApi:'/',
        mockApi: 'https://www.fastmock.site/mock/5ed13fa033dbddf0164d8a5c493a371c/api'
    },
    test:{
        baseApi:'admin.ranen.cc/api',
        mockApi: 'https://www.fastmock.site/mock/5ed13fa033dbddf0164d8a5c493a371c/api'
    },
    prod:{
        baseApi:'online.ranen.cc/api',
        mockApi: 'https://www.fastmock.site/mock/5ed13fa033dbddf0164d8a5c493a371c/api'
    }
}
export default { 
    env,
    mock: true,
    ...Envconfig[env]
}