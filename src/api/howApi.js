import axios from '../ultils/index.js'
import baseURL from '../ultils/baseUrl'
class Admin {
  userList(){
    let url=baseURL+'/how/all'
    return axios.post(url)
  }
  Bypage(param){
    let url=baseURL+'/how/pages'
    return axios.post(url,param)
  }
  //评论区添加图片
  addPic(param){
    let url=baseURL+'/upload'
  // console.log('后端',param)
    return axios.post(url,param)
  }
  addHow(param){//添加到数据库接口
    let url =baseURL+'/how/add'
   // console.log('后端20行param', param)
    return axios.post(url,param)
  }
<<<<<<< HEAD
  getScore(param){
    let url=baseURL+"/how/score"
    return axios.post(url,param)
=======
  Analyze(){
    let url=baseURL+'/phpdetails/getphp'
    return axios.post(url)
  }
  byKw(kw,page,pageSize){
    let url=baseURL+'/how/byKw'
    return axios.post(url,{kw,page,pageSize})
  }
  getStaff(){
    let url = baseURL + '/phpdetails/getphp'
    return axios.post(url)
>>>>>>> 4364717456f9ee04a14fcc81f4ae5fb3cffccf8a
  }
}
export default new Admin()