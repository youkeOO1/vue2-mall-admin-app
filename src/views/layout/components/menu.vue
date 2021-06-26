<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[
      $router.currentRoute.matched[1] ? $router.currentRoute.matched[1].name : ''
      ]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuRouter" >
        <a-sub-menu v-if="!item.meta.hidden" :key="item.name">
          <span slot="title" >
            <a-icon :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
            </span>
          <a-menu-item v-for="child in item.children" :key="child.name" >
            <router-link :to="{name: child.name}">
              <a-icon :type="child.meta.icon" />
              {{ child.meta.title}}
            </router-link>
          </a-menu-item>
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
  },
  mounted() {
    window.router = this.$router;
  },
};
</script>
