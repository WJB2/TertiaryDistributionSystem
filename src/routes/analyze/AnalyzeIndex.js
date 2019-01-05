
import React, { PureComponent } from 'react';
import {Card,Divider,Input,DatePicker ,InputNumber ,Select} from 'antd';

import {connect} from "dva/index";
import AnalyzeTable from './AnalyzeTable';
import moment from 'moment';
const { MonthPicker } = DatePicker;
const Option=Select.Option;

@connect(models => ({
  analyzeModel: models['option/analyze'],
  global: models['global'],
}))

class AnalyzeIndex extends PureComponent {

  constructor(props) {
    super(props)
  }

  componentWillMount(){
    const { dispatch }=this.props;
    if(localStorage.getItem('CurrentUser')==="张孝杰"){
      console.log("aaaa")
      dispatch({
        type:'option/analyze/queryAnalyzeData',
        payload:{
        }
      })
    }else{
      dispatch({
         type:'option/analyze/queryNormalData',
         payload:{
           bigaid:localStorage.getItem("bigAid")
         }
      })
    }

  }

  handleChange(e){
    console.log(e.toDate().getMonth()+1);
    const { dispatch }=this.props;
    dispatch({
      type:'option/analyze/queryMonthData',
      payload:{
        bigaid:localStorage.getItem("bigAid"),
        month:e.toDate().getMonth()+1,
      }
    })
  }

  handleSelect=(e)=>{
    console.log(e);
    const { dispatch }=this.props;
    dispatch({
      type:'option/analyze/queryMonthData',
      payload:{
        bigaid:localStorage.getItem("bigAid"),
        month:e,
      }
    })
  }


  render() {
    const {analyzeModel, global,dispatch} = this.props;

    const {data,allmoney,point}=analyzeModel;

    const profit=allmoney*point;

    console.log(data)

    data.forEach((item,index)=>{
      Object.keys(item).map((key)=>{if(key===" Proportion"){item.Proportion=item[key]}})
    })

    console.log(data)

    return (
      <div style={{marginTop:'20px'}}>

        <Card
          title={"客源分析"}
        >

          <div style={{height:'100px'}}>
              <div style={{display:'inline-block',width:'22vw'}}>本月交易:<InputNumber disabled  value={allmoney?allmoney:0} /></div>
              <div style={{display:'inline-block',width:'22vw'}}>分润:<InputNumber disabled   value={profit?profit:0}/></div>
              <div style={{display:'inline-block',width:'22vw'}}>
              请选择月份:
              <Select defaultValue="" style={{ width: 120 }} onChange={this.handleSelect}>
                <Option value="1">一月</Option>
                <Option value="2">二月</Option>
                <Option value="3">三月</Option>
                <Option value="4">四月</Option>
                <Option value="5">五月</Option>
                <Option value="6">六月</Option>
                <Option value="7">七月</Option>
                <Option value="8">八月</Option>
                <Option value="9">九月</Option>
                <Option value="10">十月</Option>
                <Option value="11">十一月</Option>
                <Option value="12">十二月</Option>
              </Select>
              </div>
          </div>

          <AnalyzeTable   dataSource={data} />

        </Card>

      </div>
    );
  }
}

export default AnalyzeIndex;
