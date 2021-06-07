import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => 
    {
      if(store.state.access!=null)
      {
        next()

      }
      else{
        alert("비정상적인 접근입니다!")
        router.go(-1)
      }
      
    }
  },
  {
    path: '/Share',
    name: 'Share',
    component: () => import(/* webpackChunkName: "about" */ '../views/Share.vue'),
    beforeEnter: (to, from, next) => 
    {
      if(store.state.access!=null)
      {
        next()
      }
      else{
        alert("비정상적인 접근입니다!")
        router.go(-1)
      }
      
    }
  }
  ,
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '../views/main_view.vue'),
    beforeEnter: (to, from, next) => 
    {
      if(store.state.access!=null)
      {
        next()
      }
      else{
        alert("비정상적인 접근입니다!")
        router.go(-1)
      }
      
  }
  }
  
  ,
  {
    path: '/Star',
    name: 'Star',
    component: () => import(/* webpackChunkName: "about" */ '../views/Star.vue'),
    beforeEnter: (to, from, next) => 
    {
      if(store.state.access!=null)
      {
        next()
      }
      else{
        alert("비정상적인 접근입니다!")
        router.go(-1)
      }
      
  }
  }

  ,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Recent.vue'),
    beforeEnter: (to, from, next) => 
    {
      if(store.state.access!=null)
      {
        next()
      }
      else{
      alert("비정상적인 접근입니다!")
      router.go(-1)
      }
      
     },
  
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue'),
    beforeEnter: (to, from, next) => 
    {
      if(store.state.access!=null)
      {
        next()
      }
      else{
      alert("비정상적인 접근입니다!")
      router.go(-1)
      }
      
     },
  
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
