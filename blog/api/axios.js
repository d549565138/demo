import axios from 'axios'
import config from '../config'
//通过封装实现开发环境和生产环境中url的不同
const baseUrl = process.env.NODE_ENV ==='development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest{
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }
    //默认配置
    getInsideConfig(){
        const config = {
            baseUrl:this.baseUrl,
            header:{}
        }
        return config
    }
    //拦截器
    interceptors(instance){
        //instance应该传入axios的实例
        instance.interceptors.request.use(function(config){
            //发送请求前做什么
            return config
        },function(error){
            //对请求错误返回失败的promise实例
            return Promise.reject(error);
        });

        //添加响应拦截器
        instance.interceptors.response.use(function(response){
           
            //对响应数据做点什么
            return response;
        },function(error){
            
            //对响应错误返回失败的promise实例
            return Promise.reject(error);
        });
    }
    request(options){
        const instance= axios.create()//创建axios实例instance
        options = {...this.getInsideConfig(),...options}//与默认配置合并成新的options对象
        this.interceptors(instance)//调用执行拦截器
        console.log(options);
        return instance(options)//最终返回以options为参数的axios（instance）的调用结果
    }
}

export default new HttpRequest(baseUrl)