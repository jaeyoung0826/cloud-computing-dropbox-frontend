<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>KHU-BOX</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout(), do_reset_token"> Log out </v-btn>
    </v-app-bar>
     <v-navigation-drawer 
     v-model="drawer"
     app
     >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Menu
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <div class="user-profile">
      <v-btn elevation="2" fab x-large padding:30px @click="profile_dialog_on()"></v-btn> <!--유저 모습-->
      {{user_id}}
      </div>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
        <v-row justify="center">
     <!-- profile dialog -->     
    <v-dialog
      v-model="profile_dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="first name*"
                  required
                  v-model="edit_first_name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="last name*"
                  v-model="edit_last_name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="new user name*"
                  v-model="edit_username"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="edit_email"
                ></v-text-field>
              </v-col>
              
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
           <v-btn 
            color="blue"
            @click="profile_dialog=false, password_dialog=true"
          >change password</v-btn>
          <v-spacer></v-spacer>
         
          <v-btn
            color="blue darken-1"
            text
            @click="profile_dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="edit_profile({edit_username,edit_email,edit_first_name,edit_last_name})"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--password dialog -->
    <v-dialog
      v-model="password_dialog"
      persistent
      max-width="600px"
    >
    <v-card>
        <v-card-title>
          <span class="text-h5">Edit Password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Current password"
                  required
                  v-model="old_password"
                  type="password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="New password"
                  required
                  v-model="new_password"
                  type="password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Check New password"
                  required
                  v-model="check_new_password"
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
         
          <v-btn
            color="blue darken-1"
            text
            @click="password_dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="edit_password({check_new_password,new_password,old_password})"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--password dialog -->
  </v-row>
    </v-navigation-drawer>

    <v-main>
     <router-view></router-view>
     <Upload></Upload>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import Upload from './views/Page.vue'
import router from '../main/router'
import store from '../store'
import { mapActions } from 'vuex'
export default {
    components:
    {
      'Upload':Upload
      
    }
    ,
    methods:
    {
      ...mapActions["do_reset_token"],
      logout(){ router.go(-window.history.length+1)},
      profile_dialog_on(){this.profile_dialog=true},
      edit_profile(item){
        axios.put("http://api.drive.jinsu.me/users/profile/"+this.user_id,
        {    
          username: item.edit_username,
          email: item.edit_email,
          first_name: item.edit_first_name,
          last_name: item.edit_last_name
        })
        .then(res=>{this.user_id=res.data.username, this.profile_dialog=false})
        .catch(err=>{console.log(err), alert("다시 시도해주세요")})

      }
      ,
      clear_password_dialog()
      {
        this.new_password=""
        this.check_new_password=""
        this.old_password=""
      }
      ,
      edit_password(item){
        axios.put("http://api.drive.jinsu.me/users/password/"+this.user_id,
        {    
          password: item.new_password,
          password2: item.check_new_password,
          old_password: item.old_password
        })
        .then(res=>{alert("password 변경 완료"),this.clear_password_dialog(), this.password_dialog=false,console.log(res)})
        .catch(err=>{console.log(err), alert("다시 시도해주세요")})

      }
    }
    ,
    data: () => ({ 
    new_password:"",
    check_new_password:"",
    old_password:"",
    edit_username: "",
    edit_email: "",
    edit_first_name: "",
    edit_last_name: "",
    drawer: null,
    profile_dialog:false,
    password_dialog:false,
    items: [
          { title: '공유문서함',icon:'mdi-account-group',to:'/Share'},
          { title: '중요문서함', icon: 'mdi-star',to:'/Star'},
          { title: '최근문서함', icon: 'mdi-clock-time-four',to:'/about' },
          { title: '문서함', icon: 'mdi-file-document',to:'/test' },
          
        ],
     user_id: store.state.userid
        }),
   
  }
</script>
<style scoped>
user_profile.user_id 
{
  padding: 30px;
}

</style>