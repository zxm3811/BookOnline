<template>
    <div class="usercenter">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-menu active-text-color="#8c222c"
                             :default-active="$route.path"
                             router>
                        <div class="menu_box">
                            <el-menu-item-group>
                                <template slot="title">我是买家</template>
                                <el-menu-item index="/page/shoppingCart">购物车</el-menu-item>
                                <el-menu-item index="/page/userCenter/buyerOrderList">我的订单</el-menu-item>
                            </el-menu-item-group>

                        </div>
                        <div class="menu_box">
                            <el-menu-item-group>
                                <template slot="title">我是卖家</template>
                                <el-menu-item index="/page/userCenter/sellerOrderList">我的订单</el-menu-item>
                                <el-menu-item index="/page/userCenter/myBooks">我的书籍</el-menu-item>
                            </el-menu-item-group>
                        </div>
                        <div class="menu_box">
                            <el-menu-item-group>
                                <template slot="title">更多</template>
                                <el-menu-item index="/page/userCenter/userInfo">个人信息</el-menu-item>
                                <el-menu-item index="/page/userCenter/editPwd">修改密码</el-menu-item>
                                <el-menu-item index="/page/userCenter/editInfo">修改信息</el-menu-item>
                            </el-menu-item-group>
                        </div>
                    </el-menu>
                </el-col>
                <el-col :span="20">
                    <transition name="fade" mode="out-in"><router-view></router-view></transition>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.usercenter {
  padding: 0.2rem 2.5rem;
  .breadcrumb {
    padding: 0.2rem;
    border-bottom: 1px solid #dddddd;
  }
  .content {
    margin-top: 0.3rem;
    .menu_box {
      margin-top: 0.2rem;
    }
  }
}
</style>
