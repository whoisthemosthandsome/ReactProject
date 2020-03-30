import React from 'react';
<<<<<<< HEAD

import './reset.css'

import {HashRouter,Route,Redirect} from 'react-router-dom'
=======
import './reset.css';
import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'
>>>>>>> a0a2a97728761274a4413141ebcccbd12a5bbf64
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
<<<<<<< HEAD
import User from './pages/User/user'
=======
// 客样照修改
import PicUpdate from './pages/Pic/PicUpdate'
>>>>>>> a0a2a97728761274a4413141ebcccbd12a5bbf64
function App() {
  return (
    <div>
      <HashRouter>
        {/* <NavLink to='/login'>dnlgu</NavLink> */}
<<<<<<< HEAD
        
        {/* <Switch> */}
          {/* <Redirect exact from='/' to='/login' ></Redirect>   */}
=======
        <Switch>
          <Redirect exact from='/' to='/login' ></Redirect>  
>>>>>>> a0a2a97728761274a4413141ebcccbd12a5bbf64
          <Route path='/login' component={Login}/>
          <Route path='/reg' component={Reg}/>
          <Route path='/update' component={Update}/>
          {/* <Route path='/admin' component={Admin}/> */}
          <Route  path='/admin' render={()=>{
            return(
              <Admin>
                <Route path='/admin/echart' component={Echart}></Route>
<<<<<<< HEAD
                <Route path='/admin/admin' component={AdminInfo}></Route>
                <Route path='/admin/option1' component={Option1}/>
                <Route path='/admin/banner' component={Banner}></Route>
                <Route path='/admin/picList' component={PicList}></Route>
                <Route path='/admin/picAdd' component={PicAdd}></Route>
                <Route path='/admin/user' component={User}></Route>
              </Admin>
            )
          }}/>
        {/* </Switch> */}
        
        
=======
                <Route path='/admin/Info' component={AdminInfo}></Route>
                <Route path='/admin/user/how' component={How}/>
                <Route path='/admin/banner' component={Banner}></Route>
                <Route path='/admin/picList' component={PicList}></Route>
                <Route path='/admin/picAdd' component={PicAdd}></Route>
                <Route path='/admin/picUpdate/:_id' component={PicUpdate}></Route>
              </Admin>
            )
          }}/>
        </Switch>
>>>>>>> a0a2a97728761274a4413141ebcccbd12a5bbf64
      </HashRouter>  
      </div>
  );
} 

export default App;
