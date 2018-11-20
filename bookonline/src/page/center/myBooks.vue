<template>
	<div class="my_book_list">
    <div class="head">
      <div class="my_book">我的书籍</div>
      <div class="add_book" @click="putOnMyNewBook">上架我的新书</div>
    </div>
    <div class="body">
      <div class="book_list_container">
        <div v-for="(item, index) in currentBookList" :key="index" class="book_container">
          <img :src="item.cover" @click="gotoBookDetail(index)" />
          <div class="book_info">
            <div class="head">
              <div class="book_name" @click="gotoBookDetail(index)">{{ item.name }}</div>
              <div class="appearance_and_price">
                <div class="appearance">{{ item.appearance }}</div>
                <div class="price">￥{{ item.sellingPrice }}</div>
              </div>
            </div>
            <div class="detail">
              <div class="author">作者: {{ item.author }}</div>
              <div class="publish_date">出版时间: {{ item.publishDate }}</div>
              <div class="binding">装帧: {{ item.binding }}</div>
              <div class="publish_house">出版社: {{ item.publishHouse }}</div>
              <div class="format">开本: {{ item.format }}</div>
              <div class="isbn">ISBN: {{ item.isbn }}</div>
            </div>
            <div class="put_on_date">{{ item.putOnDate }} 上书</div>
            <div class="foot">
              <div class="pull_off" @click="pullOffMyBook(item)">
                <div>下架</div>
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
      pageSize: 5,
      total: 0,
      currentPage: 0,
      userInfo: null,
      bookList: [],
      currentBookList: []
    };
  },
  
  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      this.userInfo = await AccountService.getUserInfo();
      this.bookList = await AccountService.getSellerBooks(this.userInfo.id);
      if(this.bookList && this.bookList.length != 0) {
        this.total = this.bookList.length;
        this.currentPage = 1;
        this.currentBookList = this.bookList.slice(0, this.pageSize);
      }
    },

    handleCurrentChange(val) {
      this.currentBookList = this.bookList.slice((val-1)*this.pageSize, val*this.pageSize);
      domUtil.setScrollTop(0);
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

    putOnMyNewBook() {
      if(this.userInfo.receiveAddress.address == "") {
        this.$toast.text("请先补全个人信息");
        return;
      }
      this.$router.push("/page/userCenter/putOnBook");
    },

    async pullOffMyBook(item) {
      let response = await AccountService.pullOffMyBook(item.id);
      if(response) {
        this.$toast.text("下架成功");
        this.initData();
      } else {
        this.$toast.text(response.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my_book_list {
  display: flex;
  flex-direction: column;
  align-items: center;

  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .my_book {
      font-size: 0.2rem;
      font-weight: bold;
    }
    .add_book {
      font-size: 0.15rem;
      color: #bf7f5f;
      cursor: pointer;
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    .book_list_container {
      display: flex;
      flex-direction: column;
      
      .book_container {
        width: 9rem;
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
              width: 4rem;
              font-size: 0.2rem;
              color: #365899;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
            .pull_off {
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
          }
        }
      }
    }
  }
}
</style>
