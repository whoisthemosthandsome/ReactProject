import React, { Component, Fragment } from 'react';
import {Card,Table,Button,Popconfirm,Modal,Input,message,Form, Spin} from 'antd';
import { UserAddOutlined,DeleteOutlined ,SnippetsOutlined} from '@ant-design/icons'
import s from './index.module.less'
import api from '../../api/userApi'
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
        phoneNumber:'',//电话
        avatar:'',//头像
        order:'',//订单
        _id:'',
        phoneNumber:'',
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
            title: '头像',
            key: 'avatar',
            render:(record)=>{
                return(
                    <Fragment>
                        <img src={record.avatar} alt="未找到"/>
                    </Fragment>
                )
            }
        },
        {
            title: '订单',
            dataIndex: 'order',
            key: 'order',
        },
        {
            title: '电话',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
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
                    < Button type="dashed" icon={<SnippetsOutlined />} onClick={()=>this.findOne(record._id)}>修改用户信息</Button>
                </Fragment>  
            )
            }
        },
        ]
    }
    //-------------------------------------方法-------------------------------------
    //得到用户信息
    getInfo=async()=>{
        this.setState({loading:true})
        let result= await api.get();
        this.setState({dataSource:result.list,loading:true})
        this.setState({loading:false})
    }
    async componentDidMount(){
        await this.getInfo()
    }
    //添加用户操作
    onFinish = values => {
        let userName=values.username;
        let passWord=values.password;
        let order=values.order;
        let avatar=values.avatar;
        let phoneNumber=values.phoneNumber;
        this.setState({userName,passWord,order,avatar,phoneNumber})
    };
    //修改用户
    onFinish1 = values => {
        // console.log(values);
        let passWord=values.password;
        let order=values.order;
        let avatar=values.avatar;
        let phoneNumber=values.phoneNumber;
        this.setState({passWord,order,avatar,phoneNumber})
    };
    //添加用户操作函数
    add=async(e)=>{   
        let {userName,passWord,order,phoneNumber,avatar} = this.state
        if(!{userName,passWord,order,phoneNumber,avatar}){message.error('请先确定')}
        let result=await api.add({userName,passWord,order,phoneNumber,avatar})
        if(result.code!==0){
        message.error('用户添加失败')
        return false
        }
        message.success("添加用户成功")
        this.getInfo()
    }
    //  删除用户
    del=async(_id)=>{
        let result =await api.del(_id)
        console.log(_id,result)
        if(result.code!==0){
        message.error('用户删除失败')
        return false
        }
        message.success('用户删除成功')
        this.getInfo()
    }
    //控制添加模态框的显影
    model=()=>{
        this.setState({
        modal: true,
        });
    }
    //确定添加新管理员
    findOne=async (_id)=>{
        this.setState({
        modal1: true,
        })
        let result = await api.getone(_id)
        let {userName,passWord,order,phoneNumber,avatar} = result.list[0]
        this.setState({userName,passWord,_id,avatar,order,phoneNumber})
    }
    //修改信息
    update=async ()=>{
        let {userName,passWord,order,phoneNumber,avatar,_id} = this.state
        // console.log(_id)
        console.log({userName,passWord,order,phoneNumber,avatar,_id})
        if(!{userName,passWord,order,phoneNumber,avatar,_id}){message.error('请先确定')}
        let result=await api.update({_id,userName,passWord,order,phoneNumber,avatar})
        //传参数写一个 后端结构赋值
        console.log(result)
        if(result.code!==0){
        message.error('用户修改失败')
        return false
        }
        message.success("修改成员成功")
        this.getInfo()
    }
    //添加
    handleOk = e => {
        this.add()
        this.setState({
        modal: false,
        }); 
        this.getInfo()
    };
    //更新
    handleOk1 = e => {
        this.update()
        this.setState({
        modal1: false,
        }); 
        this.getInfo()
    };
    //取消添加
    handleCancel = e => {
        this.setState({
        modal: false,
        modal1: false,
        });
    };
    render() {
    let {dataSource,columns ,userName,avatar,order,phoneNumber} = this.state
    return (
        <div className={s.card}>
            <Spin spinning={this.state.loading}>
                <div className="site-card-border-less-wrapper" >
                    <Card title="Card title" bordered={false} >
                        < Button  type="primary" onClick={this.model} icon={<UserAddOutlined />}>添加</Button>
                        <Table scroll={{y:800}}  rowKey='_id' loading={this.loading} pagination={false} dataSource={dataSource} columns={columns} className={s.table}/>
                    </Card>
                </div>
            {/* 添加 */}
            <Modal
            title="添加用户信息"
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
                    label="avatar"
                    name="avatar"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="order"
                    name="order"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="phoneNumber"
                    name="phoneNumber"
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    确定
                    </Button>
                </Form.Item> 
                </Form>
            </Modal>
            {/* 修改 */}
            <Modal
                title="修改用户信息"
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
                    label="avatar"
                    name="avatar"
                >
                    <Input placeholder={avatar} />
                </Form.Item>
                <Form.Item
                    label="order"
                    name="order"
                >
                    <Input placeholder={order}/>
                </Form.Item>
                <Form.Item
                    label="phoneNumber"
                    name="phoneNumber"
                >
                    <Input placeholder={phoneNumber}/>
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