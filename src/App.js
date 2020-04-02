import React, { Component }from 'react';
import './reset.css'
import LoadAble from './ultils/loadable'
import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'
//后台系统主页
import Admin from './pages/Admin/admin'
//用户登录页面
import Login from './pages/login/login'
//用户注册页面
import Reg from './pages/Reg/reg'
import Update from './pages/update/update.js'
//管理员成员信息
import AdminInfo from './pages/Administror/admin'
import UserInfo from './pages/userInfo'
import Book from './pages/book'
import Order from './pages/order'
//评论页
const How = LoadAble(() => import('./pages/how/how'))
// 轮播图
const Banner = LoadAble(() => import('./pages/Banner'))
// 客样照列表
const PicList = LoadAble(() => import('./pages/Pic/PicList'))
// 客样照列表
const PicAdd = LoadAble(() => import('./pages/Pic/PicAdd'))
// 客样照修改
const PicUpdate = LoadAble(() => import('./pages/Pic/PicUpdate'))
//数据统计列表
const Look = LoadAble(() => import('./pages/echart/echart'))

const TokenModel = LoadAble(() => import('./component/TokenModel'))
class App extends Component{
  componentDidMount(){
    localStorage.setItem('infos', '')
  }
  render(){
    return (
      <div>
        <HashRouter>
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
                  <Route path='/admin/index' component={Look}></Route> 
                  <Route path='/admin/admin' component={AdminInfo}></Route>
                  <Route path='/admin/user/how' component={How}/>
                  <Route path='/admin/banner' component={Banner}></Route>
                  <Route path='/admin/picList' component={PicList}></Route>
                  <Route path='/admin/picAdd' component={PicAdd}></Route>
                  <Route path='/admin/user/book' component={Book}></Route>
                  <Route path='/admin/user/info' component={UserInfo}></Route>
                  <Route path='/admin/user/order' component={Order}></Route>
                  <Route path='/admin/picUpdate/:_id' component={PicUpdate}></Route>
                </Admin>
              )
            }}/>
          </Switch>
          <TokenModel></TokenModel>
        </HashRouter>  
        </div>
    );
  }
}
// function App() {
//   return (
//     <div>
//       <HashRouter>
//         {/* <Switch> */}
//           {/* <Redirect exact from='/' to='/login' ></Redirect>   */}
//         <Switch>
//           <Redirect exact from='/' to='/login' ></Redirect>  
//           <Route path='/login' component={Login}/>
//           <Route path='/reg' component={Reg}/>
//           <Route path='/update' component={Update}/>
//           {/* <Route path='/admin' component={Admin}/> */}
//           <Route  path='/admin' render={()=>{
//             return(
//               <Admin>
//                 <Route path='/admin/admin' component={AdminInfo}></Route>
//                 <Route path='/admin/user/how' component={How}/>
//                 <Route path='/admin/banner' component={Banner}></Route>
//                 <Route path='/admin/picList' component={PicList}></Route>
//                 <Route path='/admin/picAdd' component={PicAdd}></Route>
//                 <Route path='/admin/user/book' component={Book}></Route>
//                 <Route path='/admin/user/info' component={UserInfo}></Route>
//                 <Route path='/admin/user/order' component={Order}></Route>
//                 <Route path='/admin/picUpdate/:_id' component={PicUpdate}></Route>
//                 <Route path='/admin/look' component={Look}></Route> 
//               </Admin>
//             )
//           }}/>
//         </Switch>
//         <TokenModel></TokenModel>
//       </HashRouter>  
//       </div>
//   );
// } 

export default App;
