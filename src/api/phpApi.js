import axios from '../ultils/index.js'
class Php{
    getPhp(){
        let url='http://localhost:3001/php/getphp'
        return axios.post(url)
    }
    phpDel(_id){
        let url="http://localhost:3001/php/phpdel"
        return axios.get(url,{params:{_id}})
    }
    phpFindOne(_id){
        let url="http://localhost:3001/php/phpfindone"
        return axios.post(url,{_id})
    }
    phpUpdateOne(_id,updateList){
        let url="http://localhost:3001/php/phpupdate"
        return axios.post(url,{_id,updateList})
    }
    phpInsert(insertList){
        let url='http://localhost:3001/php/insertphp'
        return axios.post(url,insertList)
    }
    phpFile(file){
        let url="http://localhost:3001/php/file"
        return axios.post(url,file)
    }
    phpFindByPage(page,pageSize){
        let url='http://localhost:3001/php/findphpbypage'
        return axios.post(url,{page,pageSize})
    }
}
export default new Php()