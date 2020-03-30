import React, { Component, Fragment } from 'react';
// import s from './customNav.module.less' 
import { Menu } from 'antd';
import {withRouter} from 'react-router-dom'
import { HomeOutlined,AppstoreOutlined, MailOutlined, UserOutlined,CheckSquareOutlined, MacCommandOutlined,DingdingOutlined} from '@ant-design/icons';
import navInfo from '../navInfo' //引入导航栏列表信息
const { SubMenu } = Menu;
class customNav extends Component {
  jump(e){//点击事件 触发路径切换。
    let path=(e.item.props.path)
    this.props.history.replace(path)
  };
  renderIcon(icon){
    switch (icon) {
      case 'home':
        return <HomeOutlined/>
      case 'Dashboard':
        return <AppstoreOutlined/>
      case 'sheet':
        return <MailOutlined/>
      case 'banner':
        return <MacCommandOutlined />
      case 'Ding':
        return <DingdingOutlined />
      case 'user':
        return <UserOutlined />
      default:
      return <CheckSquareOutlined />
    }
  }
  renderItem(data){//递归 通过列表数据渲染页面
    return data.map((item,index)=>{
      if(item.children){
       return(
         <SubMenu key={item.key} title={(()=>{
           return(
              <Fragment>
                {this.renderIcon(item.icon)}
                {item.title}
              </Fragment> 
            )
         })()
         }> 
            {this.renderItem(item.children)}
         </SubMenu>
       ) 
      }else{
        return(
        <Menu.Item key={item.key} path={item.path}>
          {this.renderIcon(item.icon)}
          { item.title}
        </Menu.Item>
        )
      }
      
     })
  }
  render() {
    return (
      
      <Menu
      mode="inline"
      style={{ width: 200}}
      onClick={this.jump.bind(this)}
      >
      {this.renderItem(navInfo)}
      {/* <Menu.Item>
       只有一级菜单的时候用Menu.Item
      </Menu.Item> 
      <SubMenu title='open'>
        <Menu.Item>
          有二级菜单时
        </Menu.Item>
        <Menu.Item>
          这里的open用title
        </Menu.Item>
        <Menu.Item>
          内容用Menu.Item
        </Menu.Item>
      </SubMenu> 
    </Menu.Item>*/}
    </Menu>
    );
  }
}

export default withRouter(customNav);