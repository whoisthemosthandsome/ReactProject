import baseUrl from '../ultils/baseUrl'
import axios from '../ultils'
class bannerApi {

  // 获取轮播图
  get(){
    let url = baseUrl + '/banner/get'
    return axios.post(url)
  }

  // 添加轮播图
  add(obj){
    let url = baseUrl + '/banner/add'
    return axios.post(url, obj)
  }

  // 删除轮播图
  del(obj){
    let url = baseUrl + '/banner/del'
    return axios.post(url, obj)
  }
}

export default new bannerApi()
