import request from './../../utils/HttpInvoker';
import { stringify } from 'qs';
import axios from 'axios';
async function getCherkData(params) {
  
  return request(`/api/getAlltk?t=${(new Date()).getTime().toString()}`, {
    method: 'GET',
  });
}

async function getCherkDataByAid(params){
  return axios({
    method:'POST',
    url:'/api/getTKlist',
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
  getCherkData,
  getCherkDataByAid,
};
