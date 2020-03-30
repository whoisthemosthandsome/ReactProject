import React from 'react';
import './reset.css'

import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'
//后台系统主页
import Admin from './pages/Admin/admin'
//用户登录页面
import Login from './pages/login/login'
//用户注册页面
import Reg from './pages/Reg/reg'
import Update from './pages/update/update.js'
import Echart from './pages/echart/echart'
import How from './pages/how/how'
//管理员成员信息
import AdminInfo from './pages/Administror/adminInfo'
// 轮播图
import Banner from './pages/Banner'
// 客样照列表
import PicList from './pages/Pic/PicList'
// 客样照添加
import PicAdd from './pages/Pic/PicAdd'
import User from './pages/User/user'
// 客样照修改
import PicUpdate from './pages/Pic/PicUpdate'
function App() {
  return (
    <div>
      <HashRouter>
        {/* <NavLink to='/login'>dnlgu</NavLink> */}
        
        {/* <Switch> */}
          {/* <Redirect exact from='/' to='/login' ></Redirect>   */}
        <Switch>
          <Redirect exact from='/' to='/login' ></Redirect>  
          <Route path='/login' component={Login}/>
          <Route path='/reg' component={Reg}/>
          <Route path='/update' component={Update}/>
          {/* <Route path='/admin' component={Admin}/> */}
          <Route  path='/admin' render={()=>{
            return(
              <Admin>
                <Route path='/admin/echart' component={Echart}></Route>
                <Route path='/admin/admin' component={AdminInfo}></Route>
                <Route path='/admin/user/how' component={How}/>
                <Route path='/admin/banner' component={Banner}></Route>
                <Route path='/admin/picList' component={PicList}></Route>
                <Route path='/admin/picAdd' component={PicAdd}></Route>
                <Route path='/admin/picUpdate/:_id' component={PicUpdate}></Route>
              </Admin>
            )
          }}/>
        </Switch>
      </HashRouter>  
      </div>
  );
} 

export default App;
