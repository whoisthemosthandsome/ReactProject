import React, { Component } from 'react'
import picApi from '@api/picApi'
import Style from './index.module.less'
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
    fileList: [], // 图片路径
    showImgs: [], // 缩略图base64
    photers: [], // 摄影师列表
    disabled: false, // 提交按钮禁用
    phpType: '请选择', // 摄影类型value
    defaultValue: '请选择', // 摄影师默认选中项
    phpTypes: [], // 摄影类型列表
    timer: '', // 返回首页计时器
    continueBtn: false, // 继续添加按钮显示隐藏
  }
  // 上传客样照文本
  onFinish = async (value) =>{
    if (this.state.phpType === '请选择') { return message.error('请选择摄影类型') }
    if (this.state.disabled === true) { return message.warn('上传中') }
    this.setState({disabled: true}) // 上一条数据未上传完成 禁止重复提交
    await this.upload() // 上传图片
    value.imgs = this.state.fileList // 写入图片路径
    value.phpType = this.state.phpType // 写入摄影类型
    let { code } = await picApi.add(value) // 上传请求
    if(code){ return message.error('添加失败') } // 上传失败
    message.success('添加成功 3s后返回') // 上传成功
    this.setState({continueBtn: true}) // 继续继续按钮显示
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
    this.setState({fileList:imgs}) // 上传成功 保存图片路径
  }
  // 显示图片缩略图
  showImg = () => {
    this.setState({showImgs:[]})
    let files = this.refs.files.files // 图片对象
    for (const key in files) {
      if (typeof(files[key]) === 'object') {
        let reader = new FileReader()
        reader.onload = () => {
          let showImgs = this.state.showImgs
          showImgs.push(reader.result)
          this.setState({showImgs})
        }
        reader.readAsDataURL(files[key])
      }
    }
  }
  // 摄影类型列表
  getPhpTypeList = async (_id) => {
    let {code, data} = await picApi.phpfindone(_id)
    if (code) { return message.error('获取摄影类型失败') }
    let phpTypes = data.phpTitle.split('/')
    this.setState({phpTypes, phpType: '请选择'})
  }
  // 获取摄影师列表
  componentDidMount = async () => {
    let { code, data } = await picApi.getphp() // 摄影师列表请求
    if (code) {return message.error('获取摄影师列表失败, 请重试')} // 请求失败
    this.setState({photers: data}) // 请求成功初始化摄影师列表
  }
  render() {
    let { showImgs, photers, defaultValue, phpTypes, phpType, timer, continueBtn } = this.state
    return (
      <div>
        <Card title='客样照添加'>
          <Form {...layout} name="nest-messages" onFinish={this.onFinish}>
            <Form.Item name={'title'} label="标题" rules={[{required: true}]}>
              <Input autoComplete='off'/>
            </Form.Item>
            <Form.Item name={'photer'} label="摄影师" rules={[{required: true}]}>
              <Select defaultValue={defaultValue} onChange={(value)=>{
                this.getPhpTypeList(value)
              }}>
                {
                  photers.map((item, index) => {
                    return(<Select.Option value={item._id} key={index}>{item.phpName}</Select.Option>)
                  })
                }
                
              </Select>
            </Form.Item>
            <Form.Item label="摄影类型" rules={[{required: true}]}>
              <Select id='phpType' value={phpType}
              onClick={()=>{
                if (phpTypes.length === 0) {
                  message.warn('请先选择摄影师')
                }
              }}
              onChange={(phpType)=>{this.setState({phpType})}}
              >
                {
                  phpTypes.map((item, index) => {
                    return(<Select.Option value={item} key={index}>{item}</Select.Option>)
                  })
                }
                
              </Select>
            </Form.Item>
            <Form.Item name={'desc'} label="描述" rules={[{required: true}]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'imgs'} label="图片" rules={[{required: true}]}>
              <div>
                <div className={Style.uploadBox}>
                  <Button>
                   <UploadOutlined /> Click to Upload
                  </Button>
                  <input type='file' ref='files'multiple 
                  onChange={this.showImg} className={Style.uploadInput}/>
                </div>
                {/* 缩略图 */}
                <div>
                  {
                    showImgs.map((item,index) => {
                      return(
                        <img src={item} alt='' key={index}
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
                this.setState({disabled: false}) // 解除提交禁用
              }}>继续添加</Button>
             }
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default PicAdd
