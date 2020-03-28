import React, { Component } from 'react'
import picApi from '../../../api/picApi'
import { Card, Button, Form, Input, Select, message } from 'antd'
import { UploadOutlined  } from '@ant-design/icons'
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}

class PicAdd extends Component {
  state = {
    fileList: [], // 图片路径
  }
  // 上传客样照文本
  onFinish = async (value) =>{
    if(this.state.fileList.length === 0){return message.error('请上传图片')}
    value.imgs = this.state.fileList // 写入图片路径
    let { code, msg } = await picApi.add(value) // 上传请求
    if(code){ message.error(msg) } // 上传失败
    message.success(msg) // 上传成功
  }
  // 上传图片
  upload = async () => {
    let files = this.refs.files.files // 图片对象
    if(files.length === 0) {return message.error('请选择图片')} // 为选择图片
    let data = new FormData()
    for (const key in files) {
      data.append('pic', files[key])
    }
    let {code, msg, imgs} = await picApi.uploadPic(data)
    if(code){ message.error(msg) } // 上传失败
    this.setState({fileList:imgs}) // 上传成功 保存图片路径
    message.success(msg) // 上传成功
  }
  render() {
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
            <Form.Item name={'imgs'} label="图片" >
              <div>
                <Button onClick={this.upload}>
                  <UploadOutlined /> Click to Upload
                </Button>
                <input type='file' ref='files' multiple/>
              </div>
            </Form.Item>
  
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
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
