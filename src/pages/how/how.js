/* eslint-disable no-unused-expressions */
import React, { Component} from 'react';
import {Card,Table,Pagination, message ,Select,Button} from 'antd'
import {DownloadOutlined } from '@ant-design/icons';
import s from './how.module.less'
import api from '../../api/howApi'
import baseUrl from '../../ultils/baseUrl'
import XLSX from 'xlsx'
const { Option } = Select;
//点击页码数，触发函数。函数判断当前的situation是不是true 
//不是search 就只写bypage  situation改为false
//true的话  再做判断  查看关键字是空还是全部 -- bypage  改situation为false
//         具体关键字就-- byKw，situation值为true

//------------------------------------------组件正文-------------------------------------------
class how extends Component {
  //-----------------------------------state值----------------------------------------
  state={
    list:[],//渲染的列表
    imgPaths:[],//图片路径集合
    url:'',//图片路径，图片的dataIndex
    show:false,//控制图片显示隐藏的变量
    staffs:[],//所有摄影师名字
    kw:'全部',//关键字
    allPage:1,//总页数
    pageSize:3,//每页显示条数
    page:1,// 当前页,
    //img:'not found',//仅缩略图用的路径,当前页面用不到
    //--------------这一段改编自官网，主要渲染表头----------------
    columns : [
      {
        title:'评论时间',dataIndex:'createTime',key:'createTime',width:100,
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
      {title: '序号',dataIndex: '_id',key: '_id',align: 'center',width:100,},
      {title: '用户名',dataIndex: 'userName',key: 'userName',align: 'center',width:100,},
      {title: '评价摄影师',dataIndex: 'staffName',key: 'staffName',width:150,align: 'center'},
      {title: '评分',dataIndex: 'star',key: 'star',align: 'center',width:100,},
      {
        title:'图片', align: 'center',key:'url',
        width:200,
        dataIndex:'url',
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
        title:'缩略图',dataIndex:'url',width:100,key:'pic',
        align: 'center',
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
      {title: '评论内容', dataIndex: 'content', key: 'content', ellipsis: true,width:200,align: 'center'},
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
      {userName:'bob', star:5,staffName:'邓一',content:'红红火哈惚', _id:'something',url:'lujing',createTime:'',}
    ],
  }
  //--------------------------------------生命周期以及方法/数据请求------------------------
  componentDidMount(){
    this.init()//得到所有摄影师名字
    this.Bypage() //第一次加载所有评论信息

  } 
  judgeSituation(kw,page){//通过判断当前kw的值来判断应该执行的方法
    if(kw==='全部'){
     this.Bypage()
    }else{//有关键字
     this.search(kw,page)
    }
  }
  search=(kw,page)=>{//通过关键字搜索生成列表及分页器
    let {pageSize} = this.state
    api.byKw(kw,page,pageSize)
    .then((data)=>{
      this.setState({
        list:data.list,
        allPage:data.allCount,
        page,pageSize,
      })
  })
  }
  init(){//初始化得到所有摄影师名字
    let {staffs} = this.state
    api.getStaff()
    .then((data)=>{
      staffs.push('全部')//保证第一个放的永远是全部
      data.data.forEach((item,index)=>{
        if(staffs.indexOf(item.phpName)===-1){
          staffs.push(item.phpName)
        }
      })
      this.setState({staffs})
    })
  }
  
  //通过此方法控制图片的显示隐藏，做到图片的切换
  showImg(img){
    this.setState({show:!this.state.show})
    this.setState({img:img.item})
  }
  //下拉框选中得到其选中值，修改关键字，触发判断函数
  Change=(value)=> {
    let {kw} = this.state
    kw = value //点击的内容是kw
    this.setState({kw})
    this.judgeSituation(kw)
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
    imgs.forEach((item,index)=>{
      imgPaths.push(item)
      this.setState({imgPaths})
    })
  }
  addHow=async()=>{//添加到数据库
    let userName='曦曦';
    let content='啊啊发萨芬啊啊啊啊啊啊啊嘎嘎';
    let url=this.state.imgPaths;
    let star=5;
    let staffName='陈艺果';
    api.addHow ({userName,content,url,star,staffName})
    .then(()=>{
      this.getListDate()
    })
  }
  // getListDate =async()=>{//查看所有评论接口
  //   let { staffs}= this.state
  //   api.userList()
  //   .then((res)=>{
  //     if(res.code===0){
  //        this.setState({list:res.data})
  //        staffs.push('全部')
  //        this.state.list.forEach((item,index)=>{
  //            if(staffs.indexOf(item.staffName)===-1){
  //             staffs.push(item.staffName)
  //          }
  //        })
  //        this.setState({staffs}) 
  //     }else {
  //       message.error('查看评论失败')
  //     }
  //   })
  // }
   //--------------------------导出到EXCEL文档-----------------------------------
   export=async()=>{
      let thead=['用户上传的图片','_id','用户名','用户评论','用户评分','评论摄影师','评论时间','上传图片数量']
      api.userList().then((data,index)=>{
        let code =data.code
        if(code){ return message.error('导出失败')}
        let list=(data.data)
        let table= list.map((item,index)=>{
        let arr=[]
        for(var key in item){//取到里面的key值 更加key值做判断
          let value=item[key]
          if (key === 'createTime'){
            let time = new Date(Number(item[key]))
            let year = time.getFullYear()
            let month = time.getMonth() + 1
            let date = time.getDate()
            value = `${year}/${month}/${date}`
          }
          if(key === '__v'){
            value = item['url'].length
          }
          if(key==='url'){
            if(item[key].length===0){
               value='用户未上传图片'
            }
            else{
              value=''
              item[key].forEach((i)=>{
                value += value +baseUrl+ i +' | '
              })
            }
          }
          arr.push(value)
        }
        return arr
      })
      table.unshift(thead)
      let ws = XLSX.utils.aoa_to_sheet(table);
      let wb = XLSX.utils.book_new() // 创建工作薄
      XLSX.utils.book_append_sheet(wb, ws)
      XLSX.writeFile(wb, '客户评论.xlsx')
      message.success('导出成功')
    })
    }
   //--------------------------初始全部评论分页查询--------------------------------
    Bypage =()=>{
      let {page,pageSize}  = this.state
      api.Bypage({page,pageSize})
      .then((data)=>{
        this.setState({list:data.list,
          allPage:data.allCount,
          page,pageSize})
      })
   }
  //---------------------------------根据数据渲染页面------------------------------------
  render() {
    let {list,allPage,pageSize,page,columns,staffs} = this.state
    return (
      <div className={s.how} >
         <Card title='用户评论' style={{textAlign:"center"}}>
         {/* -------------------------------下拉框的select-------------------------------- */}
          <span>得到摄影师所有评价</span>
         <Select
          showSearch
          style={{ width: 150,marginBottom:30,marginLeft:20 }}
          placeholder="选择摄影师"
          optionFilterProp="children"
          onChange={this.Change}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* ------------------------根据数据生成option标签----------------------------------- */}
          {
            staffs.map((item,index)=>{
              return (<Option  key={index}value={item}>{item}</Option>)
            })
          }
        </Select>
        <Button className={s.excel} onClick={this.export} type="primary" icon={<DownloadOutlined />}>
          导出表格到EXCEL
        </Button>
          {/* --------------------------主表格内容----------------------------------------------- */}
         <Table 
          className={s.table}
          style={{height:400,textAlign:"center"}}
          pagination={false} 
          rowKey='_id'
          scroll={{y:300,x:950}}
          dataSource={list}                            
          columns={columns} />
          {/* -------------------------------分页器----------------------------------------------- */}
          <Pagination showQuickJumper  className={s.pagination} hideOnSinglePage='true' Current={page} total={allPage} pageSize={pageSize} 
          onChange={(page)=>{//点击页码数触发的函数
          this.setState({page},()=>{
            this.judgeSituation(this.state.kw,page)
          })
        }}
        />
        </Card>
      </div>
    )
  }
}

export default how;