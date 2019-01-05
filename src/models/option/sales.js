import React from 'react';
import {message} from 'antd';


import ObjectUtils from './../../utils/ObjectUtils';
import salesService from "../../services/option/salesService";

export default {
  namespace:'option/sales',
  state:{
    data:[],
    informationFormVisible:false,
    informationFormType:undefined,
    currentAddAid:null,//新建时候的aid
    profitFormVisible:false,
    profitFormType:undefined,
    currentInformation:null,//当前信息
  },
  effects: {
    *addSales({ payload }, { call, put,select }) {

      const currentAddAid=yield select(state => state['option/sales'].currentAddAid);

      console.log(currentAddAid);

      payload.aid=currentAddAid;

      yield call(salesService.addInformation,payload);

      yield put({
        type: 'updateState',
        payload: {
          informationFormType: undefined,
          informationFormVisible: false,
          currentAddAid: null,
          currentInformation:null,
        },
      });

      yield put({
        type:'querySalesAllList',
        payload:{}
      })

      message.success("分配上级和密码设置成功");

    },

    *addProfit({ payload }, { call, put,select }) {

      const currentAddAid=yield select(state => state['option/sales'].currentAddAid);

      console.log(currentAddAid)

      payload.bigaid=currentAddAid;

      yield call(salesService.addProfit,payload);

      yield put({
        type: 'updateState',
        payload: {
          profitFormType: undefined,
          profitFormVisible: false,
          currentAddAid: null,
        },
      });

      yield put({
        type:'querySalesAllList',
        payload:{}
      })

      message.success("分润点设置成功");

      // window.location.reload(true);
    },

    *editInformation({payload},{call,put,select}){
      const information=yield call(salesService.findMessageByAid,payload);
      yield put({
        type:'updateState',
        payload:{
          informationFormType:'EDIT',
          informationFormVisible:true,
          currentInformation:information.data.message[0],
          currentAddAid:payload.aid
        }
      })
    },

    *editProfit({payload},{call,put,select}){
      const information=yield call(salesService.findMessageByAid,payload);
      yield put({
        type:'updateState',
        payload:{
          profitFormType:'EDIT',
          profitFormVisible:true,
          currentInformation:information.data.message[0],
          currentAddAid:payload.aid
        }
      })
    },

    *searchSalesData({payload},{call,put,select}){
      const data = yield call(salesService.findMessageByAid,payload);
      yield put({
        type:'updateState',
        payload:{
          data:Array.isArray(data.data.message)?data.data.message:[],
        }
      })
    },

    * querySalesData({payload}, {call, put, select}) {

      const data = yield call(salesService.getSalesDataByAid,payload);
      yield put({
        type:'updateState',
        payload:{
          data:Array.isArray(data.data.message)?data.data.message:[],
        }
      })
    },

    * querySalesAllList({payload},{call,put,select}){
      const data=yield call(salesService.getSalesData);
      yield put({
        type:'updateState',
        payload:{
          data:data.message,
        }
      })
    },

  },

  reducers:{
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    mergeState(state, { payload }) {
      return ObjectUtils.mergeDeep(state, payload);
    },
  }
}
