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

      <v-toolbar-title>Application</v-toolbar-title>
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
      <v-btn elevation="2" fab x-large></v-btn> <!--파일 업로드 버튼-->
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
import Upload from './views/Page.vue'
  export default {
    components:
    {
      'Upload':Upload
      
    }
    ,
    data: () => ({ 
    drawer: null,
    items: [
          { title: 'image', icon: 'mdi-clock-time-four ', to:'/main'},
          { title: '중요문서함', icon: 'mdi-star',to:'/Star'},
          { title: '최근문서함', icon: 'mdi-help-box',to:'/about' },
          { title: '문서함', icon: 'mdi-help-box',to:'/test' },
          
        ],
        }),
  }
</script>
