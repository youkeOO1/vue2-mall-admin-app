<template>
<div class="lo-warp">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback  prop="email">
        <a-input v-model="ruleForm.email" placeholder="请输入邮箱" />
      </a-form-model-item>
      <a-form-model-item has-feedback  prop="pass">
        <a-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="请输入密码" />
      </a-form-model-item>
      <a-form-model-item has-feedback  prop="code" class="code-warp">
        <a-input
        v-model="ruleForm.code"
        type="text"
        autocomplete="off"
        class="code"
        placeholder="请输入验证码" />
        <a-button @click="getCode">获取验证码</a-button>
      </a-form-model-item>
      <a-form-model-item has-feedback prop="userName">
        <a-input v-model="ruleForm.userName" placeholder="请输入用户名" />
      </a-form-model-item>
      <a-form-model-item has-feedback  prop="role">
        <a-input v-model="ruleForm.role" placeholder="请输入customer或者admin" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          注册
        </a-button>
      </a-form-model-item>
    </a-form-model>
</div>
</template>
<script>
import api from '../../../api/ajax';

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
    const checkCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'));
      }
      return callback();
    };
    const checkUserName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入用户名'));
      }
      return callback();
    };
    const checkRole = (rule, value, callback) => {
      if (value === 'customer' || value === 'admin') {
        return callback();
      }
      return callback(new Error('请输入用户角色'));
    };
    return {
      ruleForm: {
        email: '',
        pass: '',
        code: '',
        userName: '',
        role: '',
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        pass: [{ validator: checkPassword, trigger: 'change' }],
        code: [{ validator: checkCode, trigger: 'change' }],
        userName: [{ validator: checkUserName, trigger: 'change' }],
        role: [{ validator: checkRole, trigger: 'change' }],
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
          const {
            email, pass, code, userName, role,
          } = this.ruleForm;
          api.logon(email, pass, code, userName, role);
          this.$message.success('注册成功');
        } else {
          this.$message.error('填写信息失败');
          return false;
        }
      });
    },
    getCode() {
      if (this.ruleForm.email) {
        api.getCode(this.ruleForm.email);
        this.$message.success('发送成功');
      } else {
        this.$message.error('邮箱为空');
      }
    },
  },
};
</script>
<style >

</style>
