import React, { Component } from 'react';
import PhpDetailsApi from '../../api/phpDetailsApi'
import { Table,Spin,Button,Popconfirm,notification, Modal,Pagination} from 'antd';
class PhpDetails extends Component {
    state = { 
        phpList:[],
        spinning:true,
        visible1: false,
        phpName:'',
        phpPosition:'',
        phpSelect:'',
        phpID:'',
        imgPath:'',
        phpAtt:'',
        phpRsident:'',
        phpSatisfaction:'',
        phpTitle:'',
        phpSelf:'',
        phpRecom:'',
        venueImg:'',
        phpAuction:'',
        totle:'',
        reimg1:'',
        reimg2:'',
        reimg3:'',
        reimg4:'',
        page:1,
        pageSize:2,
        columns:[
            {
              title: '_id',
              dataIndex: '_id',
              key: '_id',
              ellipsis:'true',
              render: text => <a>{text}</a>,
            },
            {
                title: '摄影师',
                dataIndex: 'phpName',
                key: 'phpName',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '职务',
                dataIndex: 'phpPosition',
                key: 'phpPosition',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '选择人数',
                dataIndex: 'phpSelect',
                key: 'phpSlect',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '关注数',
                dataIndex: 'phpAtt',
                key: 'phpAtt',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '常驻',
                dataIndex: 'phpRsident',
                key: 'phpRsident',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '满意度',
                dataIndex: 'phpSatisfaction',
                key: 'phpSatisfaction',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '擅长',
                dataIndex: 'phpTitle',
                key: 'phpTitle',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '简介',
                dataIndex: 'phpSelf',
                key: 'phpSelf',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '样式照片',
                dataIndex: 'phpRecom',
                key: 'pphpRecom',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '广告图',
                dataIndex: 'venueImg',
                key: 'venueImg',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '档期',
                dataIndex: 'phpAuction',
                key: 'phpAuction',
                ellipsis:'true',
                render: text => <a>{text}</a>,
              },
              {
                title: '缩略图',
                dataIndex: 'imgPath',
                key: 'imgPath',
                render: (recore)=>{
                  return(
                    <img src={recore} alt="" style={{width:50,height:50}}/>
                  )
                },
              },
              {
                title: '摄影师ID',
                dataIndex: 'phpID',
                key: 'phpID',
                render: text => <a>{text}</a>,
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
                        PhpDetailsApi.phpDetailsDel(record._id).then((data)=>{
                        PhpDetailsApi.getPhpDetails().then((data)=>{
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
                         this.props.history.push(`/admin/phpdetailsupdate/${record._id}`)
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
        PhpDetailsApi.getPhpDetails().then((data)=>{
            this.setState({totle:data.data.length})
        }).catch((err)=>{
            console.log(err)
        })
        let {page,pageSize}  = this.state
        PhpDetailsApi.phpFindByPageDetails(page,pageSize).then((data)=>{
          this.setState({phpList:data.result,spinning:false})
        })
     }
    render() { 
      let {phpName,phpPosition,phpSelect,phpID,imgPath,phpAtt,phpRsident,phpSatisfaction,
        phpTitle,phpSelf,phpRecom,venueImg,phpAuction,page,pageSize,totle,reimg1,reimg2,reimg3,reimg4
    }=this.state
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
                let imglist=this.state.reimg1+'/'+this.state.reimg2+'/'+this.state.reimg3+'/'+this.state.reimg4
                PhpDetailsApi.phpInsertDetails({phpName,phpPosition,phpSelect,phpID,imgPath,phpAtt,phpRsident,phpSatisfaction,
                    phpTitle,phpSelf,phpRecom:imglist,venueImg,phpAuction
                }).then((data)=>{
                  PhpDetailsApi.getPhpDetails().then((data)=>{
                    this.setState({total:data.data.length})
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
            摄影师名字：<input type="text" value={phpName} onChange={(e)=>{
              this.setState({phpName:e.target.value})
             }}/><hr/>
             职      位：<input type="text" value={phpPosition} onChange={(e)=>{
              this.setState({phpPosition:e.target.value})
             }}/><hr/>
             选  择  数：<input type="text" value={phpSelect} onChange={(e)=>{
              this.setState({phpSelect:e.target.value})
             }}/><hr/>
             ID        ：<input type="text" value={phpID} onChange={(e)=>{
              this.setState({phpID:e.target.value})
             }}/><hr/>
             摄影师关注：<input type="text" value={phpAtt} onChange={(e)=>{
              this.setState({phpAtt:e.target.value})
               }}/><br/>
            摄影师常驻：<input type="text" value={phpRsident} onChange={(e)=>{
               this.setState({phpRsident:e.target.value})
              }}/><br/>
            摄影师满意度：<input type="text" value={phpSatisfaction} onChange={(e)=>{
                  this.setState({phpSatisfaction:e.target.value})
            }}/><br/>
            摄影师擅长：<input type="text" value={phpTitle} onChange={(e)=>{
              this.setState({phpTitle:e.target.value})
            }}/><br/>
            摄影师简介:<textarea value={phpSelf} onChange={(e)=>{
              this.setState({phpSelf:e.target.value})
            }}/><br/>
            摄影师档期:<input type="text" value={phpAuction} onChange={(e)=>{
              this.setState({phpAuction:e.target.value})
            }}/><br/>
            摄影师样品图1： <input type="file" ref="img1"/> <Button onClick={()=>{
              let file=new FormData()
              file.append("xixi",this.refs.img1.files[0])
              PhpDetailsApi.phpDetailsFile(file).then((data)=>{
                console.log(data)
                let path=data.path
                this.setState({reimg1:path})
              }).catch((err)=>{
                console.log(err)
              })
          }}>上传</Button>
          <img src={this.state.reimg1} alt="" style={{width:50,height:50}}/><br/>
            摄影师样品图2： <input type="file" ref="img2"/> <Button onClick={()=>{
              let file=new FormData()
              file.append("xixi",this.refs.img2.files[0])
              PhpDetailsApi.phpDetailsFile(file).then((data)=>{
                let path=data.path
                this.setState({reimg2:path})
              }).catch((err)=>{
                console.log(err)
              })
          }}>上传</Button>
          <img src={this.state.reimg2} alt="" style={{width:50,height:50}}/><br/>
            摄影师样品图3： <input type="file" ref="img3"/> <Button onClick={()=>{
              let file=new FormData()
              file.append("xixi",this.refs.img3.files[0])
              PhpDetailsApi.phpDetailsFile(file).then((data)=>{
                let path=data.path
                this.setState({reimg3:path})
              }).catch((err)=>{
                console.log(err)
              })
          }}>上传</Button>
          <img src={this.state.reimg3} alt="" style={{width:50,height:50}}/><br/>
            摄影师样品图4： <input type="file" ref="img4"/> <Button onClick={()=>{
              let file=new FormData()
              file.append("xixi",this.refs.img4.files[0])
              PhpDetailsApi.phpDetailsFile(file).then((data)=>{
                let path=data.path
                this.setState({reimg4:path})
              }).catch((err)=>{
                console.log(err)
              })
          }}>上传</Button>
          <img src={this.state.reimg4} alt="" style={{width:50,height:50}}/><br/>
            摄影师驻地图： <input type="file" ref="img5"/> <Button onClick={()=>{
              let file=new FormData()
              file.append("xixi",this.refs.img5.files[0])
              PhpDetailsApi.phpDetailsFile(file).then((data)=>{
                let path=data.path
                this.setState({venueImg:path})
              }).catch((err)=>{
                console.log(err)
              })
          }}>上传</Button>
          <img src={this.state.venueImg} alt="" style={{width:50,height:50}}/><br/>
             摄影师相片: <input type="file" ref="img"/> <Button onClick={()=>{
              let file=new FormData()
              file.append("xixi",this.refs.img.files[0])
              PhpDetailsApi.phpFileDetails(file).then((data)=>{
                let path=data.path
                this.setState({imgPath:path})
              }).catch((err)=>{
                console.log(err)
              })
          }}>上传</Button>
           <img src={this.state.imgPath} alt="" style={{width:50,height:50}}/>
            </Modal>
          </div>
              <Table columns={this.state.columns} dataSource={this.state.phpList} rowKey="_id" pagination={false}
              />
              <Pagination  current={page}total={totle} showQuickJumper pageSize={pageSize}
              onChange={(page,pageSize)=>{         
                this.setState({page},()=>{
                  PhpDetailsApi.phpFindByPageDetails(page,pageSize).then((data)=>{
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
export default PhpDetails;