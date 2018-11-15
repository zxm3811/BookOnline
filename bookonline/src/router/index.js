import Vue from 'vue'
import VueRouter  from 'vue-router'

import Login from 'src/page/account/login/login.vue'
import Register from 'src/page/account/register/register.vue'
import Page from 'src/page/home/page.vue'
import Home from 'src/page/home/home.vue'
import SearchResult from 'src/page/home/searchResult.vue'
import userCenter from 'src/page/home/userCenter.vue'
import userInfo from 'src/page/home/userInfo.vue'
import orderList from 'src/page/home/orderList.vue'
import orderList2 from 'src/page/home/orderList2.vue'
import editInfo from 'src/page/home/editInfo.vue'


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
          path: 'usercenter',//个人中心
          name: 'usercenter',
          component: userCenter,
          redirect: '/page/usercenter/userinfo',
          children:[
            {
              path: 'userinfo',//用户信息
              name: 'userinfo',
              component: userInfo
            },
            {
              path: 'orderlist',//买家订单
              name: 'orderlist',
              component: orderList
            },
            {
              path: 'orderlist2',//卖家订单
              name: 'orderlist2',
              component: orderList2
            },
            {
              path: 'editinfo',//修改信息
              name: 'editinfo',
              component: editInfo
            }
          ]
        },
      ]
    }
  ]
})
