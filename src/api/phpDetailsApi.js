import axios from '../ultils/index.js'
class PhpDetails{
    getPhpDetails(){
        let url='http://localhost:3001/phpdetails/getphp'
        return axios.post(url)
    }
    phpDetailsDel(_id){
        let url="http://localhost:3001/phpdetails/phpdel"
        return axios.get(url,{params:{_id}})
    }
    phpFindOneDetails(_id){
        let url="http://localhost:3001/phpdetails/phpfindone"
        return axios.post(url,{_id})
    }
    phpUpdateOneDetails(_id,updateList){
        let url="http://localhost:3001/phpdetails/phpupdate"
        return axios.post(url,{_id,updateList})
    }
    phpInsertDetails(insertList){
        let url='http://localhost:3001/phpdetails/insertphp'
        return axios.post(url,insertList)
    }
    phpFileDetails(file){
        let url="http://localhost:3001/phpdetails/file"
        return axios.post(url,file)
    }
    phpFindByPageDetails(page,pageSize){
        let url='http://localhost:3001/phpdetails/fdp'
        return axios.post(url,{page,pageSize})
    }
    phpDetailsFile(file){
        let url="http://localhost:3001/phpdetails/file"
        return axios.post(url,file)
    }
}
export default new PhpDetails()