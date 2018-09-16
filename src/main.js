// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue2-animate/dist/vue2-animate.min.css'


Vue.config.productionTip = false

Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:8090/api/',
  timeout: 1000
});

Vue.prototype.imgUrl = function (filename) {
  return `http://localhost:8090/api/image/${filename}`;
}

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
