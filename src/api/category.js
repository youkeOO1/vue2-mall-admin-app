import axios from '@/axios';

const getCommodityCategory = (params) => axios.get('/category/all', { params });

export default getCommodityCategory;
