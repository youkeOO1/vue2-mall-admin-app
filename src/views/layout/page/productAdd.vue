<template>
  <div class="product-add">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-detail v-if="current === 0" @next="next" :form="form"></basic-detail>
      <sale-detail v-if="current === 1" :form="form" @next="next" @prev="prev"></sale-detail>
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
        images: [],
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
      id: null,
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
        // 判断是否为编辑上平数据
        if (this.id) {
          console.log(this.form, '修改后的商品数据');
          api.edit(this.form).then((e) => {
            console.log(e, '修改后的商品信息');
            this.$message.success('修改成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        } else {
          // 添加商品
          api.add(this.form).then((a) => {
            console.log(a, '提交成功后的返回值');
            this.$message.success('添加商品成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        }
      } else {
        this.current += 1;
      }
    },
    /** 上一步 */
    prev() {
      this.current -= 1;
    },
  },
  created() {
    // 当为编辑数据时，URL中会夹带商品id，当添加商品时URL中并没有夹带商品id
    // 当为编辑数据时，让数据回填
    this.id = this.$route.params.id;
    if (this.id) {
      api.select(this.id).then((res) => {
        console.log(res, 'select');
        this.form = res;
      });
    }
  },
};
</script>

<style lang="less">
.product-add {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }
  .sale-detail,
  .base-detail {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .next-btn {
    text-align: center;
    button {
      margin: 0 50px;
    }
  }
}
</style>
