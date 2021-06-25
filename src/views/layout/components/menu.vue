<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-sub-menu  v-for="item in menuRouter" :key="item.name">
        <span slot="title" >
          <a-icon type="mail" />
          <span>{{ item.meta.title }}</span>
          </span>
        <a-menu-item v-for="child in item.children" :key="child.key" >
          {{ child.meta.title }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['collapsed', 'menuRouter']),
  },
};
</script>
