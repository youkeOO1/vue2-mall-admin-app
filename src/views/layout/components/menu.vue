<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[defaultSelectedKeys]"
      :default-open-keys="[defaultOpenKeys]"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuRouter">
        <a-sub-menu v-if="!item.meta.hidden" :key="item.name">
          <span slot="title">
            <a-icon :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </span>
          <template v-for="child in item.children">
            <a-menu-item v-if="!child.meta.hidden"  :key="child.name">
              <router-link :to="{ name: child.name }">
                <a-icon :type="child.meta.icon" />
                {{ child.meta.title }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['collapsed', 'menuRouter']),
    /**
     * 默认选中的路由
     */
    defaultSelectedKeys: {
      get() {
        return this.$router.currentRoute.matched[1] ? this.$router.currentRoute.matched[1].name : '';
      },
    },
    /**
     * 初始打开的路由
     */
    defaultOpenKeys: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
  mounted() {
    console.log(this.$router.currentRoute.matched, '当前选中的路由');
  },
};
</script>
