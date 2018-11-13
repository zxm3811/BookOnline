<template>
	<div class="home">
		<v-head>
			<span slot="username">{{ nickname }}</span>
		</v-head>
		<side-bar></side-bar>
		<div class="page">
			<transition name="fade" mode="out-in"><router-view></router-view></transition>
		</div>
	</div>
</template>

<script type="text/javascript">
	import vHead from './Head';
	import SideBar from './SideBar';

	export default {
		data () {
			return {
				name:"admin"
			}
		},
		computed:{
			nickname (){
				const _username = localStorage.getItem("user-name");
				return _username || this.name;
			}
		},
		components:{
			vHead,SideBar
		}
	}
</script>

