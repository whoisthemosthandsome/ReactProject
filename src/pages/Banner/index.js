import React, { Component } from 'react'
import baseUrl from '@ultils/baseUrl'
import bannerApi from '@api/bannerApi'
import Style from './index.module.less'
import XLSX from 'xlsx'
import { Card, Table, Button, Modal, message, Popconfirm, Spin, Pagination } from 'antd'
import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
class Banner extends Component {
  state = {
    visible: false, // 添加模态框显示隐藏
    spinning: false, // 加载中动画
    count: 0, // 总条数
    page: 1, // 当前页
    pageSize: 2, //每页条数
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
            <Button danger size='small' icon={<DeleteOutlined />}>删除</Button>
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
    if (list.length === 0) { message.warn('暂无数据') }
    list.reverse() // 翻转数组 最新添加的显示在前面
    // 分页
    let arr = []
    let { page, pageSize } = this.state
    let skip = (page -1) * pageSize
    let limit = page * pageSize
    if (limit > list.length) {limit = list.length}
    for (let i = skip; i < limit; i++) {
      arr.push(list[i])
    }
    // 当前显示页全部删除 重新加载页面 显示前一页
    if (arr.length === 0 && page > 1) { 
      page--
      this.setState({page})
      return this.getList()
    }
    let count = list.length // 总条数
    this.setState({list: arr, count})
    this.setState({spinning: false}) // 关闭加载中动画
  }
  // 导出excel
  export = async () => {
    let { code, list } = await bannerApi.get()
    if (code) { return message.error('导出失败') }
    list.reverse()
    // 表头
    let thead = ['序号','id','图片路径']
    // 内容
    let table = list.map((item, index) => {
      let arr = [ index+1 ]
      arr.push(item._id)
      arr.push(item.url)
      return arr
    })
    table.unshift(thead)
    // 导出
    let ws = XLSX.utils.aoa_to_sheet(table) // 数组转为标签页
    let wb = XLSX.utils.book_new() // 创建工作薄
    XLSX.utils.book_append_sheet(wb, ws) // 标签页写入工作薄
    XLSX.writeFile(wb, '轮播图.xlsx') // 工作薄导出为excel文件
    message.success('导出成功')
  }
  // 初始化轮播图列表
  componentDidMount = async () => {
    this.getList()
  }
  render() {
    let { columns, list, visible, spinning, page, pageSize, count } = this.state
    return (
      <div>
        <Card title='轮播图'>
          <div className={Style.btnBox}>
             <Button type='primary' icon={<PlusOutlined />} className={Style.btn} onClick={() => {
              this.setState({visible: true})
            }}>添加</Button>
             <div className={Style.right}>
              <Button type='primary' icon={<ExportOutlined />} className={Style.btn} onClick={this.export}>导出EXCEL</Button>
              <div className={Style.count}><span>{`共${count}条`}</span></div>
            </div>
          </div>
         
          <Spin spinning={spinning}>
            <Table columns={columns} dataSource={list} rowKey='_id'pagination={false}></Table>
          </Spin>
          {/* 分页 */}
          <Pagination showQuickJumper current={page}
            total={count} pageSize={pageSize} style={{marginTop: '10px', textAlign: 'center'}}
            showSizeChanger={true} pageSizeOptions={['2','4','10','20']} 
            onChange={(page) => { // 页码变化更新页面
              this.setState({page},() => { this.getList()})
            }}
            onShowSizeChange={(page, pageSize) => {
              this.setState({page, pageSize}, ()=>{ this.getList() })
            }}
          />
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
