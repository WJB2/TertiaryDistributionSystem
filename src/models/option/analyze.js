import React from 'react';
import {message} from 'antd';


import ObjectUtils from './../../utils/ObjectUtils';
import analyzeService from "../../services/option/analyzeService";

export default {
  namespace:'option/analyze',
  state:{
    data:[],
    allmoney:null,
    point:null,
  },
  effects: {

    * queryNormalData({payload},{call,put,select}){
        const data=yield call(analyzeService.getAnalyzeDataByNormal,payload);
        let a=Array.isArray(data.message)?data.message:[];
        console.log(a);
        yield put({
          type:'updateState',
          payload:{
            data:a,
          }
        })
        if(!a===[]){
          console.log("a")
          let b=data.allmoney[0]['SUM(AllMoney)']?data.allmoney[0]['SUM(AllMoney)']:0;
          let c=data.point[0].profitpoint?data.point[0].profitpoint:0;
          yield put({
            type:'updateState',
            payload:{
              allmoney:b,
              point:c
            }
          })
        }
    },

    * queryMonthData({payload},{call,put,select}){
      const data=yield call(analyzeService.getAnalyzeDataByMonth,payload);
      console.log(data);
      yield put({
        type:'updateState',
        payload:{
          data:data.message,
          allmoney:data.allmoney[0]['SUM(AllMoney)'],
          point:data.point[0].profitpoint,
        }
      })

    },

    * queryAnalyzeData({payload}, {call, put, select}) {

      const data = yield call(analyzeService.getAnalyzeData);
      yield put({
        type:'updateState',
        payload:{
          data:data.message,
        }
      })
    }

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
