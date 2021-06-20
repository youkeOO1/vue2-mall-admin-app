<template>
<!-- 待测试的登录页面 -->
  <div class="login">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="登录">
        <login />
      </a-tab-pane>
      <a-tab-pane key="2" tab="注册" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import login from './login.vue';

export default {
  data() {
    return {};
  },
  components: {
    login,
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  },
};
</script>

<style scoped>
.login{
  width: 500px;
}
</style>
