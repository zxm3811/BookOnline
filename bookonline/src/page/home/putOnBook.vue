<template>
	<div class="put_on_book">
    <div class="head">
      <div class="my_book">上架新书</div>
    </div>
    <div class="body">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="书名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="类型">
            <el-option
              v-for="type in typeOptions"
              :key="type.value"
              :label="type.value"
              :value="type.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ISBN">
          <el-input v-model="form.isbn"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.publishHouse"></el-input>
        </el-form-item>
        <el-form-item label="出版时间">
          <el-date-picker 
            type="month" 
            placeholder="选择时间" 
            v-model="form.publishDate" 
            format="yyyy-MM"
            value-format="yyyy-MM">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="书籍封面">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="装帧">
          <el-select v-model="form.binding" placeholder="装帧">
            <el-option
              v-for="binding in bindingOptions"
              :key="binding.value"
              :label="binding.value"
              :value="binding.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品相">
          <el-select v-model="form.appearance" placeholder="品相">
            <el-option
              v-for="appearance in appearanceOptions"
              :key="appearance.value"
              :label="appearance.value"
              :value="appearance.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开本">
          <el-select v-model="form.format" placeholder="开本">
            <el-option
              v-for="format in formatOptions"
              :key="format.value"
              :label="format.value"
              :value="format.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定价">
          <el-input v-model="form.fixedPrice"></el-input>
        </el-form-item>
        <el-form-item label="售价">
          <el-input v-model="form.sellingPrice"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即上架</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
	</div>
</template>

<script type="text/javascript">
import { AccountService } from "src/service/account";

export default {
  data() {
    return {
      form: {},
      typeOptions: [
        { value: "线装古籍 / 民国旧书" }, { value: "期刊 / 报纸 / 外文原版" }, { value: "国学古籍 / 收藏鉴赏" },
        { value: "小说 / 文学 / 语言文字" }, { value: "历史 / 地理 / 艺术" }, { value: "政治 / 法律 / 军事" },
        { value: "哲学 / 心理 / 宗教" }, { value: "经济 / 社科 / 综合" }, { value: "童书 / 生活 / 体育" },
        { value: "工程技术 / 互联网" }, { value: "自然科学 / 医药卫生" }, { value: "教材 / 教辅 / 考试" },
        { value: "红色文献 / 签名本" }],
      bindingOptions: [
        { value: "精装" }, { value: "软精装" }, { value: "平装" }],
      formatOptions: [
        { value: "大32" }, { value: "32" }, { value: "大16" }, { value: "16" }, { value: "其他" }],
      appearanceOptions: [
        { value: "全新" }, { value: "九五品" }, { value: "九品" }, { value: "八五品" }, { value: "八品" },
        { value: "七五品" }, { value: "七品" }, { value: "六五品" }, { value: "六品" }, { value: "其他" }],
    };
  },
  
  async mounted() {
  },

  methods: {
    async onSubmit() {
      console.log(this.form);
      let response = await AccountService.putOnMyBook(this.form);
      if(response) {
        let that = this;
        var time = 3;
        var interval = setInterval(function() {
          that.$toast.text("上架成功，" + time + "秒后将跳转到“我的书籍”页面");
          time -= 1;
          if(time === 0){
            clearInterval(interval);
            setTimeout(() => {
              that.$router.push("/page/userCenter/myBooks");
            }, 1000);
          }
        }, 1010);
      } else {
        this.$toast.text(response.message);
      }
    },

    cancle() {
      this.$confirm('确定取消书籍上架？').then(() => {
        this.$router.push("/page/userCenter/myBooks");
      }).catch(() => {
        return;
      })
    },

    handleSuccess(response, file) {
      if(response) {
        this.form.file = file;
      }
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
};
</script>

<style lang="scss" scoped>
.put_on_book {
  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .my_book {
      font-size: 0.2rem;
      font-weight: bold;
    }
  }
}
</style>
