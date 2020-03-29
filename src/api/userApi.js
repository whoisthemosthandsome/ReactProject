import axios from '../ultils/index.js'
class Admin {
  login(param){
    let url='/mall/admin/login'
    return axios.post(url,param)
  }
  userList(){
    let url='/mall/admin'
    return axios.get(url)
  }
  add({userName:name,passWord:pwd}){
    let url='/mall/admin'
    return axios.post(url,{userName:name,passWord:pwd})
  }
  del(_id){
    let url=`/mall/admin/${_id}`;
    return axios.delete(url)
  }
  // update(_id){
  //   let url='/mall/'
  // }
}

export default new Admin()