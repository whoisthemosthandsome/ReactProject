 import axios from 'axios'
 import actionCreator from '../store/actionCreatore'
 import store from '../store/Store'
 axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token =localStorage.getItem('token')||'no token'
              
  config.headers.authorization = 'Bearer '+ token
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  let {code,msg} =response.data 
  // console.log('响应拦截器',code,msg)
  if(code === 402){
    // token失效
    let action = actionCreator.changeTokenModal(true)
    store.dispatch(action)
  }
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
//不要忘记抛出这一步
export default axios