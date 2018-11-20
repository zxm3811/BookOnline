<template>
    <div>
        <el-row>
            <div class="typeTab">
                <el-table :data="items.filter(data => !search || data.orderId.includes(search) || data.book.toLowerCase().includes(search.toLowerCase()))"
                          fit style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <div class="expandMsg">
                                    <div v-for="(items, index) in props.row.book" :key="index">
                                        <el-col>
                                            <el-form-item style="cursor: pointer;" label="商品名称">
                                                <span @click="gotoBookDetail(items)">{{ items.name }}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col>
                                            <el-form-item label="商品单价">
                                                <span>{{ items.sellingPrice }} 元</span>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                    <el-col>
                                        <el-form-item label="收货地址">
                                            <span>{{ props.row.addrString }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col>
                                        <el-form-item label="商品件数">
                                            <span>{{ props.row.bookNum }} 件</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="14">
                                        <el-form-item label="商品总价">
                                            <span>{{ props.row.totalPrice }} 元</span>
                                        </el-form-item>
                                    </el-col>
                                </div>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderId" label="订单号"></el-table-column>
                    <el-table-column prop="receiver" label="收件人"></el-table-column>
                    <el-table-column prop="status" label="订单状态" :filters="filter"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag disable-transitions>{{filter[scope.row.status].text}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot="header" slot-scope="slot">
                            <el-input v-model="search" size="mini" placeholder="订单号/商品名"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button @click="confirm(scope.row)" type="primary" size="small" plain v-if="scope.row.status !== '0'">确认送达</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-row>

    </div>
</template>

<script>
  import { OrderService } from "../../service/order";
  import domUtil from "src/assets/js/domUtils.js";
  import { BookService } from "src/service/book.js";
export default {
  data () {
    return {
      search: '',
      items: [],
      filter:[
        { text: '已完成订单', value: '0' },
        { text: '交易中订单', value: '1' },
        { text: '待确认订单', value: '2' },
        { text: '待发货订单', value: '3' }
      ]
    };
  },
  mounted () {
    this.initData();
  },
  methods: {
    filterTag (value, row) {
      return row.status === value;
    },
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    async confirm (row) {

    },
    async initData() {
      this.items = await OrderService.getOrderList();
    },
    gotoBookDetail(item) {
      event.stopPropagation();
      console.log(item.id);
      BookService.saveBook(item);
      this.$router.push({
        name: "bookDetail",
        params: {
          bookId: item.id
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
    .typeTab {
        font-size: 0.12rem;
        .expandMsg {
            margin-left: 0.14rem;
        }
    }
</style>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
    }
</style>
