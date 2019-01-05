import request from './../../utils/HttpInvoker';
import axios from 'axios';
import { stringify } from 'qs';

async function getAddData(params) {
  return request(`/api/getAlltdn?t=${(new Date()).getTime().toString()}`, {
    method: 'GET',
  });
}

async function getAddDataByAid(params){
  return axios({
    method:'POST',
    url:'/api/getTodayNewlist',
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
  getAddData,
  getAddDataByAid
};
