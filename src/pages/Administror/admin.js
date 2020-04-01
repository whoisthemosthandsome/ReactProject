import React, { Component, Fragment } from 'react';
import {Card,Table,Button,Popconfirm,Modal,Input,message,Form, Spin} from 'antd';
import { UserAddOutlined,DeleteOutlined ,SnippetsOutlined} from '@ant-design/icons'
import s from './index.module.less'
import api from '../../api/loginApi'
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
    modal:false,//模态框默认是隐藏的
    modal1:false,//模态框默认是隐藏的
    dataSource:[],
    userName:'',//usename
    passWord:'',//userPassword
    leavel:'',
    _id:'',
    loading:false,
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
        title: '权限',
        dataIndex: 'leavel',
        key: 'leavel',
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
          < Button type="dashed" icon={<SnippetsOutlined />} onClick={()=>this.findOne(record._id)}>修改管理员信息</Button>
              </Fragment>  
          )
        }
      },
    ]
  }
  //-------------------------------------方法-------------------------------------
  //得到管理员信息
  getInfo=async()=>{
    this.setState({loading:true})
    let result= await api.get();
    console.log(result)
    this.setState({dataSource:result.list,loading:true})
    this.setState({loading:false})
  }
  async componentDidMount(){
    await this.getInfo()
  }
  //添加管理员
  onFinish = values => {
    let userName=values.username;
    let passWord=values.password;
    let leavel=values.leavel;
    this.setState({userName,passWord,leavel})
  };
  //修改管理员
  onFinish1 = values => {
    console.log(values);
    let passWord=values.password;
    let leavel=values.leavel;
    this.setState({passWord,leavel})
  };
  add=async(e)=>{   
    let {userName,passWord,leavel} = this.state
    if(!{userName,passWord,leavel}){message.error('请先确定')}
    let result=await api.add({userName,passWord,leavel})
    if(result.code!==0){
      message.error('用户添加失败')
      return false
    }
    message.success("添加成员成功")
    this.getInfo()
  }
  //  删除
  del=async(_id)=>{
    let result =await api.del(_id)
    console.log(_id,result)
    if(result.code!==0){
      message.error('用户删除失败')
      return false
    }
    message.success('用户删除成功')
    await this.getInfo()
  }
  //控制添加模态框的显影
  model=()=>{
    this.setState({
      modal: true,
    });
  }
  确定添加新管理员
  findOne=async (_id)=>{
    this.setState({
      modal1: true,
    })
    let result = await api.up(_id)
    // console.log(result)
    let {userName,passWord,leavel} = result.list[0]
    await this.setState({userName,passWord,leavel,_id})
    // console.log({userName,passWord,leavel})
  }
  update=async ()=>{
    let {userName,passWord,leavel,_id} = this.state
    console.log(_id)
    console.log({userName,passWord,leavel,_id})
    if(!{userName,passWord,leavel,_id}){message.error('请先确定')}
    let result=await api.update({_id,userName,passWord,leavel})
    //传参数写一个 后端结构
    console.log(result)
    if(result.code!==0){
      message.error('用户修改失败')
      return false
    }
    message.success("修改成员成功")
    this.getInfo()
  }
  handleOk = e => {
    this.add()
    this.setState({
      modal: false,
      // modal1: false,
    }); 
    this.getInfo()
  };
  handleOk1 = e => {
    this.update()
    this.setState({
      modal1: false,
      // modal1: false,
    }); 
    this.getInfo()
  };
  //取消添加新管理员
  handleCancel = e => {
    // console.log('cancel');
    this.setState({
      modal: false,
      modal1: false,
    });
  };
  render() {
    let {dataSource,columns ,userName,passWord,leavel} = this.state
    // console.log(userName,passWord,leavel)
    return (
      <div className={s.card}>
        <Spin spinning={this.state.loading}>
         <div className="site-card-border-less-wrapper" >
            <Card title="管理操作" bordered={false} >
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
        rules={[{ required: true, message: 'Please input username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="leavel"
        name="leavel"
      >
        <select onChange={(e)=>{
            this.value=e.target.value
        }}>
          <option value="admin">admin</option>
          <option value="visitor">visitor</option>
        </select>
      </Form.Item>
       <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Form.Item> 
    </Form>
          </Modal>
          <Modal
            title="修改管理员信息"
            visible={this.state.modal1}
            onOk={this.handleOk1}
            onCancel={this.handleCancel}
          >
           <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish1}
            onFinishFailed={onFinishFailed}
          >
      <Form.Item
        label="Username"
        // name="username"
        rules={[{ required: true, message: 'Please input username!' }]}
      >
        <Input value={userName}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input password!' }]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item
        label="leavel"
        name="leavel"
      >
        <select key='admin' onChange={(e)=>{
            this.value=e.target.value
        }}>
          <option value="admin">admin</option>
          <option value="visitor">visitor</option>
        </select>
      </Form.Item>
       <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Form.Item> 
    </Form>
          </Modal>
          </Spin>
      </div>
     
    );
  }
}

export default admins;