<template>
  <div class="search_result">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>购物车</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div v-if="showGoods" class="show_goods">
        <div class="head">
          <el-checkbox class="check_all" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div class="goods">商品</div>
          <div class="appearance">品相</div>
          <div class="selling_price">单价</div>
          <div class="amount">数量</div>
          <div class="total_price">金额</div>
          <div class="operation">操作</div>
        </div>
        <div class="body">
          <el-checkbox-group v-model="checkedGoods" @change="handleCheckedGoodsChange">
            <div class="goods_container" v-for="(item, index) in goodsList" :key="index">
              <el-checkbox class="check" :label="item.id">{{ index + 1 }}</el-checkbox>
              <img :src="item.cover" @click="gotoBookDetail(item)" />
              <div class="book_name" @click="gotoBookDetail(item)" >{{ item.name }}</div>
              <div class="appearance">{{ item.appearance }}</div>
              <div class="selling_price">{{ item.sellingPrice.toFixed(2) }}</div>
              <div class="amount">
                <el-input-number v-model="item.amount" @change="handleAmountChange(item)" size="mini" :min="1" :max="item.stock" label="数量">
                </el-input-number>
              </div>
              <div class="total_price">{{ (item.sellingPrice * item.amount).toFixed(2) }}</div>
              <div class="operation" @click="deleteGoods(item)" >删除</div>
            </div>
          </el-checkbox-group>
        </div>
        <div class="foot" @click="gotoPurchase">
          <div>去结算</div>
        </div>
      </div>
      <div v-else class="no_goods">
        <img src="../../assets/images/shopping_cart.png" />
        <div class="prompt">
          您的购物车是空的，您可以<div class="goto_home" @click="gotoHome">去逛逛</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BookService } from "src/service/book.js";
import { GoodsService } from "src/service/goods.js";

export default {
  data() {
    return {
      amount: [],
      checkAll: false,
      checkedGoods: [],
      allGoodsId: [],
      isIndeterminate: false,
      goodsList: [],
      showGoods: false
    };
  },

  components: {},

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      this.goodsList = await GoodsService.getAllGoods();
      if (!this.goodsList || !this.goodsList.length) {
        this.showGoods = false;
        return;
      } else {
        this.showGoods = true;
      }
      this.goodsList.forEach((goods, index) => {
        this.allGoodsId.push(goods.id);
      });
    },

    handleAmountChange(item) {
      GoodsService.updateGoods(item);
    },

    handleCheckAllChange(val) {
      this.checkedGoods = val ? this.allGoodsId : [];
      this.isIndeterminate = false;
    },

    handleCheckedGoodsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allGoodsId.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allGoodsId.length;
    },

    deleteGoods(item) {
      GoodsService.deleteGoodsById(item.id);
      this.initData();
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

    gotoPurchase() {
      if (!this.checkedGoods || !this.checkedGoods.length) {
        this.$toast.text("请选择要购买的商品");
        return;
      }
      let purchaseGoods = [];
      this.goodsList.forEach(goods => {
        this.checkedGoods.forEach(checked => {
          if (goods.id === checked) {
            purchaseGoods.push(goods);
          }
        });
      });
      this.$router.push({
        name: "purchase",
        query: {
          purchaseGoods: JSON.stringify(purchaseGoods)
        }
      })
    },

    gotoHome() {
      this.$router.push("/page/home");
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

    .show_goods {
      display: flex;
      flex-direction: column;

      .head {
        padding: 0.1rem 0;
        width: 100%;
        border-bottom: 1px solid #dddddd;
        font-size: 0.17rem;
        color: #606266;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;

        .check_all {
          margin: 0 0.2rem;

          /deep/ .el-checkbox__label {
            margin-top: 0.02rem;
            font-size: 0.17rem;
          }
        }
        .goods {
          width: 5rem;
        }
      }
      .body {
        .goods_container {
          margin: 0.5rem 0;
          padding-bottom: 0.2rem;
          border-bottom: 1px solid #dddddd;
          font-size: 0.15rem;
          line-height: 0.25rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          text-align: center;

          .check {
            align-self: center;
            margin: 0 0.2rem;

            /deep/ .el-checkbox__label {
              font-size: 0.17rem;
            }
          }
          img {
            width: 1rem;
            height: 1rem;
            border: 1px solid #dddddd;
            cursor: pointer;
          }
          .book_name {
            width: 4.2rem;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            cursor: pointer;
          }
          .operation {
            cursor: pointer;
          }
        }
      }

      .foot {
        margin-bottom: 0.2rem;
        width: 1.2rem;
        height: 0.5rem;
        font-size: 0.25rem;
        align-self: flex-end;
        background-color: #7b111b;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }

      .appearance {
        width: 0.8rem;
      }
      .selling_price {
        width: 0.8rem;
      }
      .amount {
        width: 2.2rem;
      }
      .total_price {
        width: 0.8rem;
      }
      .operation {
        width: 0.8rem;
      }
    }

    .no_goods {
      margin: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 0.8rem;
        height: 0.7rem;
      }
      .prompt {
        margin-left: 0.5rem;
        font-size: 0.3rem;
        color: #999;
        display: flex;
        .goto_home {
          margin-left: 0.1rem;
          color: #365899;
          cursor: pointer;
        }
        .goto_home:hover {
          color: #8c222c;
        }
      }
    }
  }
}
</style>
