<template>
    <div>
        <el-row>
            <div class="typeTab">
                <!--
                <el-form :inline="true" :model="formSearch" size="mini">
                    <el-col :span="12">
                        <el-form-item label="查询">
                            <el-input v-model="formSearch.orderNo" placeholder="订单号/商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品名称">
                            <el-input v-model="formSearch.bookName" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-button type="primary">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
                -->
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
                    <!--
                    <el-table-column prop="address" label="地址" width="260" :formatter="formatter" show-overflow-tooltip></el-table-column>
                    -->
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
import {orderList} from "../../service/orderList";

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
    this.items = orderList;
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

