// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import axios from 'axios'
import echarts from 'echarts'

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
	const api =require('./api/api.js')
	api.CheckLogin().then((res) => {
		let username = res.data.data.account;
		sessionStorage.setItem('username', JSON.stringify(res.data.data.account));
		sessionStorage.setItem('group_id', JSON.stringify(res.data.data.group_id));
		sessionStorage.setItem('current_parent_id', JSON.stringify(res.data.data.parent_id));		
			if(!username){
	        //如果没有登录状态则跳转到登录页
	        window.location.href = '/login.html'
	       }		
        
	});
	 
new Vue({
	el: '#app',
	router,
	axios,
	template: '<App/>',
	components: { App }
})

