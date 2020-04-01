import React, { Component } from 'react'
import phpDetailsApi from '../../api/phpDetailsApi';
import {Button} from 'antd'
class PhpDetailsUpdate extends Component {
    state = {  
        phpName:"",
        phpPosition:"",
        phpSelect:"",
        phpID:"",
        imgPath:'',
        phpAtt:'',
        phpRsident:'',
        phpSatisfaction:'',
        phpTitle:'',
        phpSelf:'',
        phpRecom:'',
        venueImg:'',
        phpAuction:'',
        reimg1:'',
        reimg2:'',
        reimg3:'',
        reimg4:'',
        _id:''
    }
    componentDidMount(){
        let id=this.props.match.params.id
        this.setState({_id:id})
        phpDetailsApi.phpFindOneDetails(id).then((data)=>{
            let {phpName,phpPosition,phpSelect,phpID,phpAtt,phpRsident,phpSatisfaction,
                phpTitle,phpSelf,phpRecom,venueImg,phpAuction
            }=data.data
            this.setState({phpName,phpPosition,phpID,phpSelect,phpAtt,phpRsident,phpSatisfaction,phpTitle,phpSelf,phpRecom,venueImg,phpAuction,
            })
        })
    }
    render() { 
        let {phpName,phpPosition,phpSelect,phpID,imgPath,phpAtt,phpRsident,phpSatisfaction,
            phpTitle,phpSelf,phpRecom,venueImg,phpAuction,reimg1,reimg2,reimg3,reimg4
        }=this.state
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
              摄影师关注：<input type="text" value={phpAtt} onChange={(e)=>{
                this.setState({phpAtt:e.target.value})
                 }}/><br/>
              摄影师常驻：<input type="text" value={phpRsident} onChange={(e)=>{
                 this.setState({phpRsident:e.target.value})
                }}/><br/>
              摄影师满意度：<input type="text" value={phpSatisfaction} onChange={(e)=>{
                    this.setState({phpSatisfaction:e.target.value})
              }}/><br/>
              摄影师擅长：<input type="text" value={phpTitle} onChange={(e)=>{
                this.setState({phpTitle:e.target.value})
              }}/><br/>
              摄影师简介:<textarea value={phpSelf} onChange={(e)=>{
                this.setState({phpSelf:e.target.value})
              }}/><br/>
              摄影师档期:<input type="text" value={phpAuction} onChange={(e)=>{
                this.setState({phpAuction:e.target.value})
              }}/><br/>
              摄影师样品图1： <input type="file" ref="img1"/> <Button onClick={()=>{
                let file=new FormData()
                file.append("xixi",this.refs.img1.files[0])
                phpDetailsApi.phpDetailsFile(file).then((data)=>{
                  let path=data.path
                  this.setState({reimg1:path})
                }).catch((err)=>{
                  console.log(err)
                })
            }}>上传</Button>
            <img src={this.state.reimg1} alt="" style={{width:50,height:50}}/><br/>
              摄影师样品图2： <input type="file" ref="img2"/> <Button onClick={()=>{
                let file=new FormData()
                file.append("xixi",this.refs.img2.files[0])
                phpDetailsApi.phpDetailsFile(file).then((data)=>{
                  let path=data.path
                  this.setState({reimg2:path})
                }).catch((err)=>{
                  console.log(err)
                })
            }}>上传</Button>
            <img src={this.state.reimg2} alt="" style={{width:50,height:50}}/><br/>
              摄影师样品图3： <input type="file" ref="img3"/> <Button onClick={()=>{
                let file=new FormData()
                file.append("xixi",this.refs.img3.files[0])
                phpDetailsApi.phpDetailsFile(file).then((data)=>{
                  let path=data.path
                  this.setState({reimg3:path})
                }).catch((err)=>{
                  console.log(err)
                })
            }}>上传</Button>
            <img src={this.state.reimg3} alt="" style={{width:50,height:50}}/><br/>
              摄影师样品图4： <input type="file" ref="img4"/> <Button onClick={()=>{
                let file=new FormData()
                file.append("xixi",this.refs.img4.files[0])
                phpDetailsApi.phpDetailsFile(file).then((data)=>{
                  let path=data.path
                  this.setState({reimg4:path})
                }).catch((err)=>{
                  console.log(err)
                })
            }}>上传</Button>
            <img src={this.state.reimg4} alt="" style={{width:50,height:50}}/><br/>
            摄影师驻地： <input type="file" ref="img5"/> <Button onClick={()=>{
              let file=new FormData()
              file.append("xixi",this.refs.img5.files[0])
              phpDetailsApi.phpDetailsFile(file).then((data)=>{
                let path=data.path
                this.setState({reimg5:path})
              }).catch((err)=>{
                console.log(err)
              })
          }}>上传</Button>
          <img src={this.state.reimg5} alt="" style={{width:50,height:50}}/><br/>
              摄影师相片: <input type="file" ref="img"/> <Button onClick={()=>{
                  let file=new FormData()
                  file.append("xixi",this.refs.img.files[0])
                  phpDetailsApi.phpDetailsFile(file).then((data)=>{
                    let path=data.path
                    this.setState({imgPath:path})
                  }).catch((err)=>{
                    console.log(err)
                  })
              }}>上传</Button>
              <img src={this.state.imgPath} alt="" style={{width:50,height:50}}/>
              <Button type='primary' onClick={()=>{
                  phpRecom=reimg1+'/'+reimg2+'/'+reimg3+'/'+reimg4
                  this.setState({phpRecom})
                  let updateList={phpName,phpPosition,phpSelect,phpID,imgPath,phpAtt,phpRsident,phpSatisfaction,
                    phpTitle,phpSelf,phpRecom,venueImg,phpAuction}
                  phpDetailsApi.phpUpdateOneDetails(this.state._id,updateList).then((data)=>{
                          this.props.history.push('/admin/phpdetails')
                  }).catch((err)=>{
                      console.log(err)
                  })
              }}>提交更新</Button>
            </div>
         );
    }
}
 
export default PhpDetailsUpdate;