<template>
  <div class="product-add">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-detail v-if="current === 0" @next="next"></basic-detail>
      <sale-detail v-if="current === 1"></sale-detail>
    </div>
  </div>
</template>
<script>
import BasicDetail from '@/components/basicDetail.vue';
import SaleDetail from '@/components/saleDeatail.vue';

export default {
  data() {
    return {
      /** 步骤条的进度 */
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  components: {
    BasicDetail,
    SaleDetail,
  },
  methods: {
    /** 下一步 */
    next(res) {
      console.log(res, 'emit');
      this.current += 1;
    },
    /** 上一步 */
    prev() {
      this.current -= 1;
    },
  },
};
</script>

<style lang="less" scoped>
.product-add {
  .product-steps{
    width: 50%;
    margin: 10px auto;
    background: #fff;
  }
}
</style>
