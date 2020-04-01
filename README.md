# ReactProject

ui 框架 antd
前端框架 react
网络请求 axios
预处理语言 less
屏幕适配方案：百分比布局 栅格布局
路由插件 react-router-dom
全局状态管理 react-redux redux

## npm

已下载
less less-loader --save-dev
axios
react-router-dom
react-redux
redux
antd

### 项目确定

1.模板: 微信金夫人小程序
页面样式 antd pro

### 分工
1.登录页面 胡和杰
2.数据可视化 顾宇筝
3.轮播数据管理 王念
4.摄影师数据管理 点击摄影师页面得到的数据 麻星宇
5.照片详细数据管理 首页展示的数据 王念
6.评价数据  顾宇筝
7.预约记录/订单信息 用户个人信息 胡和杰 
8.摄影师的档期记录 麻星宇

### 数据库地址

mongodb+srv://admin:huhejie@reactpro-0ji7f.mongodb.net/test?retryWrites=true&w=majority

### 协同软件

Tower

### 数据库名称


### 导航条 路径
登录 /login
1.数据可视化/admin/look key=look-
2.管理员 /admin/admin key=admin-
3.客样照 /admin/pic key=pic-
4.轮播 /admin/banner key=ban-
5.摄影师数据 /admin/photer key=pho-
6.用户 /admin/user key=user- 评价 /admin/user/how key=how- 预约 /admin/user/book key=book-

### 接口问题
1. node 里面写了cors跨域 前端不用代理跨域  可以直接调接口 
  接口路径前面需要加上 localhost:3001
2. ultils 里面有一个baseUrl.js 抛出了localhost:3001
  调接口时可以直接引入 拼接在接口路径前面
3. 举例 
  后端接口为 /banner/get
  前端调用时
  import baseUrl from '../ultils/baseUrl'
  import axios from '../ultils'
  class bannerApi {
    get(){
      let url = baseUrl + '/banner/get'
      return axios.post(url)
    }
  }
  export default new bannerApi()

### 图片显示
同调接口 在数据库获取的路径前面 拼接baseUrl
举例
<img src={baseUrl + url} alt='' />

### 评论 显示时间 时间戳减去当前时间撮

### 进度

顾宇筝 还剩可视图未完成
麻星宇 摄影师详情增加
王念 全部已完成
胡和杰 网页差一点