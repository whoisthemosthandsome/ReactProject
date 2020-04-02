import React, { Component } from 'react';
import {NavLink}  from 'react-router-dom'
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import s from './login.module.less'
import api from '../../api/loginApi'
class login extends Component {
  onFinish =async(values) => {
    // console.log('Received values of form: ', values); 
    let {userName,passWord} = values
    // console.log({userName,passWord})
    api.login({userName,passWord})
    .then((res)=>{
      localStorage.setItem('token',res.token)
      // console.log(res)
      if(res.code == 0){
        message.success('登录成功，3s后跳转首页',3,()=>{
          this.props.history.replace('/admin')
        })
      }
      else{ message.error('输入有误请重试')}
    })
    .catch((err)=>{
      message.error('输入有误请重试')
    })
      //可以用这个写法实现路由跳转
      // let location=(window.location.href).split('/login')[0]
      // window.location.href=`${location}/admin`
  };
  render() {
    return (
      <div className={s.login}>
      <h2>登录页面</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
            {
              min:3,
              message:'您的用户名必须多于3位数字或字母'
            },
            {
              max:12,
              message:'您的名字太长啦'
            },
            {
              whitespace:true,
              message:'全是空格噢'
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="passWord"

          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
            {
              min:3,
              message:'您的密码太简单了'
            },
            {
              max:18,
              message:'您的密码太长了，不容易记住噢'
            },
            {
              whitespace:true,
              message:'全是空格噢'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <span className="login-form-forgot">
            <NavLink to='/update'> Forgot password</NavLink>
          </span>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <NavLink to='/reg'>register now!</NavLink>
        </Form.Item>
      </Form>
      </div>
  );
  }
};

export default login
