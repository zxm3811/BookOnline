import Vue from 'vue'
import VueRouter  from 'vue-router'

import Login from 'src/page/account/login/login.vue'
import Register from 'src/page/account/register/register.vue'
import Page from 'src/page/home/page.vue'
import Home from 'src/page/home/home.vue'

Vue.use(VueRouter )

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
			path: '/',
			redirect:'/page' //重定向
		},
		{
      path:'/login',//登陆
      name: 'login',
			component: Login
    },
    {
      path:'/register',//登陆
      name: 'register',
			component: Register
		},
    {
      path: '/page',
      name: 'page',
      component: Page,
      redirect:'/page/home',
			children:[
        {
          path:'home',//登陆
          name: 'home',
          component: Home
        },
      ]
    }
  ]
})
