import React from 'react';


import ObjectUtils from './../../utils/ObjectUtils';
import soundService from "../../services/option/soundService";


export default {
  namespace:'option/sound',
  state:{
    data:[],
  },
  effects: {

    * querySoundAllList({payload},{call,put,select}){
        const data=yield call(soundService.getSoundData);
        console.log(data)
        yield put({
          type:'updateState',
          payload:{
            data:data.message,
          }
       })
    },  
    * querySoundData({payload}, {call, put, select}) {
      console.log('你怎么回事')
      const data = yield call(soundService.getSoundByAid,payload);
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
