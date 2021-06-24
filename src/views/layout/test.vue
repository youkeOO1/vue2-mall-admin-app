<template>
  <div class="login-warp">
    <a-tabs    @change="callback"  v-model="key">
      <a-tab-pane key="1" tab="登录">
        <login @show-updata-pass="handelClick" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="注册" force-render class="option-hide">
        <logon />
      </a-tab-pane>
      <a-tab-pane key="3" tab="忘记密码" class="option-hide">
        <updata-pass></updata-pass>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import login from './components/login.vue';
import logon from './components/logon.vue';
import updataPass from './components/updataPass.vue';

export default {
  data() {
    return {
      key: '1',
    };
  },
  components: {
    login,
    logon,
    updataPass,
  },
  methods: {
    callback(key) {
      this.key = key;
    },
    handelClick(key) {
      this.key = key.toString();
    },
  },
};
</script>

<style scoped>
.login-warp{
  width: 400px;
  margin: 100px auto;
  background: #ccc;
}

</style>
<style>
.ant-tabs-nav-scroll {
  display: flex ;
  justify-content: center;
}
.ant-tabs-nav .ant-tabs-tab:nth-of-type(3), .ant-tabs-nav .ant-tabs-tab:nth-of-type(2){
  display: none;
}
.ant-form .ant-col-14 {
  width: 100%;
}
.ant-form .ant-col-offset-4{
  margin-left: 0;
}
.ant-form .ant-col-offset-4 button {
  width: 100%;
}
.ant-form-item-control .code{
  display: inline-block;
  width: 68%;
  margin-right: 10px;
}
.code-warp .ant-form-item-control .ant-form-item-children .ant-form-item-children-icon{
  right: 112px;
}
</style>
<style lang="less">
@import url("../../assets/css/login.less");
</style>
