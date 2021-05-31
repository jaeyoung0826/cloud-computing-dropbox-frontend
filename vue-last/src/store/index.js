import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import createPersistedState from 'vuex-persistedstate'
//import router from "../main/router"
//import router from "../router"

Vue.use(Vuex)


const store= new Vuex.Store({

  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    access: null,
    userid:null,
    refresh:null,
    can_access:false,
  },
  
  getters: {},
  mutations: {
    login_success(state,payload)
    {
      state.access=payload.access
      state.refresh=payload.refresh
    },
    check_access(state)
    {
      console.log(state.access)
    }
  },
  actions: {
    //로그인 시도
    check({commit})
    {
      commit("check_access")
    }
    ,
   login({commit},signobj){
    {   
        console.log(signobj)
        axios.post('users/login/', {username:signobj.email_login,password:signobj.password_login})
         .then( res=> {
           let login_info=
           {
             access:res.data.access,
             refresh:res.data.refresh
           }
           //성공시 토큰을 얻음
           //토큰을 헤더에 포함시켜 유저 정보 요청
          commit("login_success",login_info)
          window.location.href=('http://localhost:8080/main#/')


          console.log(login_info)
          // axios.post('',login_info)
          // .then(response=>
          //   {
                //검증 결과를 통해 can_access 값 변경
                // router push
          // })
          // .catch(error=>{})
          
         })
          .catch(err=> {
            console.log(err);
            alert('비밀번호와 아이디를 확인해주세요:')
           });
      }
   }

  },
})
export default store