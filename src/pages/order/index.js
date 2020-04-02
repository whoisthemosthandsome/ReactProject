import React, { Component, Fragment } from 'react';
import {Card,Table,Button,Popconfirm,Modal,Input,message,Form, Spin} from 'antd';
import { UserAddOutlined,DeleteOutlined } from '@ant-design/icons'
import s from './index.module.less'
import api from '../../api/orderApi'
import baseUrl from '../../ultils/baseUrl'
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
        user:[],
        php:[],
        pic:[],
        loading:false,
        columns:[
        {
            title: 'id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: '姓名',
            render:(record)=>{
                return(
                    record.userName[0].userName
                )
            },
            key: 'userName',
        },
        {
            title: '摄影师',
            render:(record)=>{
                return(
                    record.phoid[0].phpName
                )
            },
            key: 'phoid',
        },
        {
            title: '照片类型',
            render:(record)=>{
                return(
                    record.picid[0].phpType
                )
            },
            key: 'picid',
        },
        {
            title: '照片',
            render:(record)=>{
                return(
                    record.picid[0].imgs.map((item,index)=>{
                        return(
                            <img src={baseUrl+item} alt="未找到" key={index} width='50' height='50'/>
                        )
                    })
                )
            },
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
        // console.log(result)
        this.setState({dataSource:result.list})
        this.setState({loading:false})
    }
    async componentDidMount(){
        await this.getInfo()
        let res = await api.getuser()
        this.setState({user:res.list})
        let result = await api.getphp()
        this.setState({php:result.data})
        let resu = await api.getpic()
        // console.log(resu)
        this.setState({pic:resu.list})
        // this.setState = (state, callback) => {
        //     return false
        // }
        // console.log(this.state.pic)
    }
    //添加用户操作
    onFinish = values => {
        // let userName=values.username;
        let date=values.date;
        // let phoid=values.phoid;
        // let picid=values.picid;
        this.setState({date})
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
        this.setState({
            modal: false,
            }); 
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
        console.log(1)
        console.log(this.state.modal)
        this.setState({
        modal: true,
        });
        console.log(this.state.modal)
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
    let {dataSource,columns ,user,pic,php,userName,phoid,picid} = this.state
    return (
        <div className={s.card}>
            <Spin spinning={this.state.loading}>
                <div className="site-card-border-less-wrapper" >
                    <Card title="订单操作" bordered={false} >
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
                    label="客户"
                >
                    <select value={userName} onChange={(e)=>{
                        this.setState({userName:e.target.value})
                    }
                    }>
                        <option value='0' key='a'>请选择用户</option>
                        {
                            user.map((item,index) => {
                                return(<option value={item._id} key={item._id}>{item.userName}</option>)
                            })
                        }
                    </select>
                </Form.Item>
                <Form.Item
                    label="date"
                    name="date"
                    rules={[{ required: true, message: 'Please input date!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="摄影师" >
                    <select value={phoid} onChange={(e)=>{
                        this.setState({phoid:e.target.value})
                    }
                    }>
                        <option value='0' key='a'>请选择摄影师</option>
                        {
                            php.map((item,index) => {
                                return(<option value={item._id} key={item._id}>{item.phpName}</option>)
                            })
                        }
                    </select>
                </Form.Item>
                <Form.Item label="照片" >
                    <select value={picid} onChange={(e)=>{
                        this.setState({picid:e.target.value})
                    }
                    }>
                        <option value='0' key='a'>请选择照片类型</option>
                        {
                            pic.map((item,index) => {
                                return(<option value={item._id} key={item._id}>{item.phpType}</option>)
                            })
                        }
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