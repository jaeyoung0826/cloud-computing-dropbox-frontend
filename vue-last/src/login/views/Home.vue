<template>
  <v-app id="inspire">
    <v-content>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >Sign in to KHU-BOX</h1>
                          
                        <v-form >
                          <v-text-field
                            label="userid"
                            name="userid"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            v-model="email_login"
                          />

                          <v-text-field
                            id="password_1"
                            label="Password_1"
                            name="password_1"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                            v-model="password_login" 
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Forgot your password ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="teal accent-3" 
                               dark v-on:click="login({email_login,password_login})"
                          >     
                          SIGN IN</v-btn>
                      </div>
                      
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">아이디가 없다면?</h1>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-8">
                        <h1 class="text-center display-1">Welcome!</h1>
          
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3 heightset "  >Create Account</h1>
                        <v-form>
                          <v-row>
                          <div style="width:10px">
                          </div>
                          <div style="width:200px">
                          <v-text-field
                            label="first_Name"
                            name="first_Name"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                            single-line
                            outlined
                            v-model="first_name"
                          />
                          </div>
                          <div style="width:100px">
                          </div>
                          <div style="width:200px">
                          <v-text-field
                            label="last_Name"
                            name="last_Name"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                            single-line
                            outlined  
                            v-model="last_name"
                          />
                          </div>
                          </v-row>
                          
                          <div style="width:500px">
                          <v-text-field
                            label="Id"
                            name="ID"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                            v-model="username"
                            single-line
                            outlined  
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            single-line
                            outlined  
                            v-model="email"
                          />
                          </div>
                          
                          <v-row>
                          <div style="width:10px">
                          </div>
                          <div style="width:200px">
                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="mdi-plus"
                            type="password"
                            color="teal accent-3"
                            single-line
                            outlined  
                            v-model="password"
                          />
                          </div>

                          <div style="width:100px"></div>

                          <div style="width:200px">
                          <v-text-field
                            id="check-password"
                            label="check-Password"
                            name="check-password"
                            prepend-icon="mdi-check"
                            type="password"
                            color="teal accent-3"
                            single-line
                            outlined
                            v-model="check_password"                            
                          />
                          </div>
                          </v-row>
                        
                        </v-form>
                      </v-card-text>
                      <v-alert v-if="signok"
                        :value="iserror"
                        type="success"
                      >
                      가입이 완료 되었습니다!
                      </v-alert>
                      <v-alert v-if="signfalse"
                        :value="iserror"
                        type="success"
                      >
                      가입이 실패 되었습니다!
                      </v-alert>
                      
                      <div style="height:100px"></div>
                      <div class="text-center mt-n5 heightset">
                        <v-btn 
                          rounded color="teal accent-3"
                          depressed 
                          dark v-on:click="postdata">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios"
import {mapState,mapActions} from "vuex"
export default {
  data: () => ({
    step: 1,
    state:mapState.can_access,
    
    login_form:{
      email:'',
      password:''
    },
    iserror:false,
    signok:false,
    signfalse:false
  }),
  props: {
    source: String
  },
   
    methods:{
      postdata(){
        console.log( this.form),
        this.cleartxt(),
        this.iserror=true,
        axios.post('http://localhost:8081/users/', {
        username: this.username,
        email: this.email,
        password:this.password,
        check_password:this.check_password,
        first_name:this.first_name,
        last_name:this.last_name
        }).then(function (response) {
          console.log(response);
          alert("가입 완료")
        })
        .catch(function (error) {
          console.log(error);
          alert("가입 실패")
         });
        },
      cleartxt(){this.form='', this.password_login=''},
      ...mapActions(["login"]),
      // test(signobj)
      // {
      //   axios.post('https://reqres.in/api/register', signobj)
      //    .then( res=> {
      //       console.log(res)
      //    })
      //     .catch(err=> {
      //       console.log(err);
      //      });
      // }
      

    }
};
</script>

<style> 
.heightset {height: 100px; }
.widthset {width: 150px;}
</style>

