<template>
  <div class="product-add">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-detail v-if="current === 0" @next="next" :form='form'></basic-detail>
      <sale-detail v-if="current === 1" :form='form' @next="next" @prev="prev"></sale-detail>
    </div>
  </div>
</template>
<script>
import BasicDetail from '@/components/basicDetail.vue';
import SaleDetail from '@/components/saleDeatail.vue';
import api from '@/api/product';

export default {
  data() {
    return {
      form: {
        title: '',
        category: '',
        c_items: [],
        desc: '',
        tags: [],
        price: '',
        price_off: '',
        inventory: '',
        unit: '',
        imgs: [],
      },
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
      console.log(res, this.form, 'emit');
      if (this.current === 1) {
        api.add(this.form).then(() => {
          this.$message.success('添加商品成功');
          this.$router.push({
            name: 'ProductList',
          });
        });
        console.log(api);
      } else {
        this.current += 1;
      }
    },
    /** 上一步 */
    prev() {
      this.current -= 1;
    },
  },
};
</script>

<style lang="less" >
.product-add {
  .product-steps{
    width: 50%;
    margin: 20px auto;
  }
  .sale-detail, .base-detail{
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px
  }
  .next-btn{
    text-align: center;
    button {
      margin: 0 50px;
    }
  }
}
</style>
