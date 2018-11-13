<template>
	<div class="header">
		<div class="logo">
			<img src="../../assets/images/logo.jpg" />
		</div>
		<div class="title">优题网</div>
		<div class="welcome">试卷智能生成与题库管理系统</div>
		<div class="user_info">
			<el-dropdown trigger="click" @command="handleCommand">
				<div class="head_icon">
					<img :src="userImg"/>
					<span class="username"><slot name="username"></slot></span>
				</div>
				<el-dropdown-menu slot="dropdown" class="dropdown">
					<el-dropdown-item command="know">了解该系统</el-dropdown-item>
					<el-dropdown-item command="resetPwd">修改密码</el-dropdown-item>
					<el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
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
      userImg: require("src/assets/images/logo.jpg")
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
  position: fixed;
  width: 100%;
  height: 0.8rem;
	background-color: #acf0db;
	border-bottom: 1px solid #cac8c8;
	display: flex;
	align-items: center;

	.logo {
		margin-left: 0.5rem;
		width: 0.8rem;
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
		font-size: 0.6rem;
		font-weight: bold;
	}

	.welcome {
		margin: 2.5rem;
		font-size: 0.4rem;
	}

	.user_info {
		position: absolute;
		right: 1rem;
		font-size: 0.4rem;
		cursor: pointer;

		img {
			width: 0.6rem;
			height: 0.6rem;
			border-radius: 50%;
			vertical-align: middle;
		}

		.username {
			font-size: 0.2rem;
			color: #ff3333;
		}

		.el-dropdown-menu__item {
			text-align: center;
		}
	}
}
</style>