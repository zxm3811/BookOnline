<template>
	<div class="put_on_book">
    <div class="body">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="书籍封面">
          <el-upload
            action="http://114.115.139.78:8080/test/uploadFile/"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            :limit="1"
            name="file">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即上架</el-button>
          <el-button>取消</el-button>
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
    onSubmit() {
      console.log(this.form);
    },

    handleSuccess(response, file) {
      console.log(response)
      console.log(file)
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
