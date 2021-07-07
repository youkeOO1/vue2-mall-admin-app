import axios from '@/axios';
/**
 * 查询商品类目列表
 * @param {*} params
 * @returns
 */
const getCommodityCategory = (params) => axios.get('/category/all', { params });

export default getCommodityCategory;
