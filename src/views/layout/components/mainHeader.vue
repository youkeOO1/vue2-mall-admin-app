<template>
  <div class="main-header">
    <!-- 左侧导航栏收缩 -->
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- 用户 -->
    <ul class="user-info">
      <li>
        {{ user.username}}
        <a-icon type="down" />
      </li>
      <li>退出</li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['collapsed', 'user']),
  },
  methods: {
    ...mapActions(['changeCollapsed']),
    toggleCollapsed() {
      this.changeCollapsed();
    },
  },
};
</script>
