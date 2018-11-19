<template>
    <div>
        <el-row>
            <el-select
                    v-model="sheng"
                    @change="choseProvince"
                    placeholder="省级地区">
                <el-option
                        v-for="item in province"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                </el-option>
            </el-select>

            <el-select
                    v-model="shi"
                    @change="choseCity"
                    placeholder="市级地区">
                <el-option
                        v-for="item in shi1"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                </el-option>
            </el-select>


            <el-select
                    v-model="qu"
                    @change="choseBlock"
                    placeholder="区级地区">
                <el-option
                        v-for="item in qu1"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-row>
        <div style="margin-top: 0.2rem">
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-input v-model="jiedao" placeholder="街道" @change="change"></el-input>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="mark" placeholder="详细信息" @change="change"></el-input>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
  import { city } from 'src/assets/cityData'
  export default {
    data () {
      return {
        province:'',
        sheng: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        city:'',
        block:'',
        sheng2: '',
        shi2: '',
        qu2: '',
        jiedao: '',
        mark: ''
      }
    },
    methods:{
      // 加载china地点数据，三级
      getCityData:function(){
        var that = this;
        let data = city;
        that.province = [];
        that.city = [];
        that.block = [];
        // 省市区数据分类
        for (var item in data) {
          if (item.match(/0000$/)) {//省
            that.province.push({id: item, value: data[item], children: []})
          } else if (item.match(/00$/)) {//市
            that.city.push({id: item, value: data[item], children: []})
          } else {//区
            that.block.push({id: item, value: data[item]})
          }
        }
        // 分类市级
        for (var index in that.province) {
          for (var index1 in that.city) {
            if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
              that.province[index].children.push(that.city[index1])
            }
          }
        }
        // 分类区级
        for(var item1 in that.city) {
          for(var item2 in that.block) {
            if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
              that.city[item1].children.push(that.block[item2])
            }
          }
        }
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children;
            this.qu1 =this.province[index2].children[0].children;
          }
        }
        this.sheng = city[e];
        this.shi = '';
        this.qu = '';
        this.change();
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children;
          }
        }
        this.shi = city[e];
        this.change();
      },
      // 选区
      choseBlock:function(e) {
        this.qu = city[e];
        this.change();
      },
      change () {
        let data = {
          sheng: this.sheng,
          shi: this.shi,
          qu: this.qu,
          jiedao: this.jiedao,
          mark: this.mark
        };
        this.$emit("cityData", data);
      }
    },
    created (){
      this.sheng = this.inputAddr.province;
      this.shi = this.inputAddr.city;
      this.qu = this.inputAddr.district;
      this.jiedao = this.inputAddr.street;
      this.mark = this.inputAddr.mark;
    },
    mounted () {
      this.getCityData();
    },
    props: {
      inputAddr: Object
    }
  }
</script>

<style lang="scss" scoped>

</style>
