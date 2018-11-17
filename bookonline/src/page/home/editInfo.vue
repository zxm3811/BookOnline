<template>
    <div>
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" label-position="right" size="medium ">

            <el-form-item label="帐号">
                {{this.formData.accountNo}}
            </el-form-item>
            <el-form-item label="用户名" prop="name">
                <el-row>
                    <el-col :span="8">
                        <el-input v-model="formData.username"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-row>
                    <el-col :span="8">
                        <el-input v-model="formData.email"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-row>
                    <el-col :span="8">
                        <el-input v-model="formData.phone"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="收货地址" prop="addr" required>
                <select-addr @cityData="cityData" :inputAddr="this.formData.reciveAddress.addr"></select-addr>
            </el-form-item>
            <el-form-item label="收件人姓名">
                <el-row>
                    <el-col :span="8">
                        <el-input v-model="formData.reciveAddress.reciverName"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="收件人电话">
                <el-row>
                    <el-col :span="8">
                        <el-input v-model="formData.reciveAddress.reciverPhone"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')">保存</el-button>
            </el-form-item>


        </el-form>

    </div>

</template>

<script>
  import SelectAddr from './selectaddr'
  export default {
    data () {
      var checkUserName = (rule, value, callback) => {
        console.log(value);
        if (!this.formData.username && !value) {
          callback(new Error('请输入用户名'));
        }
      };
      var checkAddr = (rule, value, callback) => {
        if (value.sheng === '' || value.shi === '' || value.qu === '' ||
            value.jiedao === '' || value.mark === '') {
          callback(new Error('请完善地址'));
        }
      };
      var checkPhone = (rule, value, callback) => {
        console.log(value);
        if (!value) {
          callback(new Error('电话号码不可为空'));
        } else if (value.length !== 11) {
          callback(new Error('电话号码不是11位'));
        }
      };
      var checkEmail = (rule, value, callback) => {
        if (!(value.includes('.com') && value.includes('@'))) {
          callback(new Error('邮箱格式错误'));
        }
      };
      return {
        formData: {
          accountNo: 'admin',
          username: 'dd-ke',
          email: '3838@qq.com',
          phone: '11111111111',
          reciveAddress: {
            addr: {
              sheng: '广东省',
              shi: '珠海市',
              qu: '香洲区',
              jiedao: '梅华街道',
              mark: '。。。'
            },
            reciverName: '戴坤恩',
            reciverPhone: '11111111111'
          }
        },
        rules: {
          name: [
            {required: true, validator: checkUserName, trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change']}
          ],
          phone: [
            {required: true, validator: checkPhone, trigger: 'blur'}
          ],
          addr: [
            {validator: checkAddr, trigger: 'blur'}
          ]
        }

      };
    },
    components: {
      SelectAddr
    },
    methods: {
      cityData (data) {
        this.formData.reciveAddress.addr.sheng = data.sheng;
        this.formData.reciveAddress.addr.shi = data.shi;
        this.formData.reciveAddress.addr.qu = data.qu;
        this.formData.reciveAddress.addr.jiedao = data.jiedao;
        this.formData.reciveAddress.addr.mark = data.mark;
        //console.log(this.formData.addr);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        console.log(this.formData);
      }
    }
  }

</script>

<style lang="scss" scoped></style>
