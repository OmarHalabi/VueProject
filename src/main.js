// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import users from './components/users'
import test from './components/test'
import login from './components/login'

import vueRouter from 'vue-router'

Vue.use(vueRouter)

const router = new vueRouter({
	mode: 'history',
	base: __dirname,
	routes: [
		{path: '/', component: users},
		{path: '/test', component: test},
		{path: '/login', component: login}

	]
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  template: `
  	<div id="app" align="center">
  		<ul>
  			<li><router-link to="/">Users</router-link></li>
  			<li><router-link to="/test">Test</router-link></li>
			<li><router-link to="/login">Login</router-link></li>
  		</ul>
  		<router-view></router-view>
  		</div>
  `
}).$mount('#app')
