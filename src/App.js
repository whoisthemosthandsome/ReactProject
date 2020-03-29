import React from 'react';

import './reset.css'
<<<<<<< HEAD
=======

>>>>>>> 263c81afa73c79cb07470e20de09f726a0127564
import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'
//后台系统主页
import Admin from './pages/Admin/admin'
//用户登录页面
import Login from './pages/login/login'
//用户注册页面
import Reg from './pages/Reg/reg'
import Update from './pages/update/update.js'
import Echart from './pages/echart/echart'
import Option1 from './component/option1/option1'
//管理员成员信息
import AdminInfo from './pages/Administror/adminInfo'
// 轮播图
import Banner from './pages/Banner'
// 客样照列表
import PicList from './pages/Pic/PicList'
// 客样照添加
import PicAdd from './pages/Pic/PicAdd'
function App() {
  return (
    <div>
      <HashRouter>
        {/* <NavLink to='/login'>dnlgu</NavLink> */}
        
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
                <Route path='/admin/Info' component={AdminInfo}></Route>
                <Route path='/admin/option1' component={Option1}/>
                <Route path='/admin/banner' component={Banner}></Route>
                <Route path='/admin/picList' component={PicList}></Route>
                <Route path='/admin/picAdd' component={PicAdd}></Route>
              </Admin>
            )
          }}/>
        </Switch>
        
        
      </HashRouter>  
      </div>
  );
} 

export default App;
