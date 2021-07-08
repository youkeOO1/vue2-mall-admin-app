import axios from '@/axios';

export default {
  /**
   * 查询产品列表
   * @param {*} params 请求参数
   * {appkey:String, page:Number:, size:Number, searchWord: String, category: Number}
   * @returns
   */
  list(params) {
    return axios.get('/products/all', { params });
  },
  /**
   * 删除某一个商品
   * @param {*} id
   * @returns
   */
  del(id) {
    return axios.delete(`/products/${id}`);
  },
  /**
   * 添加商品
   * @param {*} params
   * @returns
   */
  add(params) {
    return axios.post('products/add', params);
  },
  /**
   * 查新商品详情
   * @param {*} id
   * @returns
   */
  select(id) {
    return axios.get(`/products/${id}`);
  },
  edit(params) {
    return axios.put('/products/edit', params);
  },
};
