import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from '../store'
import http from 'axios'
import '../api/mock.js'

Vue.use(ElementUI);
Vue.use(router);

Vue.prototype.$http = http
Vue.config.productionTip = false

router.beforeEach((to,from,next) =>{
  store.commit('getToken')
  const token =store.state.user.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if (token && to.name==='login'){
    next({name : 'home'})
  }
  else{
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    this.$store.commit('addMenu',this.$router)
  }
}).$mount('#app')
