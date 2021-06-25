<template>
  <div class="home">
    <!-- 左侧导航栏 -->
    <left-menu />
    <div :class="{'main-app':true, 'collapsed':collapsed }">
      <main-header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LeftMenu from './components/menu.vue';
import MainHeader from './components/mainHeader.vue';

export default {
  computed: {
    ...mapState(['collapsed']),
  },
  components: {
    LeftMenu,
    MainHeader,
  },
};
</script>

<style lang="less">
@import url('~@/assets/css/home.less');
</style>>
