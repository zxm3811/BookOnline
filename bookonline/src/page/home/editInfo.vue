<template>
    <div>
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" label-position="right" size="medium ">

            <el-form-item label="帐号">
                {{this.formData.account}}
            </el-form-item>
            <el-form-item label="用户名" prop="name">
                <el-row>
                    <el-col :span="8">
                        <el-input v-model="formData.name"></el-input>
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
                <select-addr @cityData="cityData" :inputAddr="this.formData.addr"></select-addr>
            </el-form-item>
            <el-form-item label="收件人姓名" prop="receiverName">
                <el-row>
                    <el-col :span="8">
                        <el-input v-model="formData.receiverName"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="收件人电话" prop="receiverPhone">
                <el-row>
                    <el-col :span="8">
                        <el-input v-model="formData.receiverPhone"></el-input>
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
  import {AccountService} from "../../service/account";

  export default {
    data () {
      var checkUserName = (rule, value, callback) => {
        if (!this.formData.username && !value) {
          callback(new Error('请输入用户名'));
        }
      };
      var checkReceiverName = (rule, value, callback) => {
        if (!this.formData.receiverName && !value) {
          callback(new Error('请输入收件人'));
        }
      };
      var checkReceiverPhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error('电话号码不可为空'));
        } else if (value.length !== 11) {
          callback(new Error('电话号码不是11位'));
        }
      };
      var checkAddr = (rule, value, callback) => {
        if (value.province === '' || value.city === '' ||
            value.district === '' || value.street === '' ||
            value.mark === '') {
          callback(new Error('请完善地址信息'));
        }

      };
      var checkPhone = (rule, value, callback) => {
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
          account: '',
          name: '',
          email: '',
          phone: '',
          addr: {
            province: '',
            city: '',
            district: '',
            street: '',
            mark: ''
          },
          receiverName: '',
          receiverPhone: ''
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
          ],
          receiverName: [
            {required: true, validator: checkReceiverName, trigger: 'blur'}
          ],
          receiverPhone: [
            {required: true, validator: checkReceiverPhone, trigger: 'blur'}
          ],
        }

      };
    },
    components: {
      SelectAddr
    },
    created () {
      this.initData();
    },
    methods: {
      cityData (data) {
        this.formData.addr.province = data.sheng;
        this.formData.addr.city = data.shi;
        this.formData.addr.district = data.qu;
        this.formData.addr.street = data.jiedao;
        this.formData.addr.mark = data.mark;
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
      },
      initData() {
        let items = AccountService.getUserInfo();
        this.formData.account = items.account;
        this.formData.name = items.name;
        this.formData.email = items.email;
        this.formData.phone = items.phone;
        let address = items.receiveAddress.address.split(' ');
        this.formData.addr.province = address[0];
        this.formData.addr.city = address[1];
        this.formData.addr.district = address[2];
        this.formData.addr.street = address[3];
        this.formData.addr.mark = address[4];
        this.formData.receiverName = items.receiveAddress.receiverName;
        this.formData.receiverPhone = items.receiveAddress.receiverPhone;
      }
    }
  }

</script>

<style lang="scss" scoped></style>
