import React, { PureComponent } from 'react';
import {Card} from 'antd';
import pieChart from '../../utils/EchartsUtils';
import CherkCardUseRecordTable from "./CherkCardUseRecordTable";
import {connect} from "dva/index";
var echarts = require('echarts');

@connect(models => ({
  cherkModel: models['option/cherkCardUseRecord'],
  global: models['global']
}))
class CherkCardUseRecordIndex extends PureComponent {

  constructor(props) {
    super(props)
    let id = ( '_' + Math.random()).replace('.','_');
    this.state = {
      pieId : 'pie' + id,	//定义初始化随机id
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
    console.log(pieChart);
    myChart.setOption(pieChart);
  }

  componentWillMount(){
    const {dispatch}=this.props;
    if(localStorage.getItem('CurrentUser')==="张孝杰"){
      dispatch({
        type:'option/cherkCardUseRecord/queryCherkAllList',
        payload:{}
      })
    }else{
      dispatch({
        type:'option/cherkCardUseRecord/queryCherkData',
        payload:{
          bigaid:localStorage.getItem("bigAid"),
        }
      })
    }
  }


  componentDidMount() { //在初始化渲染执行之后立即调用
    // this.initPie(this.state.pieId);
    const { dispatch }=this.props;
    console.log(dispatch);

  }

  render() {
    const {cherkModel, global,dispatch} = this.props;

    const {
      data
    } = cherkModel;
    console.log(cherkModel)
    console.log(data)

    return (
      <div style={{marginTop:'20px'}}>
        <div style={{display:'flex'}}>
        <Card
          title={"业务员操作"}
          style={{minHeight:'800px',marginRight:'10%',marginLeft:'10%',width:'80%'}}
        >

          <CherkCardUseRecordTable  dataSource={data}/>

        </Card>
        {/* <Card
          title={"二维码使用占比"}
          style={{flexBasis:'30%',minHeight:'800px'}}
        >
          <div id={this.state.pieId} style={{width:"500px",height:"500px"}}>

          </div>
        </Card> */}
        </div>



      </div>
    );
  }
}

export default CherkCardUseRecordIndex;
