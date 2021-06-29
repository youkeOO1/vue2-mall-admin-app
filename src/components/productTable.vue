<template>
  <a-table :columns="columns" :data-source="tableList" :pagination="page" @change="change">
    <div slot="operation">
      <a-button>编辑</a-button>
      <a-button>删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '商品标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '商品描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '商品类目',
    dataIndex: 'categoryName',
    key: 'categoryName ',
    ellipsis: true,
  },
  {
    title: '商品价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '商品折扣价',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '商品标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '商品库存量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '商品上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    scopedSlots: {
      customRender(text, record) {
        return record.status === 0 ? '下架' : '上架';
      },
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  props: ['data', 'page'],
  data() {
    return {
      columns,
    };
  },
  computed: {
    tableList() {
      return this.data.map((ele) => ({
        ...ele,
        key: ele.id,
      }));
    },
  },
  methods: {
    change(pagination) {
      this.$emit('change', pagination);
    },
  },
};
</script>
