import Vue from 'vue'
import VueRouter  from 'vue-router'

import Login from 'src/page/account/login/login.vue'
import Register from 'src/page/account/register/register.vue'
import Page from 'src/page/home/page.vue'
import Home from 'src/page/home/home.vue'
import SearchResult from 'src/page/home/searchResult.vue'
import BookDetail from 'src/page/home/bookDetail.vue'
import ShoppingCart from 'src/page/purchase/shoppingCart.vue'
import Purchase from 'src/page/purchase/purchase.vue'
import userCenter from 'src/page/center/userCenter.vue'
import userInfo from 'src/page/center/userInfo.vue'
import sellerOrderList from 'src/page/center/sellerOrderList.vue'
import buyerOrderList from 'src/page/center/buyerOrderList.vue'
import editInfo from 'src/page/center/editInfo.vue'
import editPwd from 'src/page/center/editPwd.vue'

Vue.use(VueRouter);

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
          path:'bookDetail/:bookId',//图书详情页
          name: 'bookDetail',
          component: BookDetail
        },
        {
          path:'shoppingCart',//购物车页
          name: 'shoppingCart',
          component: ShoppingCart
        },
        {
          path:'purchase',//购买页
          name: 'purchase',
          component: Purchase
        },
        {
          path: 'userCenter',//个人中心
          name: 'userCenter',
          component: userCenter,
          redirect: '/page/userCenter/userInfo',
          children:[
            {
              path: 'userInfo',//用户信息
              name: 'userInfo',
              component: userInfo
            },
            {
              path: 'buyerOrderList',//买家订单
              name: 'buyerOrderList',
              component: buyerOrderList
            },
            {
              path: 'sellerOrderList',//卖家订单
              name: 'sellerOrderList',
              component: sellerOrderList
            },
            {
              path: 'editInfo',//修改信息
              name: 'editInfo',
              component: editInfo
            },
            {
              path: 'editPwd',
              name: 'editPwd',
              component: editPwd
            }
          ]
        },
      ]
    }
  ]
})
