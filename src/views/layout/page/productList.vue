<template>
  <div>
    <search :data="categoryList" @submit="searchSubmit"/>
  </div>
</template>
<script>
import Search from '@/components/search.vue';
import getCommodityCategory from '@/api/category';
// import axios from '@/axios';

export default {
  data() {
    return {
      categoryList: [],
    };
  },
  components: {
    Search,
  },
  methods: {
    searchSubmit(data) {
      console.log(data);
    },
  },
  async created() {
    await getCommodityCategory().then((res) => {
      this.categoryList = res.data;
    });
    // await axios.get('/category/all', {
    //   params: {
    //     appkey: this.$store.state.user.appkey,
    //     page: 1,
    //     size: 100,
    //   },
    // });
  },
};
</script>
