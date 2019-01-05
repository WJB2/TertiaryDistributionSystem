import request from './../../utils/HttpInvoker';
import axios from 'axios';
import { stringify } from 'qs';

async function getSoundData(params) {
  return request(`/api/getAllyx?t=${(new Date()).getTime().toString()}`, {
    method: 'GET',
  });
}

async function getSoundByAid(params){
  return axios({
    method:'POST',
    url:'/api/getSYYXlist',
    data:{
      ...params
    },
    header:{
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }
    
  })
}

export default {
  getSoundData,
  getSoundByAid
};
