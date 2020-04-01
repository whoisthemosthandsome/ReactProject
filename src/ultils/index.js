 import axios from 'axios'
//  import actionCreater from '../store/actionCreater'
 axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // let token = localStorage.getItem('token') || 'no token' // 获取token
  // config.headers.authorization = 'Bearer ' + token // 请求头中设置token
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  // if (response.data.code === 401) { // token验证失败 显示token失效模态框
  //   actionCreater.changeTokenModel(true)
  // }

  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
//不要忘记抛出这一步
export default axios