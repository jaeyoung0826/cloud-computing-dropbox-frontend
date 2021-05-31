import Vue from 'vue'
import VueRouter from 'vue-router'
import index1 from '../main/router'
import index2 from '../login/router'
Vue.use(VueRouter)



export default new VueRouter({
  routes:[
    index1,
    index2
  ]
})

