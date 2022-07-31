import axios from "./axios"

export const getMenu=(param) =>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:param
    })
}

export const getData  =() => {
    return axios.request({
        url:'/home/getData',
        
    })
}

export const getUser  =(params) => {
    return axios.request({
        url:'/user/getUser',
        method:'get',
        data:params,//这是请求体，会被转化成json传进后端
        params:params,//这是query，会在url后生成？xxx：xxx
    })
}

// export const getMenu = (params) =>{
//     return axios.request({
//         url:'/permission/getMenu',
//         method:'post',
//         data:param
//     })
// }