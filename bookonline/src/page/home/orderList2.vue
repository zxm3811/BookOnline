<template>
    <div>
        <el-row>
            <div class="typeTab">
                <el-table :data="items.filter(data => !search || data.orderNo.includes(search) || data.book.toLowerCase().includes(search.toLowerCase()))"
                          fit style="width: 100%">
                    <el-table-column prop="orderNo" label="订单号"></el-table-column>
                    <el-table-column prop="book" label="商品名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="reciver" label="收件人">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.reciver }}</p>
                                <p>收货地址: {{ scope.row.addrString }}</p>
                                <div slot="reference" class="name-wrapper">
                                    {{ scope.row.reciver }}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
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
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-row>
    </div>
</template>

<script>
  import { OrderService } from "../../service/order";

  export default {
    data () {
      return {
        search: '',
        items: [],
        filter:[
          { text: '已完成订单', value: '0' },
          { text: '交易中订单', value: '1' },
          { text: '待确认订单', value: '2' },
          { text: '待付款订单', value: '3' }
        ]
      };
    },
    mounted () {
      this.initData();
    },
    methods: {
      formatter (row, column) {
        let addr = row.address;
        return addr.country + addr.province + addr.city + addr.district + addr.mark;
      },
      filterTag (value, row) {
        return row.status === value;
      },
      filterHandler (value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleClick (row) {
        console.log(row.orderNo);
      },
      async initData() {
        this.items = await OrderService.getOrderList();
        console.log(this.items);
      }
    }
  }
</script>

<style lang="scss" scoped>
    .typeTab {
        font-size: 0.12rem;
        .searchBox {
            padding: 1rem;
        }
    }
</style>
