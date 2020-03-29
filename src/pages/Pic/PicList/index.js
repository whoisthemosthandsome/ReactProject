import React, { Component } from 'react'
import picApi from '../../../api/picApi'
import baseUrl from '../../../ultils/baseUrl'
import Style from './index.module.less'
import { Card, Button, Table, message, Popconfirm, Spin, Pagination  } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
class PicList extends Component {
  state = {
    page: 1, // 当前显示页
    pageSize: 2, // 每页条数
    count: 0, // 总条数
    spinning: false, // 记载中动画显示隐藏
    list: [], // 客样照列表
    // 客样照表头
    columns: [
      { title: '标题', key:'title' ,dataIndex: 'title', width: 100, fixed: 'left' },
      { title: 'id', key:'_id' ,dataIndex: '_id', width: 120 },
      { title: '摄影类型', key:'phpType' ,dataIndex: 'phpType', width: 100 },
      { title: '描述', key:'desc' ,dataIndex: 'desc', width: 120 },
      { title: '摄影师', key:'photer' ,dataIndex: 'photer', width: 80, render(photer){
        let name = '摄影师跑路了'
        if (photer.length !== 0) { name = photer[0].phpName}
        return(<span>{name}</span>)
      }  },
      { title: '发布时间', key:'createTime' ,dataIndex: 'createTime', width: 100, render(createTime) {
        // 将发布时间毫秒转为日期
        let time = new Date(Number(createTime))
        let year = time.getFullYear()
        let month = time.getUTCMonth() + 1
        let date = time.getDate()
        let show = `${year}/${month}/${date}`
        return(<span>{show}</span>)
      } },
      { title: '浏览', key:'look' ,dataIndex: 'look', width: 80  },
      { title: '点赞', key:'like' ,dataIndex: 'like', width: 80  },
      { title: '图片', key:'imgs', width: 290, render: (recode) => {
        return(
          <div style={{maxHeight:'180px', overflow: 'auto'}}>
            {
              recode.imgs.map((item,index) => {
                let name = 'selUrl' + recode._id // this.state中该条客样照选中的url的变量名
                let style = ''
                if (item===this.state[name]) { // 该路径被选中
                  style = Style.selUrl
                } else if (!this.state[name] && index === 0) { // 第一次加载页面 默认选中第一条路径
                  style = Style.selUrl
                }else { // 该路径未被选中
                  style = Style.url
                }
                return(
                  <p key={index} className={style}
                    onClick={() => {
                      this.setState({[name]: item}) // 通过改变选中的url 切换缩略图
                    }}
                 >{item}</p>
                )
              })
            }
          </div>
        )
      } },
      { title: '缩略图', key: 'img', width: 130, render: (recode) => {
        let name = 'selUrl' + recode._id // this.state中该条客样照选中的url的变量名
        let url = this.state[name] // 该条客样照选中的url
        return (
        <img src={
          url?baseUrl + url:baseUrl + recode.imgs[0]
        } alt='' style={{width:'120px', maxHeight:'80px'}}/>
        )
      } },
      { title: '操作', key:'action',width: 120, fixed: 'right', render: (recode) => {
        return(
          <div>
            <Popconfirm title="确定要删除吗？"
             onCancel={()=>{message.error('取消删除')}} onConfirm={this.del.bind(null,recode._id,recode.imgs)}
            >
              <Button danger size='small'>删除</Button>
            </Popconfirm>
            <Button type='primary' size='small' onClick={()=>{this.props.history.push(`/admin/picUpdate/${recode._id}`)}}>修改</Button>
          </div>
        )
      }}
    ]
  }
  // 删除客样照
  del = async (_id, imgs) => {
    let { code, msg } = await picApi.del({_id, imgs}) // 删除请求
    if(code){ return message.error(msg) } // 删除失败
    this.getListData() // 删除成功刷新页面
  }
  // 获取客样照列表
  getListData = async () => {
    this.setState({spinning: true}) // 加载中动画显示
    let { page, pageSize } = this.state
    let {code, msg , list, count} = await picApi.getByPage({ page, pageSize }) // 查询请求
    if(code){ return message.error(msg) } // 查询失败
    // 当前显示页内容全部删除 重新加载页面 显示前一页
    if (list.length === 0) { 
      let page = this.state.page
      if (page === 1) { this.setState({list, count});message.warn('暂无数据'); return this.setState({spinning: false}) }
      page--
      this.setState({page})
      this.getListData()
    }
    this.setState({list, count}) // 查询成功
    this.setState({spinning: false}) // 加载中动画隐藏
  }
  // 初始化客样照列表
  componentDidMount () {
    this.getListData()
  }
  render() {
    let { columns, list, spinning, page, pageSize, count } = this.state
    return (
      <div className={Style.box}>
        <Card title='客样照' className={Style.card}>

          {/* 添加客样照 */}
          <Button type='primary' icon={<PlusOutlined />} onClick={() => {
            this.props.history.push('/admin/picAdd')
          }}>添加客样照</Button>

          {/* 客样照列表 */}
          <Spin spinning={spinning}>
          <Table columns={columns} dataSource={list} rowKey='_id' scroll={{x:900,y:300}} pagination={false}></Table>
          </Spin>

          {/* 分页 */}
          <Pagination showQuickJumper defaultCurrent={page}
            total={count} pageSize={pageSize}
            onChange={(page) => { this.setState({page}, () => { this.getListData() }) }}
          />
        </Card>
      </div>
    );
  }
}

export default PicList
