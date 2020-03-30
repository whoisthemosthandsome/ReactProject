import axios from '../ultils/index.js'
import baseUrl from '../ultils/baseUrl'
import update from '../pages/update/update.js'
class api {
  login({obj}){
    let url = baseUrl + '/login/getone'
    return axios.post(url,{obj})
  }
  add(obj){
    let url = baseUrl +'/login/add'
    return axios.post(url,obj)
  }
  get(){
    let url = baseUrl + '/login/get'
    return axios.post(url)
  }
  del(_id){
    let url = baseUrl + '/login/del'
    return axios.post(url,{_id})
  }
  up(_id){
    let url = baseUrl + '/login/getup'
    return axios.post(url,{_id})
  }
  update(_id,{obj}){
    let url = baseUrl +'/login/updata'
    return axios.post(url,{_id},{obj})
  }
}
export default new api()