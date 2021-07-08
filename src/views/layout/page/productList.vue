<template>
  <div class="product-list">
    <div class="product-list-top">
    <search :data="categoryList" @submit="searchSubmit"/>
    <a-button class="productList-add">
      <router-link :to="{name: 'ProductAdd'}">添加商品</router-link>
    </a-button>
    </div>
    <product-table :data= "productlist" :page="pages"
                                        @change="pageChange"
                                        @editProduct= 'editProduct'
                                        @delProduct = 'delProduct'
                                        />
  </div>
</template>
<script>
import Search from '@/components/search.vue';
import productTable from '@/components/productTable.vue';
import getCommodityCategory from '@/api/category';
import api from '@/api/product';

export default {
  data() {
    return {
      // 商品类目列表
      categoryList: [],
      // 商品类目对象
      categoryObj: {},
      // 搜索框搜索内容的对象 {searchWord，category}
      searchObj: {},
      // 页码对象
      pages: {
        // 获取产品的页码
        current: 1,
        // 获取产品每一页的条数
        pageSize: 10,
        // 数据总数
        total: 1,
        hideOnSinglePage: true,
        // showSizeChanger: true,
      },
      // 商品列表
      productlist: [],
    };
  },
  components: {
    Search,
    productTable,
  },
  methods: {
    /**
     * 搜索商品
     */
    searchSubmit(data) {
      this.searchObj = data;
      this.getProductsAll();
    },
    /**
     * 按照页码获取商品
     */
    async getProductsAll() {
      await api.list({
        page: this.pages.current,
        size: this.pages.pageSize,
        ...this.searchObj,
      }).then((res) => {
        console.log(res, '按照页码获取的数据');
        this.pages.total = res.total;
        this.productlist = res.data.map((ele) => ({
          ...ele,
          categoryName: this.categoryObj[ele.category].name ? this.categoryObj[ele.category].name : '未添加',
        }));
      });
    },
    /**
     * 当前选中的页码
     */
    pageChange(res) {
      this.pages.current = res.current;
      this.getProductsAll();
    },
    /**
     * 跳转编辑商品页面
     */
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    /**
     * 删除商品
     */
    delProduct(record) {
      const self = this;
      this.$confirm({
        title: 'Do you Want to delete these items?',
        content: () => <div style="color:red;">{`确认删除${record.title}的商品`}</div>,
        onOk() {
          console.log('OK');
          api.del(record.id);
          self.getProductsAll();
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
  },
  /**
   * 获取数据
   */
  async created() {
    await getCommodityCategory().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((element) => {
        this.categoryObj[element.id] = element;
      });
    });
    this.getProductsAll();
  },
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/productList.less');
</style>
