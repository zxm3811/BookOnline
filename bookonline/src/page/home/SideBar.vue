<template>
	<div class="side-bar">
		<el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
			<div v-for="(item,key) in items" :key="key">
				<div v-if="item.children">
					<el-submenu :index="item.index">
						<div slot="title"><span :class="item.icon"></span>{{ item.title }}</div>
						<el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.index">{{ subItem.title }}
						</el-menu-item>
					</el-submenu>
				</div>
				<div v-else>
					<el-menu-item :index="item.index">
						<span :class="item.icon"></span>{{ item.title }}
					</el-menu-item>
				</div>
			</div>
		</el-menu>
		</div>
</template>

<script type="text/javascript">
import { sideBar } from "src/service/sideBar";

export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    }
  },
  mounted() {
    this.items = sideBar;
  },
  methods: {}
};
</script>

<style scoped>
.side-bar {
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  width: 250px;
}
.side-bar ul {
  height: 100%;
}
</style>