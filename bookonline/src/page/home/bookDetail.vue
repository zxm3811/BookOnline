<template>
  <div class="book_detail">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>图书详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="book_container">
        <div class="cover">
          <img :src="book.cover" />
        </div>
        <div class="book_info">
          <div class="book_name">{{ book.name }}</div>
          <div class="detail_info">
            <div class="author">作者: {{ book.author }}</div>
            <div class="publish_date">出版时间: {{ book.publishDate }}</div>
            <div class="binding">装帧: {{ book.binding }}</div>
            <div class="publish_house">出版社: {{ book.publishHouse }}</div>
            <div class="format">开本: {{ book.format }}</div>
            <div class="isbn">ISBN: {{ book.isbn }}</div>
          </div>
          <div class="sell_info">
            <div class="selling_price_container">
              <div class="selling_price_text">售价</div>
              <div class="selling_price_detail">
                <div class="selling_price">￥{{ book.sellingPrice && book.sellingPrice.toFixed(2) }}</div>
                <div class="sale">{{ book.sale && book.sale.toFixed(1) }}折</div>
              </div>
            </div>
            <div class="fixed_price_container">
              <div class="fixed_price_text">定价</div>
              <div class="fixed_price">￥{{ book.fixedPrice && book.fixedPrice.toFixed(2) }}</div>
            </div>
            <div class="appearance_container">
              <div class="appearance_text">品相</div>
              <div class="appearance">{{ book.appearance }}</div>
            </div>
          </div>
          <div class="address_container">
            <div class="address_text">发货地址</div>
            <div class="address">{{ book.address }}</div>
          </div>
          <div class="put_on_date_container">
            <div class="put_on_date_text">上书时间</div>
            <div class="put_on_date">{{ book.putOnDate }}</div>
          </div>
          <div class="amount_container">
            <div class="amount_text">数量</div>
            <el-input-number v-model="amount" size="mini" :min="1" :max="book.stock" label="数量">
            </el-input-number>
            <div class="stock">库存{{ book.stock }}件</div>
          </div>
          <div class="button_container">
            <div class="buy_now" @click="buyNow">
              <div>立即购买</div>
            </div>
            <div class="add_into_shopping_cart" @click="addIntoShoppingCart">
              <div>加入购物车</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
</template>

<script>
import { AccountService } from "src/service/account";
import { BookService } from "src/service/book.js";
import { GoodsService } from "src/service/goods.js";

export default {
  data() {
    return {
      amount: 1,
      book: {},
      hasLogin: false
    };
  },

  components: {
  },

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      this.book = await BookService.getBookInfo();
      this.hasLogin = await AccountService.hasLogin();
    },

    buyNow() {
      if(!this.hasLogin) {
        this.$toast.text("您还未登录，请先登录");
        return;
      }
      let purchaseGoods = [];
      let goods = JSON.parse(JSON.stringify(this.book));
      goods.amount = this.amount;
      purchaseGoods.push(goods);
      this.$router.push({
        name: "purchase",
        query: {
          purchaseGoods: JSON.stringify(purchaseGoods)
        }
      })
    },

    addIntoShoppingCart() {
      if(!this.hasLogin) {
        this.$toast.text("您还未登录，请先登录");
        return;
      }
      let goods = JSON.parse(JSON.stringify(this.book));
      goods.amount = this.amount;
      GoodsService.saveGoods(goods);
      this.$toast.text("已加入购物车");
    }
  }
};
</script>

<style lang="scss" scoped>
.book_detail {
  padding: 0.2rem 2.5rem;
  .breadcrumb {
    padding: 0.2rem;
    border-bottom: 1px solid #dddddd;
  }
  .content {
    margin-top: 0.3rem;

    .book_container {
      width: 100%;
      display: flex;
      align-items: flex-start;

      .cover {
        width: 3.2rem;
        border: 1px solid #dad6d6;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .book_info {
        margin-left: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 0.2rem;

        .book_name {
          font-weight: bolder;
          font-size: 0.25rem;
          line-height: 0.3rem;
          color: #333;
        }

        .detail_info {
          margin: 0.1rem 0;
          padding: 0.1rem;
          width: 7rem;
          border: 1px solid #dad6d6;
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

        .sell_info {
          margin: 0.1rem 0;
          padding: 0.1rem;
          background: #f3f0e9;
          width: 7rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          .selling_price_container {
            margin: 0.05rem 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .selling_price_text {
              font-size: 0.15rem;
              color: #999;
            }
            .selling_price_detail {
              margin-left: 0.5rem;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .selling_price {
                font-size: 0.22rem;
                color: #8c222c;
                font-weight: bolder;
              }
              .sale {
                line-height: 0.2rem;
                margin-left: 0.1rem;
                padding: 0 0.02rem;
                height: 0.2rem;
                font-size: 0.12rem;
                background: #bf7f5f;
                color: #fff;
              }
            }
          }

          .fixed_price_container {
            margin: 0.05rem 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .fixed_price_text {
              font-size: 0.15rem;
              color: #999;
            }
            .fixed_price {
              margin-left: 0.5rem;
              font-size: 0.18rem;
              text-decoration: line-through;
            }
          }

          .appearance_container {
            margin: 0.05rem 0;
            font-size: 0.15rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .appearance_text {
              color: #999;
            }
            .appearance {
              margin-left: 0.5rem;
              color: #bf7f5f;
              font-weight: bolder;
            }
          }
        }

        .address_container {
          padding: 0.1rem;
          width: 7rem;
          border-bottom: 1px solid #dad6d6;
          font-size: 0.15rem;
          display: flex;
          align-items: center;
          .address_text {
            color: #999;
          }
          .address {
            margin-left: 0.5rem;
          }
        }

        .put_on_date_container {
          margin-top: 0.1rem;
          padding: 0.1rem;
          width: 7rem;
          font-size: 0.15rem;
          display: flex;
          align-items: center;
          .put_on_date_text {
            color: #999;
          }
          .put_on_date {
            margin-left: 0.5rem;
          }
        }

        .amount_container {
          padding: 0 0.1rem;
          width: 7rem;
          font-size: 0.15rem;
          color: #999;
          display: flex;
          align-items: center;
          .amount_text {
            margin-right: 0.2rem;
          }
          .stock {
            margin-left: 0.15rem;
          }
        }

        .button_container {
          margin: 0.2rem 0;
          width: 7rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .buy_now {
            width: 2rem;
            height: 0.5rem;
            border-radius: 0.04rem;
            background-color: #f8f7f3;
            color: #8c222c;
            font-size: 0.2rem;
            cursor: pointer;
            border: 1px solid #8c222c;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .add_into_shopping_cart {
            margin-left: 0.5rem;
            width: 2rem;
            height: 0.5rem;
            border-radius: 0.04rem;
            background-color: #8c222c;
            color: #ffffff;
            font-size: 0.2rem;
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
