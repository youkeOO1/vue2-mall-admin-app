<template>
<div class="search">
    <a-form-model layout="inline" :model="searchFrom" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item label="检索关键字">
      <a-input v-model="searchFrom.searchWord" placeholder="请输入关键字"> </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <a-select
        show-search
        placeholder="请选择商品类目"
        style="width: 200px"
        @change="handleChange"
        allowClear
      >
        <a-select-option v-for="item in data" :key="item.id" :value="item.id">
         {{ item.name}}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit">
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
</div>
</template>
<script>
export default {
  data() {
    return {
      searchFrom: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  methods: {
    handleSubmit() {
      this.$emit('submit', this.searchFrom);
    },
    handleChange(val) {
      // 选项中的value值是id值
      this.searchFrom.category = val;
    },
  },
};
</script>
<style scoped>
.search {
  /* padding: 20px; */
}
</style>
