import axios from '@/axios';

export default {
  /**
   * 查询产品列表
   * @param {*} params 请求参数 {appkey, page, size, searchWord, category}
   * @returns
   */
  list(params) {
    return axios.get('/products/all', { params });
  },
};
