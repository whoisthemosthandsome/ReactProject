import React, { Component, Fragment } from 'react';
import { Card,Button} from 'antd';
import actionCreator from '../../store/actionCreatore'
import {bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
class TokenModal extends Component {
 
  render() {

    let {tokenModal} = this.props
    return ( 
      <Fragment>
        {!tokenModal||
        <div style={{
          position:"fixed",
          top:0,
          left:0,
          right:0,
          bottom:0,
          background:'rgba(0,0,0,.3)',
          zIndex:10,
          display:'flex',
          justifyContent: "center",
          alignItems:"center"
        }}>
         <Card  title='token无效' style={ { width:'300px',height:"300px",textAlign:'center'} }>
           当前token无效请重新登录 
           <Button onClick={()=>{
            //  console.log(this)
              localStorage.setItem('token',' ')
             this.props.changeTokenModal(false)
             this.props.history.replace('/login')
           }}>GO LOGIN </Button>
         </Card> 
        </div>
        }
      </Fragment>
     );
  }
}
 
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(withRouter(TokenModal));