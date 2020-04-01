import React, { Component } from 'react';
import PhpApi from '../../api/phpApi'
import { Table,Spin,Button,Popconfirm,notification, Modal,Pagination} from 'antd';
import phpApi from '../../api/phpApi';
class Php extends Component {
    state = { 
        phpList:[],
        spinning:true,
        visible1: false,
        phpName:'',
        phpPosition:'',
        phpSelect:'',
        phpID:'',
        imgPath:'',
        totle:'',
        page:1,
        pageSize:2,
        columns:[
            {
              title: '_id',
              dataIndex: '_id',
              key: '_id',
              render: text => <span>{text}</span>,
            },
            {
                title: '摄影师',
                dataIndex: 'phpName',
                key: 'phpName',
                render: text => <span>{text}</span>,
              },
              {
                title: '职务',
                dataIndex: 'phpPosition',
                key: 'phpPosition',
                render: text => <span>{text}</span>,
              },
              {
                title: '选择人数',
                dataIndex: 'phpSelect',
                key: 'phpSlect',
                render: text => <span>{text}</span>,
              },
              {
                title: '缩略图',
                dataIndex: 'imgPath',
                key: 'imgPath',
                render: (recore)=>{
                  return(
                    <img src={recore} alt="" style={{width:100,height:100}}/>
                  )
                },
              },
              {
                title: '摄影师ID',
                dataIndex: 'phpID',
                key: 'phpID',
                render: text => <span>{text}</span>,
              },
              {
                title: '操作',
                key: 'caozuo',
                render:(record)=>{
                  return(
                    <div>
                    <Popconfirm
                    title="Are you sure delete this task?"
                    onConfirm={(e)=>{
                      PhpApi.phpDel(record._id).then((data)=>{
                        PhpApi.getPhp().then((data)=>{
                          this.setState({phpList:data.data})
                      }).catch((err)=>{
                          console.log(err)
                      })
                        notification.open({
                          message: '删除成功',
                          description:
                            '你删除了一条数据，找不回来了',
                          onClick: () => {
                            console.log(this);
                          }})
                      }).catch((err)=>{
                        console.log(err)
                      })
                    }}
                    onCancel={()=>{
                      
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                       <Button type='danger'>删除</Button>
                  </Popconfirm>,
                         <div>
                         <Button onClick={()=>{
                         this.props.history.push(`/admin/phpupdate/${record._id}`)
                         }}>
                           更新
                         </Button>
                       </div>
                    </div> 
                  )
                }
              }
          ]
     }
     componentDidMount(){
        PhpApi.getPhp().then((data)=>{
            this.setState({totle:data.data.length})
        }).catch((err)=>{
            console.log(err)
        })
        let {page,pageSize}  = this.state
        phpApi.phpFindByPage(page,pageSize).then((data)=>{
          this.setState({phpList:data.result,spinning:false})
        })
     }
    render() { 
      let {phpName,phpPosition,phpSelect,phpID,imgPath,page,pageSize,totle}=this.state
        return ( 
          <div>
            <Spin spinning={this.state.spinning}>
            <div>
            <Button type="primary" onClick={()=>{
              this.setState({visible1:true})
            }}>
              增加
            </Button>
            <Modal
              title="你想怎么增"
              visible={this.state.visible1}
              onOk={()=>{
                phpApi.phpInsert({phpName,phpPosition,phpSelect,phpID,imgPath}).then((data)=>{
                  PhpApi.getPhp().then((data)=>{
                    this.setState({phpList:data.data,spinning:false,visible1:false})
                }).catch((err)=>{
                    console.log(err)
                })
                }).catch((err)=>{
                  console.log(err)
                })
              }}
              onCancel={()=>{
                this.setState({visible1:false})
              }}
            >
            摄影师名字：<input type="text" value={this.state.phpName} onChange={(e)=>{
              this.setState({phpName:e.target.value})
             }}/><hr/>
             职      位：<input type="text" value={this.state.phpPosition} onChange={(e)=>{
              this.setState({phpPosition:e.target.value})
             }}/><hr/>
             选  择  数：<input type="text" value={this.state.phpSelect} onChange={(e)=>{
              this.setState({phpSelect:e.target.value})
             }}/><hr/>
             ID        ：<input type="text" value={this.state.phpID} onChange={(e)=>{
              this.setState({phpID:e.target.value})
             }}/><hr/>
             摄影师相片: <input type="file" ref="img"/> <Button onClick={()=>{
              let file=new FormData()
              file.append("xixi",this.refs.img.files[0])
              phpApi.phpFile(file).then((data)=>{
                let path=data.path
                this.setState({imgPath:path})
              }).catch((err)=>{
                console.log(err)
              })
          }}>上传</Button>
           <img src={this.state.imgPath} alt="" style={{width:100,height:100}}/>
            </Modal>
          </div>
              <Table columns={this.state.columns} dataSource={this.state.phpList} rowKey="_id" pagination={false}/>
              <Pagination  current={page} total={totle} showQuickJumper pageSize={pageSize}
              onChange={(page,pageSize)=>{         
                this.setState({page},()=>{
                  phpApi.phpFindByPage(page,pageSize).then((data)=>{
                    this.setState({phpList:data.result})
                  })
                })   
              }}
              />
            </Spin>
          </div>
       
         );
    }
}
export default Php;