import React from 'react';
import {message} from 'antd';
import ObjectUtils from './../../utils/ObjectUtils';
import addService from "../../services/option/addService";

export default {
  namespace:'option/add',
  state:{
    data:[],
  },
  effects: {

    * queryAddAllList({payload},{call,put,select}){
        const data=yield call(addService.getAddData);
        yield put({
          type:'updateState',
          payload:{
            data:data.message
          }
        })
    },

    * queryAddData({payload}, {call, put, select}) {

      const data = yield call(addService.getAddDataByAid,payload);
      yield put({
        type:'updateState',
        payload:{
          data:Array.isArray(data.data.message)?data.data.message:[],
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
