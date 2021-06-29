<template>
  <div>
    <search :data="categoryList" @submit="searchSubmit"/>
    <product-table :data= "productlist" :page="pages" @change="pageChange"/>
  </div>
</template>
<script>
import Search from '@/components/search.vue';
import productTable from '@/components/productTable.vue';
import getCommodityCategory from '@/api/category';
import getProducts from '@/api/product';

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
    searchSubmit(data) {
      this.searchObj = data;
      this.getProductsAll();
    },
    async getProductsAll() {
      await getProducts.list({
        page: this.pages.current,
        size: this.pages.pageSize,
        ...this.searchObj,
      }).then((res) => {
        this.pages.total = res.total;
        this.productlist = res.data.map((ele) => ({
          ...ele,
          categoryName: this.categoryObj[ele.category].name,
        }));
      });
    },
    pageChange(res) {
      this.pages.current = res.current;
      this.getProductsAll();
    },
  },
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
