import React, { Component } from 'react'
import picApi from '../../../api/picApi'
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
  }
  // 上传客样照文本
  onFinish = async (value) =>{
    await this.upload() // 上传图片
    value.imgs = this.state.fileList // 写入图片路径
    let { code, msg } = await picApi.add(value) // 上传请求
    if(code){ message.error(msg) } // 上传失败
    message.success(msg) // 上传成功
  }
  // 上传图片
  upload = async () => {
    let files = this.refs.files.files // 图片对象
    let data = new FormData()
    for (const key in files) {
      data.append('pic', files[key])
    }
    let {code, msg, imgs} = await picApi.uploadPic(data)
    if(code){ message.error(msg) } // 上传图片失败
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
  render() {
    let { showImgs } = this.state
    return (
      <div>
        <Card title='客样照添加'>
          <Form {...layout} name="nest-messages" onFinish={this.onFinish}>
            <Form.Item name={'title'} label="标题" rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item name={'photer'} label="摄影师" rules={[{required: true}]}>
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
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
                  <input type='file' ref='files'
                  multiple 
                  onChange={this.showImg} className={Style.uploadInput}/>
                </div>
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default PicAdd
