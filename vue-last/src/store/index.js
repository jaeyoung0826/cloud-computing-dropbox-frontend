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
  },
  
  getters: {},
  mutations: {
    login_success(state,payload)
    {
      state.access=payload.access
      state.refresh=payload.refresh
    },
    
    set_userid(state,payload)
    {
      state.userid=payload.email_login
    },
    reset_token(state,payload)
    {
      state.access=payload.access
    }
   
  },
  actions: {
    //토큰 재발급
    refresh_token({commit,state})
    {
      axios.post("http://localhost:8081/users/login/refresh",{refresh:state.refresh})
      .then( res=> {commit("reset_token",res)
             console.log(res)       
     })
      .catch(err=>{alert(err)} )
    },
    //로그인 시도
   login({commit},signobj){
    {   
        commit("set_userid",signobj)
        axios.post("http://localhost:8081/users/login/", {username:signobj.email_login,password:signobj.password_login})
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