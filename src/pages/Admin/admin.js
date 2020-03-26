import React, { Component } from 'react'
import { Layout,  } from 'antd';
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
const { Header, Content, Footer,Sider } = Layout;
export default class Admin extends Component {
  render() {
    return(
    <Layout className={s.outer}>
    <Sider  style={{background:'yellow'}}>
      <div style={{height:64,width:200,background:'blue'}} className="logo" >放logo </div>
       <Nav></Nav>
    </Sider>
    
    <Layout >
      <Header style={{background:'red'}} >这里是头部</Header>
      <Content >
        <div  >
         {this.props.children}
        </div>
      </Content>
      <Footer >Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  )
  }
}
