<template>
  <div class="home">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-tabs tab-position="left">
            <el-tab-pane v-for="(tab, index) in bookTabs" :key="index" :label="tab.title">
              <book-list :bookList="tab.items"></book-list>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>

    </div>
</template>

<script>
import BookList from "./bookList.vue";
import { BookService } from "src/service/book.js";

export default {
  data() {
    return {
      bookTabs: BookService.initBookTabs()
    };
  },

  components: {
    BookList
  },

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      this.bookTabs = await BookService.getAllTypeBooks();
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 0.2rem 2.5rem;
  .breadcrumb {
    padding: 0.2rem;
    border-bottom: 1px solid #dddddd;
  }
  .content {
    margin-top: 0.3rem;

    /deep/ .is-active {
      background: #e9e8e4;
    }

    /deep/ .is-left {
      text-align: left;
    }
  }
}
</style>
