// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Login from './login.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const Promise = require("bluebird");

Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#loginPage',
  components: { Login },
  template: '<Login/>'
})
