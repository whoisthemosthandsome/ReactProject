import React, { Component } from 'react'
import baseUrl from '@ultils/baseUrl'
import bannerApi from '@api/bannerApi'
import { Card, Table, Button, Modal, message, Popconfirm, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
class Banner extends Component {
  state = {
    visible: false, // 添加模态框显示隐藏
    spinning: false, // 加载中动画
    list: [], // 轮播图列表数据
    // 轮播列表表头
    columns: [
      {title: 'id', key: '_id', dataIndex: '_id'},
      {title: 'url', key: 'url', dataIndex: 'url'},
      {title: '缩略图', key: 'img', dataIndex: 'url', render(url){
        return(<img src={baseUrl + url} alt='' style={{width:'120px', maxHeight:'80px'}} />)
      }},
      {title: '操作', key: 'action', render: (recode) => {
        return(
          <Popconfirm title="确认要删除吗？" onCancel={()=>{message.error('取消删除')}} onConfirm={
            this.bannerDel.bind(null,recode._id, recode.url)
          }>
            <Button danger size='small'>删除</Button>
          </Popconfirm>
        )
      }}
    ]
  }
  // 关闭模态框
  handleCancel = () => {
    this.setState({visible: false})
  }
  // 上传轮播图
  upload = async () => {
    let file = this.refs.file.files[0]
    let data = new FormData()
    data.append('banner', file)
    let { code, msg } = await bannerApi.add(data)
    if(code){ return message.error(msg) } // 上传失败
    // 上传成功 关闭模态框 刷新页面
    message.success(msg)
    this.setState({visible: false})
    this.getList()
  }
  // 删除轮播图
  bannerDel = async (_id, url) => {
    let { code, msg } = await bannerApi.del({_id, url})
    if(code){ return message.error(msg) } // 删除失败
    this.getList()
  }
  // 获取轮播图列表
  getList = async () => {
    this.setState({spinning: true}) // 开启加载中动画
    let { code, list } = await bannerApi.get()
    if (code) { return false }
    list.reverse() // 翻转数组 最新添加的显示在前面
    this.setState({list})
    this.setState({spinning: false}) // 关闭加载中动画
  }
  // 初始化轮播图列表
  componentDidMount = async () => {
    this.getList()
  }
  render() {
    let { columns, list, visible, spinning } = this.state
    return (
      <div>
        <Card title='轮播图'>
          <Button type='primary' icon={<PlusOutlined />} onClick={() => {
            this.setState({visible: true})
          }}>添加</Button>
          <Spin spinning={spinning}>
            <Table columns={columns} dataSource={list} rowKey='_id'></Table>
          </Spin>
        </Card>
        {/* 添加图片模态框 */}
        <Modal
          title="添加轮播图"
          visible={visible}
          onOk={this.upload}
          onCancel={this.handleCancel}
        >
          <input type='file' ref='file'/>
        </Modal>
      </div>
    );
  }
}

export default Banner
