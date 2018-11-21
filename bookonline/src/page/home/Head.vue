<template>
	<div class="header">
		<div class="logo_and_title" @click="gotoHome">
			<div class="logo">
				<img src="../../assets/images/logo.png" />
			</div>
			<div class="title">BookOnline 在线书店</div>
		</div>
		<search-bar></search-bar>
		<div class="menu">
			<div v-if="!hasLogin" class="login_or_register" @click="gotoLogin">登录/注册</div>
			<div class="shopping_cart" @click="gotoShoppingCart">购物车</div>
			<div class="my_order" @click="gotoMyOrder">我的订单</div>
			<div class="user_container">
				<el-dropdown v-if="hasLogin" @command="handleCommand">
					<div class="user_info">
						<img :src="userImg"/>
						<span class="username">{{ userInfo.name || userInfo.account }}</span>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
						<el-dropdown-item command="myOrder">我的订单</el-dropdown-item>
						<el-dropdown-item command="sailerCenter">卖家中心</el-dropdown-item>
						<el-dropdown-item command="exit" divided>退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<div v-else class="user_center" @click="gotoUserCenter">个人中心</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import SearchBar from "./searchBar.vue"
import { AccountService } from "src/service/account";

export default {
  data() {
    return {
			userImg: require("src/assets/images/logo.png"),
			userName: "admin",
			userInfo: {},
			hasLogin: false
    	};
	},

	components: {
		SearchBar
	},

	async mounted() {
		this.hasLogin = await AccountService.hasLogin();
		if(this.hasLogin) {
			this.userInfo = await AccountService.getCurrentUserInfo();
		}
	},

  methods: {
		gotoHome() {
			this.$router.push("/page/home")
		},

		gotoLogin() {
			this.$router.push("/login");
		},

		gotoShoppingCart() {
			if(!this.hasLogin) {
			  	this.$toast.text("您还未登录，请先登录");
			  	return;
			}
			this.$router.push("/page/shoppingCart");
		},

		gotoMyOrder() {
			if(!this.hasLogin) {
        		this.$toast.text("您还未登录，请先登录");
        		return;
      		}
			this.$router.push("/page/userCenter/buyerOrderList");
		},

		gotoUserCenter() {
			if(!this.hasLogin) {
        		this.$toast.text("您还未登录，请先登录");
        		return;
			}
			this.$router.push("/page/userCenter");
		},

    async handleCommand(command) {
      if (command == "userInfo") {
        this.$router.push("/page/userCenter/userInfo");
      } else if (command == "myOrder") {
        this.$router.push("/page/userCenter/buyerOrderList");
      } else if (command == "sailerCenter") {
        this.$router.push("/page/userCenter/myBooks");
      } else if (command == "exit") {
				await AccountService.logout();
				this.$router.push("/page/home");
				window.location.reload();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;

	.logo_and_title {
		display: flex;
		align-items: center;
		cursor: pointer;

		.logo {
			margin-left: 0.5rem;
			width: 1.2rem;
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
	}

	.menu {
		margin-right: 0.5rem;
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

		.user_container {
			margin-left: 0.3rem;
			cursor: pointer;
			display: flex;
			align-items: center;

			.user_info {
				display: flex;
				align-items: center;

				img {
					width: 0.6rem;
					height: 0.6rem;
					border-radius: 50%;
				}

				.username {
					margin-left: 0.1rem;
					font-size: 0.22rem;
					color: #ff3333;
				}
			}

			.user_center {
				color: #ffffff;
				font-size: 0.22rem;
				cursor: pointer;
			}
		}
  }
}
.el-dropdown-menu__item {
	text-align: center;
}
</style>
