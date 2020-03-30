import React, { Component, Fragment } from 'react';
import {Card,Table,Button,Popconfirm,Modal,Input,message,Form, Spin} from 'antd';
import { UserAddOutlined,DeleteOutlined ,SnippetsOutlined} from '@ant-design/icons'
import s from './index.module.less'
import api from '../../api/orderApi'
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
        dataSource:[],
        userName:'',//usename
        phoid:'',//头像
        _id:'',
        date:'',
        picid:'',
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
            title: '摄影师',
            dataIndex: 'phoid',
            key: 'phoid',
        },
        {
            title: '照片',
            dataIndex: 'picid',
            key: 'picid',
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
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
        let date=values.date;
        let phoid=values.phoid;
        let picid=values.picid;
        this.setState({userName,date,phoid,picid})
    };
    //添加用户操作函数
    add=async(e)=>{   
        let {userName,date,phoid,picid} = this.state
        if(!{userName,date,phoid}){message.error('请先确定')}
        let result=await api.add({userName,date,phoid,picid})
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
    //添加
    handleOk = e => {
        this.add()
        this.setState({
        modal: false,
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
    let {dataSource,columns ,} = this.state
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
            title="添加订单"
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
                    label="date"
                    name="date"
                    rules={[{ required: true, message: 'Please input date!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="phoid"
                    name="phoid"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="picid"
                    name="picid"
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
            </Spin>
        </div>
        );
    }
}

export default admins;