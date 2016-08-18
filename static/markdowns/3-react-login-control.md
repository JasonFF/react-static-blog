# React login control

- 表单数据获取：


    export function getFormValue(form){
      let formvalue = {};
      for (var i = 0; i < form.length; i++) {
        if (form[i].name) {
          formvalue[`${form[i].name}`] = form[i].value
        }
      }
      return formvalue
    }


- 请求action，及reducer。


    import {fetchPost} from 'widgets';

    const LOGIN = "LOGIN";
    const LOGINING = "LOGINING";

    const initialState = {
      loading: false
    }

    export default function reducer(state = initialState, action = {} ) {
      switch (action.type) {
        case LOGINING:
          return {loading:true};
        case LOGIN:
          return Object.assign({},action.data,{loading:false});
        default:
          return state;
      }
    }
    function resLogin(json) {
      window.localStorage['jftoken'] = json.token;
      return {
        type: LOGIN,
        data: json
      }
    }
    function resLogining() {
      return {
        type: LOGINING
      }
    }
    export function reqLogin(para) {
      return dispatch => {
        dispatch(resLogining())
        fetchPost('login', para).then(res=>res.json()).then(json=>dispatch(resLogin(json)))
      }
    }

- 判断登录失效，store中间件


    export default function(store) {
      return next => action => {
        let actionString = JSON.stringify(action)
        if (/("status":123)/gi.test(actionString)) {
          next({
            type: 'CHECKLOGIN',
            data: {
              status: 23333,
              href: window.location.href
            }
          })
        }else{
          next(action)
        }
      }
    }
