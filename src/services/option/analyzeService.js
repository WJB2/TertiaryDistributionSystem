import request from './../../utils/HttpInvoker';
import { stringify } from 'qs';

async function getAnalyzeData(params) {
  return request(`/api/getAllCus?t=${(new Date()).getTime().toString()}`, {
    method: 'GET',
  });
}

async function getAnalyzeDataByMonth(params){
  return request(`/api/getCusMonth`,{
    method:'POST',
    body:{
      ...params
    }
  })
}

async function getAnalyzeDataByNormal(params){
  return request(`/api/getCuslist?t=${(new Date()).getTime().toString()}`,{
    method:'POST',
    body:{
      ...params
    }
  })
}

export default {
  getAnalyzeData,
  getAnalyzeDataByMonth,
  getAnalyzeDataByNormal
};
