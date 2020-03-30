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
  // 通过客样照id查询客样照
  getById (_id) {
    let url = baseUrl + '/pic/getById'
    return axios.post(url, { _id })
  }
  // 通过摄影师id查询客样照
  getByPhpId (photer) {
    let url = baseUrl + '/pic/getByPhpId'
    return axios.post(url, { photer })
  }
  // 通过关键词查询客样照
  getByKw (obj) {
    let url = baseUrl + '/pic/getByKw'
    return axios.post(url, obj)
  }
  // 删除客样照
  del (obj) {
    let url = baseUrl + '/pic/del'
    return axios.post(url, obj)
  }
  // 修改客样照
  update (obj) {
    let url = baseUrl + '/pic/update'
    return axios.post(url, obj)
  }

  // 查询所有摄影师
  getphp () {
    let url = baseUrl + '/phpdetails/getphp'
    return axios.post(url)
  }
  // 通过id查询摄影师
  phpfindone (_id) {
    let url = baseUrl + '/phpdetails/phpfindone'
    return axios.post(url, { _id })
  }
 
}
export default new picApi()
