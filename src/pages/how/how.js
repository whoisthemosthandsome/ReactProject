/* eslint-disable no-unused-expressions */
import React, { Component} from 'react';
import {Card,Table,Pagination, message } from 'antd'
import s from './how.module.less'
import api from '../../api/howApi'
import baseUrl from '../../ultils/baseUrl'
//------------------------------------------组件正文-------------------------------------------
class how extends Component {
  //-----------------------------------state值----------------------------------------
  state={
    list:[],//渲染的列表列表
    imgPaths:[],//图片路径集合
    url:'',//路径
    img:'not found',//仅缩略图用的路径
    show:false,//控制图片显示隐藏的变量
    //--------------这一段改编自官网，主要渲染表头----------------
    columns : [
      {
        title:'评论时间',
        dataIndex:'createTime',
        key:'createTime',
        width:100,
        render(createTime) {
          // 将发布时间毫秒转为日期
          let time = new Date(Number(createTime))
          let year = time.getFullYear()
          let month = time.getUTCMonth() + 1
          let date = time.getDate()
          let show = `${year}/${month}/${date}`
          return(<span>{show}</span>)
        } 
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width:100,//设置该行宽度
      },
      {
        title: '评价摄影师',
        dataIndex: 'staffName',
        key: 'staffName',
        width:150,
      },
      {
        title: '评分',
        dataIndex: 'star',
        key: 'star',
        width:100,
      },
      {
        title:'图片',
        width:200,
        dataIndex:'url',
        key:'url',
        render:(_record)=>{
          return(
            <div>
              {
                _record.map((item,index)=>{
                  return(
                    <div className={s.show} onClick={()=>{this.showImg({item})}} key={index}>{item}</div>
                  )
                })
              }
            </div>
          )
        }
      },
      {
        title:'缩略图',
        dataIndex:'url',
        width:100,
        key:'pic',
        render:(record)=>{
          return(
            <div>
              {
                 record.map((item,index)=>{
                  return(
                    <img key={index} className={this.state.img===item?"how_show__2w4xU":'how_hide__1iejN'} width='80' height='80' alt='not found' src={baseUrl+item}></img>
                  )
                })
              }
            </div>
          )
        }
      },
      {
        title: '评论内容',
        dataIndex: 'content',
        key: 'content',
        ellipsis: true,
        width:200
      },
      // {
      //   //！仅做测试用 当前页面用不到
      //   title:'操作',
      //   key:'action',
      //   width:100,
      //   fixed:'right',
      //   render:(_record)=>{
      //     return(
      //       <div>
      //         <input multiple="multiple" type="file" id='file'/>
      //         <button onClick={()=>{
      //           this.addPic()
      //         }
      //         }
      //         >添加图片</button>
      //         <button onClick={()=>{
      //           this.addHow()
      //         }}>添加到数据库</button>
      //         {//用户端显示缩略图
      //           this.state.imgPaths.map((item,index)=>{
      //           return(
      //             <img key={index} width='50' height='50' alt='' src={baseUrl+item}/>
      //           )
      //          })
      //         }
      //       </div>
      //     )
      //   }
      // }
    ],
    dataSource:[
      {
        userName:'username',
        star:5,
        staffName:'bob',
        content:'红红火火恍恍惚惚哈哈哈呱呱呱呱呱呱呱呱呱哈哈哈哈哈红红火火恍恍惚惚',
        _id:'something',
        url:'lujing',
        createTime:'2020-3-9',
      }
    ],
    allPage:1,//总页数
    pageSize:3,//每页显示条数
    page:1// 当前页
  }
  //--------------------------------------生命周期以及方法/数据请求------------------------
  componentDidMount(){
   // this.getListDate()
    this.Bypage()
  }
  //通过此方法控制图片的显示隐藏，做到图片的切换
  showImg(img){
    this.setState({show:!this.state.show})
    this.setState({img:img.item})
    console.log('img',img)
  }
  //上传图片到public在页面显示------------------------ ！仅为用户页面做测试用，本组件用不到此功能！----------------------------
  addPic=async()=>{
    let { imgPaths}=this.state
    // 获得用户选择的图片信息
    let files = document.getElementById('file').files
    // let {size,type} = file 
    // 图片上传的格式 formdata  将图片添加到formdata对象
    let formdata = new FormData()
    // formdata.append('pic',file) 单图片上传
    //多文件上传如下pic
    for(var i in files){
      formdata.append('how',files[i])
    }
    let {code,msg,imgs} = await api.addPic(formdata)
    if(code){ return message.error(msg)}
    imgs.map((item,index)=>{
      imgPaths.push(item)
      this.setState({imgPaths})
    })
  }
  addHow=async()=>{//添加到数据库
    let userName='userName';
    let content='content';
    let url=this.state.imgPaths;
    let star=5;
    let staffName='bob';
    api.addHow ({userName,content,url,star,staffName})
    .then(()=>{
      console.log('109行，add成功')
      this.getListDate()
    })
    .catch((err)=>{
      console.log('112行上传出错',err)
    })
  }
  //------------------------查看所有评论接口----------------------------
  getListDate =async()=>{
    api.userList()
    .then((res)=>{
      if(res.code===0){
         this.setState({list:res.data})
          console.log(177,this.state.list)
      }else {
        message.error('查看评论失败')
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
   //--------------------------分页查询--------------------------------
    Bypage =()=>{
      let {page,pageSize}  = this.state
      api.Bypage({page,pageSize})
      .then((data)=>{
        console.log(data)
        this.setState({list:data.list,
          allPage:data.allCount,
          page,pageSize})
      })
   }
  //---------------------------------根据数据渲染页面------------------------------------
  render() {
    let {list,allPage,pageSize,page,columns} = this.state
    return (
      <div className={s.how} >
         <Card title='用户评论'>
          <Table 
          style={{height:400}}
          pagination={false} 
          rowKey='_id'
          scroll={{y:300,x:950}}
          dataSource={list}                            
          columns={columns} />
          <Pagination className={s.pagination} hideOnSinglePage='true' Current={page} total={allPage} pageSize={pageSize} onChange={(page,_pageSize)=>{
          this.setState({page},()=>{
            this.Bypage()  
          })
        }}/>
        </Card>
      </div>
    )
  }
}

export default how;