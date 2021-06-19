<template>
  <div class="home">
    <!-- 左侧导航栏 -->
    <left-menu />
    <div :class="{'main-app':true, 'collapsed':$store.state.collapsed }">
      <main-header />
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import MainHeader from './components/mainHeader.vue';

export default {
  components: {
    LeftMenu,
    MainHeader,
  },
};
</script>

<style lang="less">
@import url('~@/assets/css/home.less');
</style>>
