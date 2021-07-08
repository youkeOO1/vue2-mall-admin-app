<template>
  <section class="base-detail">
    <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" >
      <a-form-model-item label="标题" required prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目"  required  prop="category">
        <a-select v-model="form.category" @change="changeCategory">
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请选择子类目" prop="c_items">
          <a-select-option v-for="c in c_itemsList" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" required  prop="tags">
        <a-select
          mode="tags"
          placeholder="Please select"
          :default-value="['包邮 最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option  value="包邮，最晚次日达">
            包邮，最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item  class="next-btn" :wrapperCol="{span: 24}">
        <a-button type="primary" @click="next">
          下一步
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </section>
</template>
<script>
import getCommodityCategory from '@/api/category';

export default {
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 13 },
      categoryList: [],
      c_itemsList: [],
    };
  },
  props: ['form'],
  methods: {
    /** 下一步 表单验证 */
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
    /** 获取商品子类目 */
    changeCategory(value) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === value) {
          this.c_itemsList = this.categoryList[i].c_items;
        }
      }
    },
  },
  /** 获取商品类目 */
  created() {
    getCommodityCategory().then((res) => {
      this.categoryList = res.data;
    });
  },
};
</script>
