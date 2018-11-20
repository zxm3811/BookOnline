<template>
	<div class="search_result_list">
    <div class="book_list_container">
      <div v-for="(item, index) in currentBookList" :key="index" class="book_container">
        <img :src="item.cover" @click="gotoBookDetail(index)" />
        <div class="book_info">
          <div class="head">
            <div class="book_name" @click="gotoBookDetail(index)" v-html="item.name" ></div>
            <div class="appearance_and_price">
              <div class="appearance">{{ item.appearance }}</div>
              <div class="price">￥{{ item.sellingPrice && item.sellingPrice.toFixed(2) }}</div>
            </div>
          </div>
          <div class="detail">
            <div class="author">作者: <span v-html="item.author"></span></div>
            <div class="publish_date">出版时间: {{ item.publishDate }}</div>
            <div class="binding">装帧: {{ item.binding }}</div>
            <div class="publish_house">出版社: {{ item.publishHouse }}</div>
            <div class="format">开本: {{ item.format }}</div>
            <div class="isbn">ISBN: <span v-html="item.isbn"></span></div>
          </div>
          <div class="put_on_date">{{ item.putOnDate }} 上书</div>
          <div class="foot">
            <div class="buy_now" @click="buyNow(item)">
              <div>立即购买</div>
            </div>
            <div class="add_into_shopping_cart" @click="addIntoShoppingCart(item)">
              <div>加入购物车</div>
            </div>
          </div>
        </div>
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
import { AccountService } from "src/service/account";
import { BookService } from "src/service/book.js";
import { GoodsService } from "src/service/goods.js";

export default {
  data() {
    return {
      keyword: this.$route.params.keyword,
      pageSize: 10,
      total: 0,
      currentPage: 0,
      showBookList: [],
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
        this.showBookList = JSON.parse(JSON.stringify(this.bookList));
        this.total = this.showBookList.length;
        this.currentPage = 1;
        this.currentBookList = this.showBookList.slice(0, this.pageSize);
        this.highlight();
      }
    }
  },

  async mounted() {
    this.hasLogin = await AccountService.hasLogin();
  },

  methods: {
    handleCurrentChange(val) {
      this.currentBookList = this.showBookList.slice((val-1)*this.pageSize, val*this.pageSize);
      domUtil.setScrollTop(0);
    },

    highlight() {
      if(this.keyword) {
        this.showBookList.forEach(book => {
          if(book.name.search(this.keyword) != -1) {
            book.name = book.name.replace(
              new RegExp(this.keyword, "gi"),
              "<span style='color: #cc222c;'>" + this.keyword + "</span>");
          }
          if(book.author.search(this.keyword) != -1) {
            book.author = book.author.replace(
              new RegExp(this.keyword, "gi"),
              "<span style='color: #cc222c;'>" + this.keyword + "</span>");
          }
          if(book.isbn.search(this.keyword) != -1) {
            book.isbn = book.isbn.replace(
              new RegExp(this.keyword, "gi"),
              "<span style='color: #cc222c;'>" + this.keyword + "</span>");
          }
        });
      }
    },

    gotoBookDetail(index) {
      BookService.saveBook(this.bookList[index]);
      this.$router.push({
        name: "bookDetail",
        params: {
          bookId: this.bookList[index].id
        }
      });
    },

    buyNow(item) {
      if(!this.hasLogin) {
        this.$toast.text("您还未登录，请先登录");
        return;
      }
      let purchaseGoods = [];
      let goods = JSON.parse(JSON.stringify(item));
      goods.amount = 1;
      purchaseGoods.push(goods);
      this.$router.push({
        name: "purchase",
        query: {
          purchaseGoods: JSON.stringify(purchaseGoods)
        }
      })
    },

    addIntoShoppingCart(item) {
      if(!this.hasLogin) {
        this.$toast.text("您还未登录，请先登录");
        return;
      }
      let goods = JSON.parse(JSON.stringify(item));
      goods.amount = 1;
      GoodsService.saveGoods(goods);
      this.$toast.text("已加入购物车");
    }
  }
};
</script>

<style lang="scss" scoped>
.search_result_list {
  display: flex;
  flex-direction: column;
  align-items: center;

  .book_list_container {
    display: flex;
    flex-direction: column;
    
    .book_container {
      width: 10rem;
      padding: 0.3rem 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #dddddd;

      img {
        width: 2rem;
        height: 2rem;
        border: 1px solid #dddddd;
        cursor: pointer;
      }

      .book_info {
        margin-left: 0.5rem;
        width: 7.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        font-size: 0.2rem;

        .head {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .book_name {
            font-size: 0.2rem;
            color: #365899;
            cursor: pointer;
          }

          .appearance_and_price {
            width: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .appearance {
              font-size: 0.15rem;
            }
            .price {
              font-size: 0.2rem;
              color: #8c222c;
              font-weight: bolder;
            }
          }
        }

        .detail {
          margin: 0.2rem 0;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          font-size: 0.15rem;

          div {
            width: 33%;
            margin: 0.05rem 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .put_on_date {
          font-size: 0.15rem;
        }

        .foot {
          margin-top: 0.2rem;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .buy_now {
            width: 1rem;
            height: 0.3rem;
            border-radius: 0.04rem;
            font-size: 0.15rem;
            border: 1px solid #b5aa9a;
            background-color: #f8f7f3;
            color: #967f5f;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .add_into_shopping_cart {
            margin-left: 0.2rem;
            width: 1.2rem;
            height: 0.3rem;
            border-radius: 0.04rem;
            border: 1px solid #bf7f5f;
            background-color: #f8f2ef;
            color: #a66442;
            font-size: 0.15rem;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
