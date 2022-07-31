import Mock from 'mockjs';
import homeApi from './mockServeData/home';
import userApi from './mockServeData/user';
import permissionApi from './mockServeData/permission'

//当向/home/getData发送get请求时，调用homeApi中getStatisticalData的方法
Mock.mock('/home/getData',homeApi.getStatisticalData);
Mock.mock(/user\/add/,'post',userApi.createUser);
Mock.mock(/user\/edit/,'post',userApi.updateUser);

Mock.mock(/user\/getUser/,'get',userApi.getUserList);
Mock.mock(/user\/del/,'post',userApi.deleteUser);
 //第一个参数是url的规则，可以是确切的url或者正则，
 //第二个为接口请求的类型（get or post），第三个为执行函数并将执行结果作为响应数据返回
 
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu);