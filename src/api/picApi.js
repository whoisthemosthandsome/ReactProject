import baseUrl from '../ultils/baseUrl'
import axios from '../ultils/index.js'
class picApi {
  
  // 上传图片
  uploadPic (obj) {
    let url = baseUrl + '/upload'
    return axios.post(url, obj)
  }
  // 添加客样照
  add (obj) {
    let url = baseUrl + '/pic/add'
    return axios.post(url, obj)
  }
  // 查询所有客样照
  get () {
    let url = baseUrl + '/pic/get'
    return axios.post(url)
  }
   // 分页查询客样照
   getByPage (obj) {
    let url = baseUrl + '/pic/getByPage'
    return axios.post(url, obj)
  }
  // 删除客样照
  del (obj) {
    let url = baseUrl + '/pic/del'
    return axios.post(url, obj)
  }
}
export default new picApi()
