<template>
	<div class="book_list">
    <div class="book_list_container">
      <div v-for="(item, index) in currentBookList" :key="index" class="book_container">
        <div class="book_info">
          <img :src="item.cover" :alt="item.name" @click="gotoBookDetail(item)" />
          <div class="book_text">
            <div class="book_name" :title="item.name" @click="gotoBookDetail(item)">{{ item.name }}</div>
            <div class="book_author" :title="item.author">{{ item.author }}</div>
          </div>
        </div>
        <div class="book_price">￥{{ item.sellingPrice.toFixed(2) }}</div>
      </div>
    </div>
    
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
	</div>
</template>

<script type="text/javascript">
import domUtil from "src/assets/js/domUtils.js";
import { BookService } from "src/service/book.js";

export default {
  data() {
    return {
      pageSize: 12,
      total: 0,
      currentPage: 0,
      currentBookList: []
    };
  },
  
  props: {
    bookList: {
      type: Array,
      default: null
    }
  },

  watch: {
    bookList() {
      if(this.bookList) {
        this.total = this.bookList.length;
        this.currentPage = 1;
        this.currentBookList = this.bookList.slice(0, this.pageSize);
      }
    }
  },

  mounted() {
  },

  methods: {
    handleCurrentChange(val) {
      this.currentBookList = this.bookList.slice((val-1)*this.pageSize, val*this.pageSize);
      domUtil.setScrollTop(0);
    },

    gotoBookDetail(item) {
      BookService.saveBook(item);
      this.$router.push({
        name: "bookDetail",
        params: {
          bookId: item.id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.book_list {
  display: flex;
  flex-direction: column;
  align-items: center;

  .book_list_container {
    display: flex;
    flex-wrap: wrap;
    
    .book_container {
      margin: 0.2rem 0.22rem;
      width: 1.76rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      .book_info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        img {
          width: 100%;
          height: 1.76rem;
          cursor: pointer;
        }

        .book_text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          .book_name {
            margin: 0 0.23rem;
            width: 1.3rem;
            font-size: 0.16rem;
            color: #333;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            cursor: pointer;
          }

          .book_author {
            margin: 0.05rem 0.23rem;
            width: 1.3rem;
            font-size: 0.15rem;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .book_price {
        margin: 0 0.23rem;
        font-size: 0.2rem;
        color: #bf7f5f;
      }
    }
  }
}
</style>
