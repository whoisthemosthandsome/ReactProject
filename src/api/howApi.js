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
    console.log('后端20行param', param)
    return axios.post(url,param)
  }
}

export default new Admin()