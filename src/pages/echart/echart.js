import React, { Component } from 'react';
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import api from '../../api/howApi'
class Echarts extends Component {
    state={
        yAxis:[],
        xAis:[],
        option:{
            legend: {
                data: ['满意度']
            },
            tooltip: {
                trigger: 'axis',
                // axisPointer: {
                //     type: 'shadow'
                // }
            },
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name:'满意度',
                data: [0, 0, 0, 0, 0, 0, 0],
                // data: [120, 200, 150, 80, 70, 110, 130],
                type: 'line'
            }]
        }
    }
  componentDidMount(){
    let {xAis,yAxis} = this.state
    api.Analyze()
    .then((res)=>{
       res.data.forEach((item,index)=>{
          xAis.push(item.phpName)
          yAxis.push(item.phpSatisfaction)
       })
       // console.log(xAis)
        this.setState({option:{
            xAxis: {
                type: 'category',
                data: xAis,
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                data: yAxis,
                type: 'bar',
                itemStyle: {
                    normal: {
                       color:'lightgreen'
                    }
                },
            }]
        }})
    })
   
  }
  render() { 
      let {option} = this.state
    return ( 
      <div>
       <Card  title="折线图" >
        <ReactEcharts option={option} style={{background:'light-blue'}}></ReactEcharts>
       </Card>
      </div>
     );
  }
}
 
export default Echarts;