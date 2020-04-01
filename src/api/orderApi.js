import axios from '../ultils/index.js'
import baseUrl from '../ultils/baseUrl'
class api {
    add(obj){
        let url = baseUrl +'/order/add'
        return axios.post(url,obj)
    }
    get(){
        let url = baseUrl + '/order/get'
        return axios.post(url)
    }
    del(_id){
        let url = baseUrl + '/order/del'
        return axios.post(url,{_id})
    }
    getone(_id){
        let url = baseUrl +'/order/getone'
        return axios.post(url,_id)
    }
    //查询用户
    getuser(){
        let url = baseUrl + '/user/get'
        return axios.post(url)
    }
    getphp(){
        let url = baseUrl + '/php/getphp'
        return axios.post(url)
    }
    getpic(){
        let url = baseUrl + '/pic/get'
        return axios.post(url)
    }
}
export default new api()