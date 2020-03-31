import React, { Component, Fragment } from 'react';
import {Card,Table,Button,Popconfirm,Modal,Input,message,Form, Spin } from 'antd';
import { UserAddOutlined,DeleteOutlined} from '@ant-design/icons'
import s from './index.module.less'
import api from '../../api/bookApi'
// import { wait } from '@testing-library/react';
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
        name:'',//usename
        phoName:'',//摄影师
        _id:'',
        date:'',
        loading:false,
        php:[],
        user:[],
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
                    record.name[0].userName
                )
            },
            key: 'name',
        },
        {
            title: '摄影师',
            render:(record)=>{
                return(
                    record.phoName[0].phpName
                )
            },
            key: 'phoName',
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
        let result= await api.get();
        this.setState({loading:true})
        // console.log(result)
        this.setState({dataSource:result.list})
        // console.log(this.state.dataSource)
        this.setState({loading:false})
    }
    async componentDidMount(){
        await this.getInfo()
        let result = await api.getphp()
        this.setState({php:result.data})
        let res = await api.getuser()
        this.setState({user:res.list})
        this.setState = (state, callback) => {
            return false
        }
    
        // let {_id,phpName} = result
        // console.log(result,this.state.php,res)
    }
    //添加用户操作
    onFinish = values => {
        // let name=values.name;
        let date=values.date;
        // let phoName=values.phoName;
        // console.log(name,date,phoName )
        this.setState({date})
    };
    //添加用户操作函数
    add=async(e)=>{   
        let {name,date,phoName} = this.state
        // console.log({name,date,phoName} )
        if(!{name,date,phoName}){message.error('请先确定')}
        let result=await api.add({name,date,phoName})
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
    let {dataSource,columns ,php,user,name,phoName} = this.state
    return (
        <div className={s.card}>
            <Spin spinning={this.state.loading}>
                <div className="site-card-border-less-wrapper" >
                    <Card title="预约操作" bordered={false} >
                        < Button  type="primary" onClick={this.model} icon={<UserAddOutlined />}>添加</Button>
                        <Table scroll={{y:800}}  rowKey='_id' loading={this.loading} pagination={false} dataSource={dataSource} columns={columns} className={s.table}/>
                    </Card>
                </div>
            {/* 添加 */}
            <Modal
            title="添加预约"
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
                    <select value={name} onChange={(e)=>{
                        this.setState({name:e.target.value})
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
                    <select value={phoName} onChange={(e)=>{
                        this.setState({phoName:e.target.value})

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