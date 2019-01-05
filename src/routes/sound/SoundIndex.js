
import React, { PureComponent } from 'react';
import {Card} from 'antd';
import {connect} from "dva/index";


import SoundTable from './SoundTable';

@connect(models => ({
  soundModel: models['option/sound'],
  global: models['global'],
}))

class CherkCardUseRecordIndex extends PureComponent {

  constructor(props) {
    super(props)

  }



  componentWillMount() { //在初始化渲染执行之后立即调用
    const { dispatch }=this.props;
    if(localStorage.getItem('CurrentUser')==="张孝杰"){
      dispatch({
        type:'option/sound/querySoundAllList',
        payload:{
        }
      })
    }else{
      dispatch({
        type:'option/sound/querySoundData',
        payload:{
          bigaid:localStorage.getItem("bigAid")
        }
      })
    }
  }

  render() {
    const {soundModel, global,dispatch} = this.props;

    const {data}=soundModel;

    console.log(data)

    return (
      <div style={{marginTop:'20px'}}>

        <Card
          title={"收银音响激活统计"}
          style={{ minHeight:'800px'}}
        >

          <SoundTable  dataSource={data}  />

        </Card>



        {/*{formVisible && <CherkCardUseRecordForm  />}*/}

      </div>
    );
  }
}

export default CherkCardUseRecordIndex;
