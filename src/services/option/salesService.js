import request from './../../utils/HttpInvoker';
import { stringify } from 'qs';
import axios from 'axios';

async function getSalesData(params) {
  return request(`/api/getAllUser?t=${(new Date()).getTime().toString()}`, {
    method: 'GET',
  });
}

async function addInformation(params){
  return axios({
    method:'POST',
    url:'/api/setInformation',
    data:{
      ...params
    },
    header:{
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }
    
  })
}

async function getSalesDataByAid(params){
  return axios({
    method:'POST',
    url:'/api/getSelemanlist',
    data:{
      ...params
    },
    header:{
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }
    
  })
}


async function addProfit(params){
  return axios({
    method:'POST',
    url:'/api/setpoint',
    data:{
      ...params
    },
    header:{
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
}

async function findMessageByAid(params){
  console.log(params);
  return axios({
    method:'POST',
    url:'/api/getaidSeleman',
    data:{
      ...params,
    },
    header:{
      Accept:'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
}

export default {
  getSalesData,
  addInformation,
  addProfit,
  findMessageByAid,
  getSalesDataByAid
};
 