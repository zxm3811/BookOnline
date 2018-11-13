<template>
	<div class="page">
		<v-head class="page_head">
			<span slot="username">{{ nickname }}</span>
		</v-head>
		<div class="page_body">
			<transition name="fade" mode="out-in"><router-view></router-view></transition>
		</div>
	</div>
</template>

<script type="text/javascript">
import vHead from "./Head";

export default {
  data() {
    return {
      name: "admin"
    };
  },
  computed: {
    nickname() {
      const _username = localStorage.getItem("user-name");
      return _username || this.name;
    }
  },
  components: {
    vHead
  }
};
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	height: 100%;
	padding-top: 0.8rem;

	.page_head {
		position: fixed;
		top: 0;
		width: 100%;
		height: 0.8rem;
		background-color: #8c222c;
		border-bottom: 1px solid #cac8c8;
		color: #ffffff;
		display: flex;
		align-items: center;
	}

	.page_body {
		width: 100%;
		height: 100%;
	}
}
</style>