<template>
	<div class="header">
		<div class="logo">
			<img src="../../assets/images/logo.png" />
		</div>
		<div class="title">BookOnline 在线书店</div>
		<div class="menu">
			<div class="login_or_register">登录/注册</div>
			<div class="shopping_cart">购物车</div>
			<div class="my_order">我的订单</div>
		</div>
		<div class="user_info">
			<el-dropdown @command="handleCommand">
				<div class="head_icon">
					<img :src="userImg"/>
					<span class="username"><slot name="username"></slot></span>
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="know">个人信息</el-dropdown-item>
					<el-dropdown-item command="resetPwd">我的订单</el-dropdown-item>
					<el-dropdown-item command="personalCenter">卖家中心</el-dropdown-item>
					<el-dropdown-item command="exit" divided>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      activeIndex: "/page/layout",
      userImg: require("src/assets/images/logo.png")
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "know") {
        this.$router.push("/page/readme");
      } else if (command == "resetPwd") {
        this.$router.push("/page/resetPwd");
      } else if (command == "exit") {
        localStorage.removeItem("user-name");
        this.$router.push("/");
      } else if (command == "personalCenter") {
        this.$router.push("/page/personalCenter");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  .logo {
    margin-left: 0.5rem;
    width: 1.5rem;
    height: 0.8rem;
    display: flex;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    margin-left: 0.2rem;
    font-size: 0.4rem;
    font-weight: bold;
  }

	.menu {
		margin-left: 4.5rem;
		display: flex;
		align-items: center;

		.login_or_register {
			font-size: 0.22rem;
			cursor: pointer;
		}

		.shopping_cart {
			margin-left: 0.3rem;
			font-size: 0.22rem;
			cursor: pointer;
		}

		.my_order {
			margin-left: 0.3rem;
			font-size: 0.22rem;
			cursor: pointer;
		}
  }

  .user_info {
    position: absolute;
    right: 0.7rem;
    font-size: 0.4rem;
    cursor: pointer;

    img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      vertical-align: middle;
    }

    .username {
      font-size: 0.22rem;
      color: #ff3333;
    }

    .el-dropdown-menu__item {
      text-align: center;
    }
  }
}
</style>