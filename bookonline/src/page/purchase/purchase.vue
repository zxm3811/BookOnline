<template>
  <div class="search_result">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/page/shoppingCart' }">购物车</el-breadcrumb-item>
        <el-breadcrumb-item>购买页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="address_list_container">
        <div class="head">
          <div class="title">收货地址</div>
          <div class="operation">管理收货地址</div>
        </div>
        <div v-if="showAddress" class="address_container">
          <div class="receiver_name">张兴明</div>
          <div class="receiver_phone">15850633732</div>
          <div class="receiver_address">江苏省南京市江宁区</div>
        </div>
        <div v-else class="prompt">您还没有收货地址，请先去添加</div>
      </div>
      <div class="goods_list_container">
        <div class="head">
          <div class="title">商品清单</div>
        </div>
        <div class="goods_list">
          <div v-for="(item, index) in purchaseGoods" :key="index" class="goods_container">
            <div class="body">
              <img :src="item.cover" @click="gotoBookDetail(item)" />
              <div class="book_name" @click="gotoBookDetail(item)" >{{ item.name }}</div>
              <div class="appearance">{{ item.appearance }}</div>
              <div class="selling_price">{{ item.sellingPrice }}</div>
              <div class="amount">x{{ item.amount }}件</div>
              <div class="total_price">{{ item.sellingPrice * item.amount }}</div>
            </div>
            <div class="foot">合计&nbsp;
              <div class="totol_price"> ¥ {{ item.sellingPrice * item.amount }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="total">
        共计 
        <div class="total_amount">&nbsp;{{ totalAmount }}&nbsp;</div>
        件商品，应付总金额 
        <div class="rmb">&nbsp;¥</div>
        <div class="total_price">{{ totalPrice }}</div>
      </div>
      <div class="confirm">
        <div>确认并提交订单</div>
      </div>
    </div>

    </div>
</template>

<script>
import { BookService } from "src/service/book.js";

export default {
  data() {
    return {
      choosedAddress: 0,
      totalAmount: 0,
      totalPrice: 0,
      showAddress: true,
      purchaseGoods: JSON.parse(this.$route.query.purchaseGoods),
    };
  },

  components: {
  },

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      this.purchaseGoods.forEach(goods => {
        this.totalAmount += goods.amount;
        this.totalPrice += goods.sellingPrice * goods.amount;
      });
    },

    gotoBookDetail(item) {
      BookService.saveBook(item);
      this.$router.push({
        name: "bookDetail",
        params: {
          bookId: item.id
        }
      });
    },
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
    display: flex;
    flex-direction: column;

    .address_list_container {
      display: flex;
      flex-direction: column;
      .head {
        margin: 0.1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          font-size: 0.25rem;
          font-weight: bold;
        }
        .operation {
          font-size: 0.15rem;
          cursor: pointer;
        }
      }
      .address_container {
        margin: 0.1rem 0;
        padding: 0.15rem 0.2rem;
        color: #999;
        display: flex;
        font-size: 0.15rem;
        color: #8c222c;
        .receiver_name {
          width: 1.5rem;
        }
        .receiver_phone {
          margin-left: 0.1rem;
          width: 2rem;
        }
        .receiver_address {
          margin-left: 0.1rem;
          width: 6.5rem;
        }
        div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .prompt {
        margin: 0.1rem 0;
        padding: 0.15rem 0.2rem;
        font-size: 0.2rem;
        color: #aaaaaa;
      }
    }
    
    .goods_list_container {
      border-bottom: 2px solid #8c222c;
      display: flex;
      flex-direction: column;
      .head {
        margin: 0.2rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          font-size: 0.25rem;
          font-weight: bold;
        }
      }
      .goods_list {
        display: flex;
        flex-direction: column;
        .goods_container {
          border-top: 1px solid #aaaaaa;
          display: flex;
          flex-direction: column;
          .body {
            padding: 0.2rem 0;
            font-size: 0.15rem;
            border-bottom: 1px solid #dddddd;
            display: flex;
            align-items: flex-start;
            img {
              width: 0.7rem;
              height: 0.7rem;
              cursor: pointer;
            }
            .book_name {
              margin-left: 0.1rem;
              width: 6rem;
              cursor: pointer;
            }
            .appearance {
              text-align: right;
              margin-left: 0.1rem;
              width: 1rem;
            }
            .selling_price {
              text-align: right;
              margin-left: 0.1rem;
              width: 1rem;
            }
            .amount {
              text-align: right;
              margin-left: 0.1rem;
              width: 1rem;
            }
            .total_price {
              text-align: right;
              margin-left: 0.1rem;
              width: 1rem;
              color: #bf7f5f;
              font-weight: bold;
            }
          }
          .foot {
            margin: 0.2rem 0 0.6rem 0;
            align-self: flex-end;
            font-size: 0.18rem;
            display: flex;
            align-items: center;
            .totol_price {
              color: #8c222c;
              font-weight: bold;
            }
          }
        }
      }
    }

    .total {
      margin: 0.3rem 0;
      align-self: flex-end;
      display: flex;
      align-items: flex-end;
      font-size: 0.2rem;
      .total_amount {
        color: #8c222c;
      }
      .rmb {
        font-size: 0.23rem;
        color: #8c222c;
      }
      .total_price {
        font-size: 0.3rem;
        color: #8c222c;
      }
    }

    .confirm {
      margin-bottom: 0.2rem;
      width: 2rem;
      height: 0.5rem;
      font-size: 0.2rem;
      align-self: flex-end;
      background-color: #7b111b;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
