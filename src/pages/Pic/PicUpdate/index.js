import React, { Component } from 'react'
import picApi from '@api/picApi'
import Style from './index.module.less'
import baseUrl from '@ultils/baseUrl'
import { Card, Button, Form, Input, Select, message } from 'antd'
import { UploadOutlined  } from '@ant-design/icons'
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
}
class PicAdd extends Component {
  state = {
    _id: '', // 客样照id
    imgs: [], // 图片路径
    base64Imgs: [], // base64
    showImgs: [], // 缩略图
    photers: [], // 摄影师列表
    disabled: false, // 提交按钮禁用
    title: '', // 标题
    desc: '', // 描述
    look: '', // 浏览
    like: '', // 点赞
    photer: '', // 摄影师
    phpType: '', // 摄影类型
    imgsBeforeUpdate: [], // 修改前图片路径
    imgsChange: false, // 图片是否修改
    timer: '', // 返回首页计时器
    continueBtn: false, // 继续修改按钮显示隐藏
  }
  // 上传客样照文本
  onFinish = async () =>{
    let files = this.refs.files.files // 图片对象
    if (files.length !== 0) { await this.upload(); this.setState({imgsChange: true}) } // 上传图片
    let { _id, title, desc, imgs, look, like, photer, phpType, imgsChange, imgsBeforeUpdate } = this.state
    // 修改请求
    let { code } = await picApi.update({ _id, title, desc, imgs, look, like, photer, phpType, imgsChange, imgsBeforeUpdate })
    if(code){ return message.error('修改失败') } // 修改失败
    // 修改成功 更新页面
    message.success('修改成功 3s后返回首页')
    this.setState({continueBtn: true}) // 继续修改按钮显示
    // 跳转页面
    let timer = setTimeout(()=>{
      this.props.history.push('/admin/picList')
    }, 3000)
    this.setState({timer})
  }
  // 上传图片
  upload = async () => {
    let files = this.refs.files.files // 图片对象
    let data = new FormData()
    for (const key in files) {
      data.append('pic', files[key])
    }
    let {code, msg, imgs} = await picApi.uploadPic(data)
    if(code){ return message.error(msg) } // 上传图片失败
    this.setState({imgs}) // 上传成功 保存图片路径
  }
  // 显示图片缩略图
  base64Img = () => {
    this.setState({base64Imgs:[]})
    let files = this.refs.files.files // 图片对象
    for (const key in files) {
      if (typeof(files[key]) === 'object') {
        let reader = new FileReader()
        reader.onload = () => {
          let base64Imgs = this.state.base64Imgs
          base64Imgs.push(reader.result)
          this.setState({base64Imgs,showImgs:base64Imgs})
        }
        reader.readAsDataURL(files[key])
      }
    }
  }
  // 修改前数据
  getinitData = async () => {
    let _id = this.props.match.params._id // 修改客样照的id
    this.setState({_id})
    let { code, list } = await picApi.getById(_id) // 获取客样照信息
    if (code) {return message.error('获取客样照失败, 请重试')} // 请求失败
    list = list[0] // 客样照信息对象
    let { title,desc,look,like,imgs,phpType } = list // 解构修改前数据
    // 摄影师id
    let photer = '摄影师跑路了' // 摄影师集合中该摄影师已删除
    if (list.photer.length !== 0) { // 摄影师集合中该摄影师存在
      photer = list.photer[0]._id
    }
    // 设置修改前数据
    this.setState({ title,desc,look,like,photer,phpType,imgs,imgsBeforeUpdate:imgs, showImgs: imgs })
  }
  componentDidMount = async () => {
    // 获取摄影师列表
    let result = await picApi.getphp() // 摄影师列表请求
    if (result.code) {return message.error('获取摄影师列表失败, 请重试')} // 请求失败
    this.setState({photers: result.data}) // 请求成功初始化摄影师列表
    // 获取修改前数据 初始化页面
    this.getinitData()
  }
  render() {
    let { showImgs, photers, photer, title, desc, look, like, phpType, timer, continueBtn } = this.state
    return (
      <div>
        <Card title='客样照修改'>
          <Form {...layout} name="nest-messages" onFinish={this.onFinish}>
            <Form.Item label="标题">
              <Input autoComplete='off' value={title} onChange={(e)=>{
                this.setState({title: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="浏览">
              <Input type='Number' min={0} value={look} onChange={(e)=>{
                this.setState({look: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="点赞">
              <Input type='Number' min={0} value={like} onChange={(e)=>{
                this.setState({like: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="摄影师">
              <Select value={photer} onChange={(value)=>{
                this.setState({photer: value})
              }}>
                {
                  photers.map((item, index) => {
                    return(<Select.Option value={item._id} key={index}>{item.phpName}</Select.Option>)
                  })
                }
                
              </Select>
            </Form.Item>
            <Form.Item label="摄影类型">
              <Input autoComplete='off' value={phpType} onChange={(e)=>{
                this.setState({phpType: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="描述">
              <Input.TextArea value={desc} onChange={(e)=>{
                 this.setState({desc: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="图片">
              <div>
                <div className={Style.uploadBox}>
                  <Button>
                   <UploadOutlined /> Click to Upload
                  </Button>
                  <input type='file' ref='files'multiple 
                  onChange={this.base64Img} className={Style.uploadInput}/>
                </div>
                {/* 缩略图 */}
                <div style={{maxHeight:'220px',overflow:'auto'}}>
                  {
                    showImgs.map((item,index) => {
                      let url = item
                      if (item.indexOf('base64') === -1) { url = baseUrl + item }
                      return(
                        <img src={url} alt='' key={index}
                        style={{width:'100px',maxHeight:'100px',margin:'5px 5px 5px 0'}}/>
                      )
                    })
                  }
                </div>
              </div>
            </Form.Item>
  
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
              <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>提交</Button>
              <Button type="primary" onClick={() => { this.props.history.push('/admin/picList') }}>返回</Button>
              {continueBtn && 
              <Button type="primary" style={{marginLeft: '20px'}} onClick={() => {
                clearTimeout(timer)
                this.setState({timer: null, continueBtn: false})
                this.getinitData() // 更新修改后页面
              }}>继续修改</Button>
             }
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default PicAdd
