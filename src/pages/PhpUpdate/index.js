import React, { Component } from 'react'
import phpApi from '../../api/phpApi';
import {Button} from 'antd'
class PhpUpdate extends Component {
    state = {  
        phpName:"",
        phpPosition:"",
        phpSelect:"",
        phpID:"",
        imgPath:'',
        _id:''
    }
    componentDidMount(){
        let id=this.props.match.params.id
        this.setState({_id:id})
        phpApi.phpFindOne(id).then((data)=>{
            let {phpName,phpPosition,phpSelect,phpID}=data.data
            this.setState({phpName,phpPosition,phpID,phpSelect})
        })
    }
    render() { 
        let {phpName,phpPosition,phpSelect,phpID,imgPath}=this.state
        return ( 
            <div>
              摄影师名字：<input type="text" value={phpName} onChange={(e)=>{
                    this.setState({phpName:e.target.value})
              }}/><br/>
              摄影师职位：<input type="text" value={phpPosition} onChange={(e)=>{
                    this.setState({phpPosition:e.target.value})
              }}/><br/>
              摄影师选择：<input type="text" value={phpSelect} onChange={(e)=>{
                    this.setState({phpSelect:e.target.value})
              }}/><br/>
              摄影师ID：<input type="text" value={phpID} onChange={(e)=>{
                    this.setState({phpID:e.target.value})
              }}/><br/>
              摄影师相片: <input type="file" ref="img"/> <Button onClick={()=>{
                  let file=new FormData()
                  file.append("xixi",this.refs.img.files[0])
                  phpApi.phpFile(file).then((data)=>{
                    let path=data.path
                    this.setState({imgPath:path})
                  }).catch((err)=>{
                    console.log(err)
                  })
              }}>上传</Button>
              <img src={this.state.imgPath} alt="" style={{width:100,height:100}}/>
              <Button type='primary' onClick={()=>{
                  phpApi.phpUpdateOne(this.state._id,{phpName,phpPosition,phpSelect,phpID,imgPath}).then((data)=>{
                     this.props.history.push('/admin/php')
                  }).catch((err)=>{
                      console.log(err)
                  })
              }}>提交更新</Button>
            </div>
         );
    }
}
 
export default PhpUpdate;