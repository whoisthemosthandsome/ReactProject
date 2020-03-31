import axios from '../ultils/index.js'
import baseUrl from '../ultils/baseUrl'
class api {
    add(obj){
        let url = baseUrl +'/user/add'
        return axios.post(url,obj)
    }
    get(){
        let url = baseUrl + '/user/get'
        return axios.post(url)
    }
    del(_id){
        let url = baseUrl + '/user/del'
        return axios.post(url,{_id})
    }
    update(obj){
        let url = baseUrl +'/user/updata'
        return axios.post(url,obj)
    }
    getone(_id){
        let url = baseUrl +'/user/getone'
        return axios.post(url,_id)
    }
    addPic(param){
        let url= baseUrl+'/upload'
      // console.log('后端',param)
        return axios.post(url,param)
    }
}
export default new api()