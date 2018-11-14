<template>
	<div class="search_bar">
    <input v-model="keyword" type="search" placeholder="搜索图书" @keyup.enter="gotoSearchResult" />
	</div>
</template>

<script type="text/javascript">

export default {
  data() {
    return {
      keyword: null,
      isSearchResult: false
    };
  },
  
  mounted() {
    this.keyword = this.$route.params.keyword;
  },

  methods: {
    gotoSearchResult() {
      if(!this.keyword) {
        return;
      }
      if(this.keyword === this.$route.params.keyword) {
        window.location.reload();
        return;
      }
      this.$router.push({
        name: "searchResult",
        params: {
          keyword: this.keyword
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.search_bar {
  width: 3rem;
  height: 0.35rem;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    height: 100%;
    padding: 0 0.1rem;
  }
}
</style>