<template>
<!-- 待测试的登录页面 -->
  <div class="login-warp">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="登录">
        <login />
      </a-tab-pane>
      <a-tab-pane key="2" tab="注册" force-render>
        <logon />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import login from './login.vue';
import logon from './logon.vue';

export default {
  data() {
    return {};
  },
  components: {
    login,
    logon,
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  },
};
</script>

<style scoped>
.login-warp{
  width: 500px;
  margin: 0 auto;
  background: #ccc;
}

</style>
<style>
.ant-tabs-nav-scroll {
  display: flex ;
  justify-content: center;
}
</style>
