import React, { Component } from 'react'
import { Layout, Button } from 'antd';
import Php from '../Php'
import TokenModel from '../../component/TokenModel/index'
// import {
//   AppstoreOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   ShopOutlined,
//   TeamOutlined,
//   UserOutlined,
//   UploadOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';
import s from './admin.module.less'
import Nav from '../../component/customNav/customNav'
import {HashRouter,Route} from 'react-router-dom'
import PhpUpdate from '../PhpUpdate';
import PhpDetails from '../PhpDetails';
import PhpDetailsUpdate from '../PhpDetailsUpdate';
const { Header, Content, Footer,Sider } = Layout;
export default class Admin extends Component {
  render() {
    return(
      <Layout className={s.outer}>
      <TokenModel></TokenModel>
    <Sider  style={{background:'yellow'}}>
      <div style={{height:64,width:200,background:'pink',textAlign:'center'}} className="logo" >logo </div>
       <Nav></Nav>
    </Sider>
    
    <Layout >
      <Header style={{background:'white'}} > <Button onClick={()=>{
        console.log(this)
        // this.props.history.replace('/login')
      // let location=(window.location.href).split('/login')[0]
      window.location.href='/login'
        localStorage.setItem('token','')
      }}>退出登录</Button>
      
      </Header>
      <Content >
        <div  >
        <HashRouter>
          <Route path='/admin/php' component={Php}></Route>
          <Route path='/admin/phpupdate/:id' component={PhpUpdate}></Route>
          <Route path='/admin/phpdetails' component={PhpDetails}></Route>
          <Route path='/admin/phpdetailsupdate/:id' component={PhpDetailsUpdate}></Route>
        </HashRouter>
         {this.props.children}
        </div>
      </Content>
      <Footer style={{textAlign:'center'}}>金夫人</Footer>
    </Layout>
  </Layout>
  )
  }
}
