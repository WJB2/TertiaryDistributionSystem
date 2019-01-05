
import React, { PureComponent } from 'react';
import {Card,Divider } from 'antd';
import {connect} from "dva/index";

import AddBusinessTable from './AddBusinessTable';
import smoothEchart from "./../../echarts/smoothEcharts";
var echarts = require('echarts');
@connect(models => ({
  addModel: models['option/add'],
  global: models['global'],
}))

class AddBusinessIndex extends PureComponent {

  constructor(props) {
    super(props)
    let id = ( '_' + Math.random()).replace('.','_');
    this.state = {
      pieId : 'pie' + id,	//定义初始化随机id
    }
  }

  componentWillMount(){
    const { dispatch }=this.props;

    if(localStorage.getItem('CurrentUser')==="张孝杰"){
      dispatch({
        type:'option/add/queryAddAllList',
        payload:{}
      })
    }else{
      dispatch({
        type:'option/add/queryAddData',
        payload:{
          bigaid:localStorage.getItem("bigAid")
        }
      })
    }
  }

  initPie(id) {
    console.log('你怎么回事')
    //获取Chart的真实DOM,虽然react不推荐操作真实DOM,但是Echart对图表的渲染就是基于真实DOM的
    let myChart = echarts.getInstanceByDom(document.getElementById(id));
    if( myChart === undefined){
      myChart = echarts.init(document.getElementById(id));
    }
    console.log(myChart);
    console.log(smoothEchart);
    myChart.setOption(smoothEchart);
  }



  componentDidMount() { //在初始化渲染执行之后立即调用
    // this.initPie(this.state.pieId);

  }

  render() {
    const {addModel, global,dispatch} = this.props;

    const {data}=addModel;

    console.log(data);

    return (
      <div style={{marginTop:'20px'}}>

        <Card
          title={"查看数据"}
          style={{marginBottom:"50px"}}
        >
          <div>今日新增:{Array.isArray(data)?data.length:0}</div>
          <Divider style={{color:'skyblue'}} />
          {/* <div style={{fontWeight:'800',fontSize:'50'}}>商户七天注册数</div>
          <div id={this.state.pieId} style={{width:"400px",height:"300px"}}> */}

          {/* </div> */}

        </Card>

        <Card
          title={"今日新增门店列表"}

        >

          <AddBusinessTable   dataSource={data} />

        </Card>


        {/*{formVisible && <CherkCardUseRecordForm  />}*/}

      </div>
    );
  }
}

export default AddBusinessIndex;
