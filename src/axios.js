import axios from 'axios';
import store from './store/index';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
// 添加请求拦截器
instance.interceptors.request.use((config) => {
  if (config.url.includes('passport')) {
    return config;
  }
  return {
    // 先将原有的request的配置展开
    ...config,
    // 在往现在新的配置里添加params
    params: {
      ...config.params,
      appkey: store.state.user.appkey,
    },
  };
}, (error) => Promise.reject(error));

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
},
(error) => Promise.reject(error));

export default instance;
