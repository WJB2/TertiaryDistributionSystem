import { routerRedux } from 'dva/router';
import ObjectUtils from './../utils/ObjectUtils';
import { DEFAULT_HOME_PATH } from './../utils/GlobalConst';
import authenticationService from './../services/user/AuthenticationService';
import { notification } from 'antd';

export default {
  namespace: 'global',

  state: {
    routerData: [],
    initialized: false, // 是否初始化完成
    authenticated: true, // 是否授权
    loginErrorText: null, //
    currentUser: null, // 当前用户
    currentActivePath: DEFAULT_HOME_PATH, // 当前活跃Pat
  },

  effects: {
    * initialize({payload}, {call, put, select}) {
      try {

        yield put({
          type: 'updateState',
          payload: {
            initialized: true,
            authenticated: true,
          },
        });
        const {authenticated} = yield select(state => {
          return state.global;
        });
        console.log(authenticated);


      } catch (ex) {
        console.log("出现错误");
        const {initialized} = yield select(state => {
          return state.global;
        });

        if (ex.httpStatus === 401) {
          if (initialized) {
            yield put({
              type: 'updateState',
              payload: {
                authenticated: false,
              },
            });
          } else {
            sessionStorage.clear();
            yield put(routerRedux.push('/user/login'));
          }
        }
      }
    },

    * login({payload}, {select, call, put}) {
      try {

        console.log("global 登录")
        const user = yield call(authenticationService.login, payload);

        if(Array.isArray(user.data.message) && user.data.message.length===0){
          throw new Error('您输入的账号密码有误');
        }

        localStorage.setItem('AUTHENTICATED', true);
        localStorage.setItem('CurrentUser',user.data.message[0].name);
        console.log(user.data.message[0].aid)
        localStorage.setItem('bigAid',user.data.message[0].aid);

        const {currentUser} = yield select(state => {
          return state.global;
        });

        yield put({
          type: 'updateState',
          payload: {
            loginErrorText: null,
            authenticated: true,
          },
        });

        yield put(routerRedux.push('/'));

      } catch (e) {
        notification.error({
          message:"错误",
          description:e.message,
          top:20,
        })
      }
    },

    *forwardDestroy({ payload }, { select, put }){//不需要保存的路由跳转

      const {currentActivePath}=yield select((state)=>{//current:home
        return state['global']
      })

      const {path}={...payload};

      if(currentActivePath===path){
        return;
      }
      if (path) {
        yield put({
          type:'removeComponent',
          payload:{
            path,
          }
        })
      }
    },

    *removeComponent({ payload }, { select, put }){

      const {currentActivePath} = yield select((state)=>{
        return state['global'];
      });
      console.log('e');

      if (payload.path !== currentActivePath) {
        yield put(routerRedux.push(payload.path));

        yield put({
          type: 'updateState',
          payload: {

          },
        });
      }
    },


  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },

    mergeState(state, { payload }) {
      return ObjectUtils.mergeDeep(state, payload);
    },
  },

  subscriptions: {

  },
};
