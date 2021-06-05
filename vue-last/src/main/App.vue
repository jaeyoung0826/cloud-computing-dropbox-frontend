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
      <v-btn elevation="2" fab x-large padding:30px></v-btn> <!--유저 모습-->
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
    </v-navigation-drawer>

    <v-main>
     <router-view></router-view>
     <Upload></Upload>
    </v-main>
  </v-app>
</template>

<script>
import store from '../store'
import Upload from './views/Page.vue'
  export default {
    components:
    {
      'Upload':Upload
      
    }
    ,
    methods:
    {
      
    }
    ,
    data: () => ({ 
    drawer: null,
    items: [
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