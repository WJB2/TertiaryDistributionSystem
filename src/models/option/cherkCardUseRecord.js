import React from 'react';
import {message} from 'antd';

import cherkService from './../../services/option/cherkService';
import ObjectUtils from './../../utils/ObjectUtils';


export default {
  namespace:'option/cherkCardUseRecord',
  state:{
    data:[],
  },
  effects: {

    * queryCherkAllList({payload},{call,put,select}){
        const data=yield call(cherkService.getCherkData);
        yield put({
          type:'updateState',
          payload:{
            data:data.message,
          }
        })
    },

    * queryCherkData({payload}, {call, put, select}) {
      console.log('你怎么回事')
      const data = yield call(cherkService.getCherkDataByAid,payload);
      console.log(data);
      yield put({
        type:'updateState',
        payload:{
          data:Array.isArray(data.data.message)?data.data.message:[],
        }
      })
    }

  }
  ,

  reducers:{
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    mergeState(state, { payload }) {
      return ObjectUtils.mergeDeep(state, payload);
    },
  }
}
