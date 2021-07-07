<template>
  <div class="home">
    <!-- 左侧导航栏 绑定一个key值当路由发生变化时会重新渲染该组价 -->
    <left-menu :key="key" />
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
  data() {
    return {
      // 当key值改变左导航栏就会重新渲染
      key: new Date().getTime(),
    };
  },
  watch: {
    /** 路由改变重新渲染左侧的导航栏 */
    $route() {
      this.key = new Date().getTime();
      console.log('路由改变啦');
    },
  },
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
