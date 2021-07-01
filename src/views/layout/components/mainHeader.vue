<template>
  <div class="main-header">
    <!-- 左侧导航栏收缩 -->
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <a-breadcrumb v-if="currentRoute.length > 1">
        <a-breadcrumb-item>
          {{ currentRoute[0] ? currentRoute[0].meta.title : ''}}
          </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{name: currentRoute[1].name}">
            {{ currentRoute[1].meta.title }}
            </router-link>
          </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- 用户 -->
    <ul class="user-info">
      <li>
        {{ user.username}}
        <a-icon type="down" />
      </li>
      <li @click="quit">退出</li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      // 开始获取不到当前选中路由，因为router还未实例完
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  computed: {
    ...mapState(['collapsed', 'user']),
  },
  methods: {
    ...mapActions(['changeCollapsed', 'logout']),
    /**
     * 左侧导航栏状态修改
     */
    toggleCollapsed() {
      this.changeCollapsed();
    },
    /**
     * 用户退出登录
     * */
    quit() {
      this.logout();
      this.$router.push('/test');
    },
  },
};
</script>
