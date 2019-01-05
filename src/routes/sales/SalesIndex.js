
import React, { PureComponent } from 'react';
import {Card,Input} from 'antd';
import {connect} from "dva/index";

import SalesTable from './SalesTable';
import SalesForm from './SalesForm';
import ProfitForm from './ProfitForm';

const Search=Input.Search;

@connect(models => ({
  salesModel: models['option/sales'],
  global: models['global'],
}))

class SalesIndex extends PureComponent {

  constructor(props) {
    super(props)

  }

  handleInformationAdd(aid) {//新建表单
    console.log(aid);
    const { dispatch } = this.props;

    dispatch({
      type: 'option/sales/updateState',
      payload: {
        informationFormVisible: true,
        informationFormType: 'ADD',
        currentAddAid:aid,
      },
    });
  }

  handleInformationEdit(aid){//编辑表单
    const {dispatch}=this.props;
    dispatch({
      type:'option/sales/editInformation',
      payload:{
        aid:aid,
      }
    })
  }

  hanleProfitEdit(aid){
    const {dispatch}=this.props;
    dispatch({
      type:'option/sales/editProfit',
      payload:{
        aid:aid,
      }
    })
  }

  handleProfitAdd(aid) {//新建表单
    console.log(aid);
    const { dispatch } = this.props;

    dispatch({
      type: 'option/sales/updateState',
      payload: {
        profitFormVisible: true,
        profitFormType: 'ADD',
        currentAddAid:aid,
      },
    });
  }

  componentWillMount() { //在初始化渲染执行之后立即调用
    const { dispatch }=this.props;
    if(localStorage.getItem('CurrentUser')==="张孝杰"){
      dispatch({
        type:'option/sales/querySalesAllList',
        payload:{
          bigaid:localStorage.getItem("bigAid")
        }
      })
    }else{
      dispatch({
        type:'option/sales/querySalesData',
        payload:{
          bigaid:localStorage.getItem("bigAid")
        }
      })
    }
  }

  handleSubmitInformationForm(values){
    console.log(values)
    const {dispatch}=this.props;
    dispatch({
      type:'option/sales/addSales',
      payload:{
        ...values
      }
    })
  }

  handleSubmitProfit(values){
    const {dispatch}=this.props;
    dispatch({
      type:'option/sales/addProfit',
      payload:{
        ...values
      }
    })
  }

  handleCancelInformationForm(){
    console.log("信息取消")
    const {dispatch}=this.props;
    dispatch({
      type:'option/sales/updateState',
      payload:{
        informationFormType:undefined,
        informationFormVisible:false,
        currentAddAid:null
      }
    })
  }

  handleCancelProfitForm(){
    const {dispatch}=this.props;
    dispatch({
      type:'option/sales/updateState',
      payload:{
        profitFormType:undefined,
        profitFormVisible:false,
        currentAddAid:null
      }
    })
  }

  handleSearch(values){
    console.log(values)
    const {dispatch}=this.props;
    dispatch({
      type:'option/sales/searchSalesData',
      payload:{
        aid:values
      }
    })
  }

  render() {
    const {salesModel} = this.props;

    const {
      data,informationFormVisible,informationFormType,profitFormVisible,
      profitFormType,currentInformation
    }=salesModel;

    console.log(data);

    return (
      <div style={{marginTop:'20px'}}>

          <Card
            title={"业务员列表"}
            style={{ minHeight:'800px',position:'relative'}}
          >
          <div style={{position:'absolute',right:50,width:'300px',marginBottom:'20px',marginRight:'40px'}}>
            <Search
              placeholder="请输入姓名"
              enterButton="搜索"
              size="large"
              onSearch={value => this.handleSearch(value)}
            />
          </div>

            <div style={{marginTop:'70px'}}>
            <SalesTable
              dataSource={data}
              onAdd={(aid)=>this.handleInformationAdd(aid)}
              onEdit={(aid)=>this.handleInformationEdit(aid)}
              onAddProfit={(aid)=>this.handleProfitAdd(aid)}
              onEditProfit={(aid)=>this.hanleProfitEdit(aid)}
            />
            </div>

          </Card>

        {informationFormVisible &&
        <SalesForm
          global={global}
          informationFormType={informationFormType}
          onSubmit={this.handleSubmitInformationForm.bind(this)}
          onCancel={this.handleCancelInformationForm.bind(this)}
          currentInformation={currentInformation}
        />}

        {
          profitFormVisible &&
          <ProfitForm
            global={global}
            profitFormType={profitFormType}
            onSubmit={this.handleSubmitProfit.bind(this)}
            onCancel={this.handleCancelProfitForm.bind(this)}
            currentInformation={currentInformation}
          />
        }

      </div>
    );
  }
}

export default SalesIndex;
