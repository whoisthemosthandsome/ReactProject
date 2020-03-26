import React, { Component, Fragment } from 'react';
import {Card,Table,Button,Popconfirm,Modal,Spin,Input,message,Form, } from 'antd';
import { UserAddOutlined,DeleteOutlined } from '@ant-design/icons'
import s from './index.module.less'
import userApi from '../../api/userApi'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
class admins extends Component {
  state={
    loading:false,//页面加载状态自动为未加载成功
    modal:false,//模态框默认是隐藏的
    spinning:false,//页面加载状态自动为未加载成功
    dataSource:[],
    name:'',//usename
    pwd:'',//userPassword
    columns:[
      {
        title: 'id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: '姓名',
        dataIndex: 'userName',
        key: 'name',
      },
      {
        title: '操作',
        key: 'action',
        render:(record)=>{
          return(
            <Fragment> 
              <Popconfirm
              title='确定要删除吗'
              onConfirm={()=>this.del(record._id)}
              okText="是的"
              cancelText="按错了"
              >
                < Button type="danger" ghost={true} icon={<DeleteOutlined/>}>删除</Button>
              </Popconfirm>  
              </Fragment>  
          )
        }
      },
    ]
  }
  
  //-------------------------------------方法-------------------------------------
  //得到管理员信息
  getInfo=async()=>{
    let result= await userApi.userList();
    this.setState({dataSource:result.adminList,loading:true})
    console.log(1)
  }
  componentDidMount(){
    this.getInfo()
    console.log( '数据请求到了')
  }
  //添加管理员
  onFinish = values => {
    console.log('72Success:', values);
    let name=values.username;
    let pwd=values.password;
    this.setState({name,pwd})
  };
  add=async(e)=>{   
    let {name,pwd} = this.state
    console.log(name,pwd)
    let result=await userApi.add({userName:name,passWord:pwd})
    console.log(result)
    if(result.code!==0){
      message.error('用户添加失败')
      return false
    }
    message.success("添加成员成功")
  }
  //  删除
  del=async(_id)=>{
    let result =await userApi.del(_id)
    if(result.code!==0){return false}
    this.getInfo()
  }
  //控制添加模态框的显影
  model=()=>{
    this.setState({
      modal: true,
    });
  }
  确定添加新管理员
  handleOk = e => {
    this.add()
    this.setState({
      modal: false,
    }); 
    this.getInfo()
  };
  //取消添加新管理员
  handleCancel = e => {
    console.log('cancel');
    this.setState({
      modal: false,
    });
  };
  render() {
    let {dataSource,columns } = this.state
    return (
      <div className={s.card}>
         <div className="site-card-border-less-wrapper" >
            <Card title="Card title" bordered={false} >
            < Button  type="primary" onClick={this.model} icon={<UserAddOutlined />}>添加</Button>
              {/* <Spin spinning={this.spinning}> */}
             <Table scroll={{y:300}}  rowKey='_id' loading={this.loading} pagination={false} dataSource={dataSource} columns={columns} className={s.table}/>
              {/* </Spin> */}
            </Card>i
          </div>
           <Modal
            title="添加管理员信息"
            visible={this.state.modal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
           <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={onFinishFailed}
          >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
       <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          ok
        </Button>
      </Form.Item> 
    </Form>
          </Modal>
      </div>
     
    );
  }
}

export default admins;