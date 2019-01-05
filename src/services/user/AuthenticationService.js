import request from './../../utils/HttpInvoker';
import axios from 'axios';

async function login(params) {
  console.info("params1111111111111111111111",params)
  // return request('/api/login', {
  //   method: 'POST',
  //   body: {
  //     ...params,
  //   }
  // });
  return axios({
    method:'POST',
    url:'/api/login',
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
  login,
};
