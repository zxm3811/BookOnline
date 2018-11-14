import Vue from 'vue'
import VueRouter  from 'vue-router'

import Login from 'src/page/account/login/login.vue'
import Register from 'src/page/account/register/register.vue'
import Page from 'src/page/home/page.vue'
import Home from 'src/page/home/home.vue'
import SearchResult from 'src/page/home/searchResult.vue'
import UserCenter from 'src/page/home/userCenter.vue'
import UserInfo from 'src/page/home/userInfo.vue'
import OrderList from 'src/page/home/orderList.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {
			path: '/',
			redirect:'/page/home' //重定向
		},
		{
      path:'/login',//登陆
      name: 'login',
			component: Login
    },
    {
      path:'/register',//注册
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
          path:'home',//主页
          name: 'home',
          component: Home
        },
        {
          path:'search/:keyword',//搜索结果页
          name: 'searchResult',
          component: SearchResult
        },
        {
          path: 'userCenter',//个人中心
          name: 'userCenter',
          component: UserCenter,
          redirect: '/page/userCenter/userInfo',
          children:[
            {
              path: 'userInfo',
              name: 'userInfo',
              component: UserInfo
            },
            {
              path: 'orderList',
              name: 'orderList',
              component: OrderList
            }
          ]
        },
      ]
    }
  ]
})
