import { routerRedux } from 'dva/router';

import authenticationService from './../../services/user/AuthenticationService';

import { notification } from 'antd';

export default {
  namespace: 'user/authentication',

  state: {
    status: null,
    errorText: null,
    user: null,
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        console.info("authenticationService.login",authenticationService.login)//这个打印一下
        const user = yield call(authenticationService.login, payload);//登录

        if(!Array.isArray(user.data.message)){
          throw new Error('您输入的账号密码有误');
        }

        localStorage.setItem('AUTHENTICATED', true);
        localStorage.setItem('CurrentUser',user.data.message[0].name);
        localStorage.setItem('bigAid',user.data.message[0].aid);

        yield put({
          type: 'updateSessionStatus',
          payload: {
            status: true,
            errorText: null,
            user,
          },
        });

        yield put(routerRedux.push('/'));

      } catch (e) {
         console.log(e);
         notification.error({
          message:"错误",
          description:e.message,
          top:20,
         })
      }
    },
  },

  reducers: {
    updateSessionStatus(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
