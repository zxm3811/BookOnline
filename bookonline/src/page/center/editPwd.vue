<template>
    <div>
        <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px" size="medium">
            <el-form-item label="原密码" prop="oldPass">
                <el-row>
                    <el-col :span="8">
                        <el-input type="password" v-model="pwdForm.oldPass" autocomplete="off"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
                <el-row>
                    <el-col :span="8">
                <el-input type="password" v-model="pwdForm.pass" autocomplete="off"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-row>
                    <el-col :span="8">
                <el-input type="password" v-model="pwdForm.checkPass" autocomplete="off"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('pwdForm')" plain>修改</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import {AccountService} from "../../service/account";

    export default {
      data () {
        var validatePass0 = (rule, value, callback) => {
          let item = AccountService.getUserInfo();
          if (value === '') {
            callback(new Error('请输入原密码'));
          }
          else if (value !== item.password) {
            callback(new Error('原密码错误'));
          }
          else callback();
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入新密码'));
          } else {
            if (this.pwdForm.checkPass !== '') {
              this.$refs.pwdForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.pwdForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          pwdForm: {
            oldPass: '',
            pass: '',
            checkPass: ''
          },
          rules: {
            oldPass: [
              {required:true, validator: validatePass0, trigger: 'blur'}
            ],
            pass: [
              {required:true, validator: validatePass, trigger: 'blur'}
            ],
            checkPass: [
              {required:true, validator: validatePass2, trigger: 'blur'}
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
          AccountService.setUserPassword(this.pwdForm.pass);
          console.log(AccountService.getUserInfo());
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
