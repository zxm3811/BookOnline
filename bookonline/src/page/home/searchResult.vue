<template>
  <div class="search_result">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="search_result_amount">共 {{ filterBookList.length }} 条结果</div>
          <div class="search_result_container">
            <div class="filter">
              <div class="book_name">
                <div class="text">书名</div>
                <input class="input_box" v-model="bookName" @keyup.enter="clickFilter" />
              </div>
              <div class="author">
                <div class="text">作者</div>
                <input class="input_box" v-model="author" @keyup.enter="clickFilter" />
              </div>
              <div class="publish_house">
                <div class="text">出版社</div>
                <input class="input_box" v-model="publishHouse" @keyup.enter="clickFilter" />
              </div>
              <div class="isbn">
                <div class="text">ISBN</div>
                <input class="input_box" v-model="isbn" @keyup.enter="clickFilter" />
              </div>
              <div class="button" @click="clickFilter">
                <div class="text">筛选</div>
              </div>
            </div>
            <search-result-list :bookList="filterBookList" />
          </div>
        </el-col>
      </el-row>
    </div>

    </div>
</template>

<script>
import SearchResultList from "./searchResultList.vue";
import { BookService } from "src/service/book.js";

export default {
  data() {
    return {
      keyword: null,
      bookName: null,
      author: null,
      publishHouse: null,
      isbn: null,
      bookList: [],
      filterBookList: [],
    };
  },

  components: {
    SearchResultList
  },

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      this.keyword = this.$route.params.keyword;
      this.bookList = await BookService.searchBooks(this.keyword);
      this.filterBookList = JSON.parse(JSON.stringify(this.bookList));
    },

    clickFilter() {
      let tempBookList = [];
      this.filterBookList = JSON.parse(JSON.stringify(this.bookList));
      if(this.bookName && this.filterBookList.length) {
        tempBookList = this.filterBookList;
        this.filterBookList = [];
        tempBookList.forEach(book => {
          if(book.name.search(this.bookName) != -1) {
            this.filterBookList.push(book);
          }
        });
      }
      if(this.author && this.filterBookList.length) {
        tempBookList = this.filterBookList;
        this.filterBookList = [];
        tempBookList.forEach(book => {
          if(book.author.search(this.author) != -1) {
            this.filterBookList.push(book);
          }
        });
      }
      if(this.publishHouse && this.filterBookList.length) {
        tempBookList = this.filterBookList;
        this.filterBookList = [];
        tempBookList.forEach(book => {
          if(book.publishHouse.search(this.publishHouse) != -1) {
            this.filterBookList.push(book);
          }
        });
      }
      if(this.isbn && this.filterBookList.length) {
        tempBookList = this.filterBookList;
        this.filterBookList = [];
        tempBookList.forEach(book => {
          if(book.isbn.search(this.isbn) != -1) {
            this.filterBookList.push(book);
          }
        });
      }
      this.filterBookList = JSON.parse(JSON.stringify(this.filterBookList));
    }
  }
};
</script>

<style lang="scss" scoped>
.search_result {
  padding: 0.2rem 2.5rem;
  .breadcrumb {
    padding: 0.2rem;
    border-bottom: 1px solid #dddddd;
  }
  .content {
    margin-top: 0.3rem;

    .search_result_amount {
      margin: 0 0.3rem;
      font-size: 0.2rem;
    }

    .search_result_container {
      margin: 0.3rem;

      .filter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .book_name {
          display: flex;
          align-items: center;
        }
        .author {
          display: flex;
          align-items: center;
        }
        .publish_house {
          display: flex;
          align-items: center;
        }
        .isbn {
          display: flex;
          align-items: center;
        }
        .button {
          width: 0.5rem;
          height: 0.3rem;
          color: #bf7f5f;
          border-radius: 0.06rem;;
          border: 1px solid #dfbfaf;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .text {
          font-size: 0.15rem;
        }
        .input_box {
          margin-left: 0.1rem;
          width: 1.5rem;
          height: 0.3rem;
          padding: 0 0.05rem;
          border: 1px solid #bbbbbb;
          outline: none;
          -webkit-appearance: none;
        }
      }
    }
  }
}
</style>
