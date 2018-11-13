<template>
	<div class="home">
    <side-bar></side-bar>
  </div>
</template>

<script type="text/javascript">
import SideBar from "./SideBar";

export default {
  data() {
    return {
    };
  },
  components: {
    SideBar
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>