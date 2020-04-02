import React, { Component } from 'react'
import picApi from '@api/picApi'
import baseUrl from '@ultils/baseUrl'
import Style from './index.module.less'
import XLSX from 'xlsx'
import { Card, Button, Table, message, Popconfirm, Spin, Pagination, Input, Select, Tag, Modal } from 'antd'
import { PlusOutlined, SearchOutlined, ExportOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
class PicList extends Component {
  state = {
    page: 1, // 当前显示页
    pageSize: 2, // 每页条数
    count: 0, // 总条数
    spinning: false, // 记载中动画显示隐藏
    kw: '', // 关键词
    fun: '', // 分页点击执行方法
    photers: [], // 摄影师列表
    photer: '全部', // 选中的摄影师
    viewType: '详情模式', // 显示方式
    stateType: '全部', // 显示的发布状态
    list: [], // 客样照列表
    listBeforePage: [], // 分页前客样照列表
    listInit: [], // 所有数据
    exportCard: false, // 导出选项模态框显示隐藏
    exportCardObj: [], // 导出模态框显示数据 当前查询方式
    exportType: '当前查询数据', // 导出数据
    // 客样照表头
    columns: [
      { title: '标题', key:'title' ,dataIndex: 'title', width: 100, fixed: 'left', align: 'center' },
      { title: 'id', key:'_id' ,dataIndex: '_id', width: 120, align: 'center' },
      { title: '描述', key:'desc' ,dataIndex: 'desc', width: 180, align: 'center' },
      { title: '摄影类型', key:'phpType' ,dataIndex: 'phpType', width: 100, align: 'center' },
      { title: '摄影师', key:'photer' ,dataIndex: 'photer', width: 80, align: 'center', render(photer){
        let name = '摄影师已离职'
        if (photer.length !== 0) { name = photer[0].phpName}
        return(<span>{name}</span>)
      }  },
      { title: '更新时间', key:'createTime' ,dataIndex: 'createTime', width: 100, align: 'center', render(createTime) {
        // 将发布时间毫秒转为日期
        let time = new Date(Number(createTime))
        let year = time.getFullYear()
        let month = time.getUTCMonth() + 1
        let date = time.getDate()
        let show = `${year}/${month}/${date}`
        return(<span>{show}</span>)
      } },
      { title: '发布状态', key:'states' ,dataIndex: 'states', width: 100, align: 'center', render(states) {
        let show = ''
        let color = ''
        if (states === '0') { show = '未发布'; color = 'orange' }
        else if (states === '1') { show = '已发布'; color = 'green' }
        else { show = '已下架'; color = 'red' }
        return(<Tag color={color}>{show}</Tag>)
      } },
      { title: '浏览', key:'look' ,dataIndex: 'look', width: 80, align: 'center' },
      { title: '点赞', key:'like' ,dataIndex: 'like', width: 80, align: 'center' },
      { title: '图片总数', key:'count' ,dataIndex: 'imgs', width: 100, align: 'center', render(imgs){
        return(<span>{imgs.length}</span>)
      } },
      { title: '图片路径', key:'imgs', width: 320, align: 'center', render: (recode) => {
        return(
          <div style={{maxHeight:'160px', overflow: 'auto'}}>
            {
              recode.imgs.map((item,index) => {
                let name = 'selUrl' + recode._id // this.state中该条客样照选中的url的变量名
                let style = ''
                if (item === this.state[name]) { // 该路径被选中 通过className添加样式
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
      { title: '缩略图', key: 'img', width: 130, align: 'center', render: (recode) => {
        let name = 'selUrl' + recode._id // this.state中该条客样照选中的url的变量名
        let url = this.state[name] // 该条客样照选中的路径
        return (
        <img src={ // url存在图片路径设置为url 不存在显示第一张图片
          url?baseUrl + url:baseUrl + recode.imgs[0] // 页面第一次加载时url为空 显示第一张图片
        } alt='not found' style={{width:'120px', maxHeight:'80px'}}/>
        )
      } },
      { title: '操作', key:'action',width: 120, fixed: 'right', align: 'center', render: (recode) => {
        return(
          <div>
            {/* 删除 */}
            <Popconfirm title="确定要删除吗？"
             onCancel={()=>{message.error('取消删除')}} onConfirm={this.del.bind(null,recode._id,recode.imgs)}
            >
              <Button danger size='small' icon={<DeleteOutlined />}>删除</Button>
            </Popconfirm>
            {/* 修改 */}
            <Button type='default' icon={<EditOutlined />} size='small' style={{margin: '5px 0'}}
              onClick={()=>{
                let { page, pageSize, fun, photer, kw, viewType, stateType } = this.state
                let infos = { page, pageSize, fun, photer, kw, viewType, stateType }
                localStorage.setItem('infos', JSON.stringify(infos))
                this.props.history.push(`/admin/picUpdate/${recode._id}`)
              }}
            >修改</Button>
            {/* 发布状态 */}
            <Select defaultValue={recode.states} style={{ width:'90px' }}
              onChange={(value)=>{ this.changeState(value, recode) }}
            >
              <Select.Option value='0'>未发布</Select.Option>
              <Select.Option value='1'>已发布</Select.Option>
              <Select.Option value='-1'>已下架</Select.Option>
            </Select>
          </div>
        )
      }}
    ],
    columnsSmall: [
      { title: '标题', key:'title' ,dataIndex: 'title', width: 100, fixed: 'left', align: 'center' },
      { title: '数据', key:'data', width: 220, align: 'center', render:(recode)=>{
        // 摄影师
        let name = '摄影师已离职'
        if (recode.photer.length !== 0) { name = recode.photer[0].phpName}
        // 将更新时间毫秒转为日期
        let time = new Date(Number(recode.createTime))
        let year = time.getFullYear()
        let month = time.getUTCMonth() + 1
        let date = time.getDate()
        let show = `${year}/${month}/${date}`
        // 发布状态
        let stateShow = ''
        let color = ''
        if (recode.states === '0') { stateShow = '未发布'; color = 'orange' }
        else if (recode.states === '1') { stateShow = '已发布'; color = 'green' }
        else { stateShow = '已下架'; color = 'red' }
        return(
          <div className={Style.dataBox}>
            <p><span>摄影师：{name}</span><span>摄影类型：{recode.phpType}</span></p>
            <p><span>浏览：{recode.look}</span><span>点赞：{recode.like}</span><span>图片总数：{recode.imgs.length}</span></p>
            <p>更新时间：{show}</p>
            <p>描述：{recode.desc}</p>
            <p>id：{recode._id}</p>
            <p><span>发布状态：{<Tag color={color}>{stateShow}</Tag>}</span></p>
          </div>
        )
      } },
      { title: '图片路径', key:'imgs', width: 320, align: 'center', render: (recode) => {
        return(
          <div style={{maxHeight:'160px', overflow: 'auto'}}>
            {
              recode.imgs.map((item,index) => {
                let name = 'selUrl' + recode._id // this.state中该条客样照选中的url的变量名
                let style = ''
                if (item === this.state[name]) { // 该路径被选中 通过className添加样式
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
      { title: '缩略图', key: 'img', width: 130, align: 'center', render: (recode) => {
        let name = 'selUrl' + recode._id // this.state中该条客样照选中的url的变量名
        let url = this.state[name] // 该条客样照选中的路径
        return (
        <img src={ // url存在图片路径设置为url 不存在显示第一张图片
          url?baseUrl + url:baseUrl + recode.imgs[0] // 页面第一次加载时url为空 显示第一张图片
        } alt='not found' style={{width:'120px', maxHeight:'80px'}}/>
        )
      } },
      { title: '操作', key:'action',width: 120, fixed: 'right', align: 'center', render: (recode) => {
        return(
          <div>
            {/* 删除 */}
            <Popconfirm title="确定要删除吗？"
             onCancel={()=>{message.error('取消删除')}} onConfirm={this.del.bind(null,recode._id,recode.imgs)}
            >
              <Button danger size='small' icon={<DeleteOutlined />}>删除</Button>
            </Popconfirm>
            {/* 修改 */}
            <Button type='default' icon={<EditOutlined />} size='small' style={{margin: '5px 0'}}
              onClick={()=>{
                let { page, pageSize, fun, photer, kw, viewType, stateType } = this.state
                let infos = { page, pageSize, fun, photer, kw, viewType, stateType }
                localStorage.setItem('infos', JSON.stringify(infos))
                this.props.history.push(`/admin/picUpdate/${recode._id}`)
              }}
            >修改</Button>
            {/* 发布状态 */}
            <Select defaultValue={recode.states} style={{ width:'90px' }}
              onChange={(value)=>{ this.changeState(value, recode) }}
            >
              <Select.Option value='0'>未发布</Select.Option>
              <Select.Option value='1'>已发布</Select.Option>
              <Select.Option value='-1'>已下架</Select.Option>
            </Select>
          </div>
        )
      }}
    ]
  }
  // 删除客样照
  del = async (_id, imgs) => {
    let { code } = await picApi.del({_id, imgs}) // 删除请求
    if(code){ return message.error('删除失败') } // 删除失败
    message.success('删除成功')
    this.getFun() // 删除成功刷新页面
  }
  // 修改发布状态
  changeState = async (value, data) => {
    data.photer = data.photer[0]._id
    data.states = value
    let { code } = await picApi.update(data)
    if (code) { return message.error('修改发布状态失败')} // 修改失败
    message.success('修改发布状态成功')
    this.getFun() // 修改发布状态成功刷新页面
  }
  // 搜索
  search = async () => {
    let {kw} = this.state
    this.setState({photer: '全部'})
    // 关键词为空 切换到分页查询
    if (!kw) {
      return this.setState({fun: 'getListData'}, ()=>{ this.getListData() })
    }
    // 关键词不为空 切换关键词查询
    this.setState({spinning: true}) // 加载中动画显示
    this.setState({fun: 'search'}) // 分页点击处理方法设置为关键词查询
    let { code, msg , list } = await picApi.getByKw({kw}) // 搜索请求
    if(code){ return message.error(msg) } // 查询失败
    if (list.length === 0) {  message.warn('请输入其他关键词')} // 查询结果为空
    this.setState({listInit: list}) // 过滤发布状态前数据
    this.pagination(list) // 分页处理
    this.setState({ spinning: false}) // 查询成功 加载中动画隐藏
  }
  // 查询指定摄影师客样照
  getByPhoter = async () => {
    let { photer } = this.state
    this.setState({kw: ''})
    // 选中全部摄影师 切换至分页查询
    if (photer === '全部') {
      return this.setState({fun: 'getListData'}, ()=>{ this.getListData() })
    }
    // 选中指定摄影师 切换至摄影师查询
    this.setState({spinning: true}) // 加载中动画显示
    this.setState({fun: 'getByPhoter'}) // 分页点击处理方法设置为摄影师查询
    let { code, msg , list } = await picApi.getByPhpId(photer)
    if(code){ return message.error(msg) } // 查询失败
    if(list.length === 0){ message.warn('暂无该摄影师客样照') } // 返回列表为空
    this.setState({listInit: list}) // 过滤发布状态前数据
    this.pagination(list) // 分页处理
    this.setState({spinning: false}) // 查询成功 加载中动画隐藏
  }
  // 分页
  pagination = async () => {
    await this.stateTypeFilter() // 过滤发布状态
    let arr = []
    let { page, pageSize, listBeforePage } = this.state
    let skip = (page -1) * pageSize
    let limit = page * pageSize
    if (limit > listBeforePage.length) {limit = listBeforePage.length}
    for (let i = skip; i < limit; i++) {
      arr.push(listBeforePage[i])
    }
    while(arr.length === 0 && page >1){ // 该分页为空 显示前一页
      page--
      this.setState({page})
      return this.pagination()
    }
    this.setState({list: arr})
  }
  // 显示指定发布状态客样照
  stateTypeFilter () {
    let { stateType, listInit} = this.state
    let arr = listInit
    if (stateType !== '全部') {
      arr = listInit.filter((item) => {
        return item.states === stateType
      })
      if (arr.length === 0) { message.warn('暂无该状态客样照') }
    }
    this.setState({listBeforePage: arr, count: arr.length})
  }
  // 获取客样照列表
  getListData = async () => {
    this.setState({spinning: true, showSizeChanger: true}) // 加载中动画显示
    let {code, list} = await picApi.get() // 查询请求
    if(code){ return false } // 查询失败
    // 当前显示页内容全部删除 重新加载页面 显示前一页
    if (list.length === 0) { message.warn('暂无数据') }
    this.setState({listInit: list}) // 过滤发布状态前数据
    this.pagination(list) // 分页处理
    this.setState({spinning: false}) // 查询成功 加载中动画隐藏
  }
  // 删除 修改发布状态后 更新页面数据
  getFun () {
    let fun =this.state.fun
    switch (fun) {
      case 'getListData':
        this.getListData()
        break;
      case 'getByPhoter':
        this.getByPhoter()
        break
      case 'search':
        this.search()
        break
      default:
        break;
    }
  }
  // 导出模态框显示数据
  exportCardData () {
    let { kw, photer, photers, stateType,fun } = this.state
    // 摄影师
    let phpName = ''
    photers.forEach((item)=>{
      if (item._id === photer) {
        phpName = item.phpName
      }
    })
    // 发布状态
    let stateName = stateType
    if (stateType !== '全部') {
      switch (stateType) {
        case '0':
          stateName = '未发布'
          break;
        case '1':
          stateName = '已发布'
          break;
        case '-1':
          stateName = '已下架'
          break;
        default:
          break;
      }
    }
    let exportCardObj = []
    exportCardObj.push({'发布状态': stateName})
    exportCardObj.push({'摄影师': phpName})
    if (fun === 'search'){ exportCardObj.push({'关键词': kw}) }
    this.setState({exportCardObj, exportCard: true})
  }
  // 导出excel
  export = async () => {
    let { exportType, listBeforePage } = this.state
    let list = listBeforePage
    if (exportType === '全部') {
      let result = await picApi.get()
      if (result.code) { return message.error('导出失败') }
      list = result.list
    }
    // 表头
    let thead = ['序号','摄影师','图片路径','id','标题','描述','浏览','点赞','更新时间','摄影类型','发布状态','图片总数']
    // 内容
    let table = list.map((item, index) => {
      let arr = [ index+1 ]
      for (const key in item) {
        let value = item[key]
        if (key === 'photer') { // 摄影师
          value = item[key].length===0?'未知摄影师':item[key][0].phpName
        }
        if (key === 'createTime') {// 创建时间
          let time = new Date(Number(item[key]))
          let year = time.getFullYear()
          let month = time.getMonth() + 1
          let date = time.getDate()
          value = `${year}/${month}/${date}`
        }
        if (key === 'imgs') { // 图片路径
          value = ''
          item[key].forEach(((url)=>{
            value = value + url + '|'
          }))
        }
        if (key === 'states') { // 发布状态
          switch (item[key]) {
            case '0':
              value = '未发布'
              break;
            case '1':
              value = '已发布'
              break;
            case '-1':
              value = '已下架'
              break;     
            default:
              break;
          }
        }
        if (key === '__v') { value = item.imgs.length } // 图片总数
        arr.push(value)
      }
      return arr
    })
    table.unshift(thead)
    // 导出
    let ws = XLSX.utils.aoa_to_sheet(table) // 数组转为标签页
    let wb = XLSX.utils.book_new() // 创建工作薄
    XLSX.utils.book_append_sheet(wb, ws) // 标签页写入工作薄
    XLSX.writeFile(wb, '客样照.xlsx') // 工作薄导出为excel文件
    this.setState({exportCard: false})
    message.success('导出成功')
  }
  // 初始化
  componentDidMount = async () => {
    // 初始化摄影师列表
    let { code, data } = await picApi.getphp() // 摄影师列表请求
    if (code) {return false} // 请求失败
    data.unshift({_id: '全部', phpName: '全部'}) // 添加全部摄影师选项
    this.setState({photers: data}) // 请求成功初始化摄影师列表
    // 获取跳转页面前信息 分页 查询方式
    let infos = localStorage.getItem('infos')
    if(infos){
      infos = JSON.parse(infos)
      let { page,pageSize,fun,photer,kw,viewType,stateType } = infos
      this.setState({page,pageSize,fun,photer,kw,viewType,stateType})
      return this.getFun()
    }
    // 页面第一次加载
    this.getListData() // 初始化客样照列表
    this.setState({fun: 'getListData'}) // 分页点击处理方法设置为分页查询
  }
  render() {
    let { columns, list, spinning, page, pageSize, count, kw,
      photers, photer, viewType, columnsSmall, stateType, exportCard, exportType } = this.state
    return (
      <div className={Style.box}>
        <Card title='客样照' className={Style.card}>
          <div className={Style.btnBox}>
            <div className={Style.left}>
              {/* 添加客样照 */}
              <Button type='primary' icon={<PlusOutlined />} className={Style.btn} onClick={() => {
                localStorage.setItem('infos', '')
                this.props.history.push('/admin/picAdd')
              }}>添加客样照</Button>
              {/* 搜索 */}
              <div className={Style.search}>
                <Input placeholder='标题/描述' className={Style.searchBox} value={kw} onChange={(e)=>{
                  this.setState({kw: e.target.value})
                }}/>
                <Button type='primary' icon={<SearchOutlined />} className={Style.btn} onClick={this.search}>搜索</Button>
              </div>
            </div>
            <div className={Style.right}>
              <Button type='primary' icon={<ExportOutlined />} className={Style.btn} onClick={()=>{
                this.exportCardData()
              }
              }>导出EXCEL</Button>
              <div className={Style.count}><span>{`共${count}条`}</span></div>
            </div>
          </div>
          
          <div className={Style.btnBox}>
            <div className={Style.left}>
              {/* 查询指定摄影师客样照 */}
              <div className={Style.btn}>
                  <span>摄影师：</span>
                  <Select style={{width:'100px'}} value= {photer} onChange={(photer)=>{
                      this.setState({photer}, () => { this.getByPhoter() })
                    }}>
                      {
                        photers.map((item, index) => {
                          return(<Select.Option value={item._id} key={index}>{item.phpName}</Select.Option>)
                        })
                      }
                  </Select>
                </div>
              {/* 发布状态 */}
              <div className={Style.btn}>
                <span>发布状态：</span>
                <Select style={{width:'100px'}} value= {stateType} onChange={(stateType)=>{
                    this.setState({stateType}, ()=>{this.pagination()})
                  }}>
                  <Select.Option value='全部'>全部</Select.Option>
                  <Select.Option value='1'>已发布</Select.Option>
                  <Select.Option value='0'>未发布</Select.Option>
                  <Select.Option value='-1'>已下架</Select.Option>
                </Select>
              </div>
                {/* 显示方式 */}
                <div className={Style.btn}>
                <span>显示：</span>
                <Select style={{width:'100px'}} value= {viewType} onChange={(viewType)=>{
                    this.setState({viewType})
                  }}>
                  <Select.Option value='详情模式'>详情模式</Select.Option>
                  <Select.Option value='精简模式'>精简模式</Select.Option>
                </Select>
              </div>
            </div>
          </div>
          {/* 客样照列表 */}
          <Spin spinning={spinning}>
            {viewType==='详情模式'?
            <Table columns={columns} dataSource={list} rowKey='_id' scroll={{x:900,y:280}} pagination={false}></Table>
            :<Table columns={columnsSmall} dataSource={list} rowKey='_id' scroll={{x:900}} pagination={false}></Table>
          }
          </Spin>

          {/* 分页 */}
          <Pagination showQuickJumper current={page}
            total={count} pageSize={pageSize} style={{marginTop: '10px', textAlign: 'center'}}
            showSizeChanger={true} pageSizeOptions={['2','4','10','20']} 
            onChange={(page) => { // 页码变化更新页面
              this.setState({page},() => {
                this.pagination()
              })
            }}
            onShowSizeChange={(page, pageSize) => {
              this.setState({page, pageSize}, ()=>{ this.getFun() })
            }}
          />
        </Card>
        <Modal
        title='导出EXCEL'
          visible={exportCard}
          onOk={this.export}
          onCancel={()=>{this.setState({exportCard: false})}}
        >
          <div>
            <span>导出数据：</span>
            <Select style={{width:'130px',marginBottom: '5px'}} value= {exportType} onChange={(exportType)=>{
                this.setState({exportType})
              }}>
              <Select.Option value='全部'>全部</Select.Option>
              <Select.Option value='当前查询数据'>当前查询数据</Select.Option>
            </Select>
          </div>
          <div>
            {
              this.state.exportCardObj.map((item) => {
                let show = ''
                for (const key in item) {
                  show = <p key={key} style={{marginBottom: '.01rem'}}>{key}：{item[key]}</p>
                }
                return (show)
              })
            }
            
          </div>
        </Modal>
      </div>
    );
  }
}

export default PicList
