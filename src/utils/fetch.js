import axios from "axios"

const instance = axios.create({
    baseURL:"http://localhost:8090", //服务器地址
    timeout:7000,   //超时处理
    headers:{}
})


// 请求拦截器：在请求被发送出去之前，做一些验证工作
instance.interceptors.request.use(function(config){
    // console.log('请求拦截器',config)
    // 加token
    // token 的作用，是用户鉴权
    config.headers.Authorization = localStorage.getItem('token') || ''
    return config
}),function(error){ //拦截失败
    return Promise.reject(error)
}

// 响应拦截器：在响应到达之前，先进行数据过滤，错误处理
instance.interceptors.response.use(function(response){
    console.log("响应拦截器",response)
    if(response.status === 200){
        if(response.data && response.data.msg){//拦截数据，只返回符合条件的数据
            return response.data.data || response.data   //返回需要的数据
        }else{
            alert("网络异常，请求超时")
        }
    }
},function(error){
    return Promise.reject(error)
})

export default instance