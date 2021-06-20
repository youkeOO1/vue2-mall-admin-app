<template>
<div class="login">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <!-- email -->
      <a-form-model-item has-feedback label="邮箱" prop="email" >
        <a-input v-model="ruleForm.email" type="email" autocomplete="off" placeholder="请输入邮箱" >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-model-item>
      <!-- passowrd -->
      <a-form-model-item has-feedback label="密码" prop="pass">
        <a-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="请输入密码" >
          <a-icon slot="prefix" type="lock" />
          <!-- <a-icon type="lock" /> -->
        </a-input>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          登录
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
</div>
</template>
<script>
import api from '../../api/ajax';

export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      const isMail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (!value) {
        return callback(new Error('邮箱错误'));
      }
      if (isMail.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱错误'));
    };
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码错误'));
      }
      return callback();
    };
    return {
      ruleForm: {
        pass: '',
        email: '',
      },
      rules: {
        // 校验规则 触发时机 是否必选
        email: [{ validator: checkEmail, trigger: 'change', required: 'true' }],
        pass: [{ validator: checkPassword, trigger: 'change', required: 'true' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.ruleForm.email, this.ruleForm.pass).then((res) => {
            console.log(res);
            this.$router.push('/');
          }).catch((error) => {
            this.$message.error(error);
          });
        } else {
          this.$message.error('错误');
          return false;
        }
      });
    },
    resetForm(formName) {
      api.logon('1921380844@qq.com', '123456789', '555888', 'root', 'admin').then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
      this.$refs[formName].resetFields();
    },
  },

};
</script>
<style lang="less">
@import url("../../assets/css/login.less");
</style>
