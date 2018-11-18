<template>
	<div class="put_on_book">
    <div class="head">
      <div class="my_book">上架新书</div>
    </div>
    <div class="body">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
        <el-form-item label="书名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="类型">
            <el-option
              v-for="type in typeOptions"
              :key="type.value"
              :label="type.value"
              :value="type.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ISBN" prop="isbn">
          <el-input v-model="form.isbn"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publishHouse">
          <el-input v-model="form.publishHouse"></el-input>
        </el-form-item>
        <el-form-item label="出版时间" required>
          <el-form-item prop="publishDate">
            <el-date-picker 
              type="month" 
              placeholder="选择时间" 
              v-model="form.publishDate" 
              format="yyyy-MM"
              value-format="yyyy-MM">
            </el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="书籍封面" prop="cover">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="装帧" prop="binding">
          <el-select v-model="form.binding" placeholder="装帧">
            <el-option
              v-for="binding in bindingOptions"
              :key="binding.value"
              :label="binding.value"
              :value="binding.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品相" prop="appearance">
          <el-select v-model="form.appearance" placeholder="品相">
            <el-option
              v-for="appearance in appearanceOptions"
              :key="appearance.value"
              :label="appearance.value"
              :value="appearance.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开本" prop="format">
          <el-select v-model="form.format" placeholder="开本">
            <el-option
              v-for="format in formatOptions"
              :key="format.value"
              :label="format.value"
              :value="format.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定价" prop="fixedPrice">
          <el-input v-model.number="form.fixedPrice" type="number"></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="sellingPrice">
          <el-input v-model.number="form.sellingPrice"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="stock">
          <el-input v-model.number="form.stock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即上架</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
	</div>
</template>

<script type="text/javascript">
import { AccountService } from "src/service/account";

Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};

export default {
  data() {
    var checkFixedPrice = (rule, value, callback) => {
      if (value == null || value == undefined) {
        return callback(new Error('请输入定价'));
      }
      setTimeout(() => {
        if (typeof(value) != "number") {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 0) {
            callback(new Error('不能低于0元'));
          } else {
            callback();
          }
        }
      }, 100);
    };
    var checkSellingPrice = (rule, value, callback) => {
      if (value == null || value == undefined) {
        return callback(new Error('请输入售价'));
      }
      setTimeout(() => {
        if (typeof(value) != "number") {
          callback(new Error('请输入数字值'));
        } else {
          if (value > this.form.fixedPrice) {
            callback(new Error('不能高于定价'));
          } else if (value < 0) {
            callback(new Error('不能低于0元'));
          } else {
            callback();
          }
        }
      }, 100);
    };
    var checkStock = (rule, value, callback) => {
      if (value == null || value == undefined) {
        return callback(new Error('请输入数量'));
      }
      setTimeout(() => {
        if (typeof(value) != "number") {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 1) {
            callback(new Error('不能少于1件'));
          } else {
            callback();
          }
        }
      }, 100);
    };
    var checkCover = (rule, value, callback) => {
      if (!this.form.cover) {
        return callback(new Error('请上传书籍封面'));
      } else {
        callback();
      }
    };
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
      rules: {
        name: [
          { type: 'string', required: true, message: '请输入书名', trigger: 'blur' },
        ],
        author: [
          { type: 'string', required: true, message: '请输入作者', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        isbn: [
          { type: 'string', required: true, message: '请输入ISBN', trigger: 'blur' }
        ],
        publishHouse: [
          { type: 'string', required: true, message: '请输入出版社', trigger: 'blur' }
        ],
        publishDate: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        cover: [
          { validator: checkCover, trigger: 'blur' }
        ],
        binding: [
          { required: true, message: '请选择装帧', trigger: 'change' }
        ],
        appearance: [
          { required: true, message: '请选择品相', trigger: 'change' }
        ],
        format: [
          { required: true, message: '请选择开本', trigger: 'change' }
        ],
        fixedPrice: [
          { validator: checkFixedPrice, trigger: 'blur' }
        ],
        sellingPrice: [
          { validator: checkSellingPrice, trigger: 'blur' }
        ],
        stock: [
          { validator: checkStock, trigger: 'blur' }
        ]
      }
    };
  },
  
  methods: {
    async onSubmit(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.form.sale = (this.form.sellingPrice / this.form.fixedPrice * 10).toFixed(1);
          let userInfo = AccountService.getUserInfo();
          this.form.uid = userInfo.id;
          this.form.address = userInfo.receiveAddress.address;
          this.form.putOnDate = new Date().format("yyyy-MM-dd");
          console.log(this.form)
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
        } else {
          return false;
        }
      });
    },

    cancle() {
      this.$confirm('确定取消书籍上架？').then(() => {
        this.$router.push("/page/userCenter/myBooks");
      }).catch(() => {
        return;
      });
    },

    handleSuccess(response, file) {
      if(response) {
        this.form.cover = file;
      }
    },

    beforeRemove(file) {
      this.form.cover = null;
      return true;
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
