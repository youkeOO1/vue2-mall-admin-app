import Vue from 'vue';
// 注意当前我使用最新VCharts与charts无版本的不兼容，我是将charts降级到4.8.0的版本才会兼容
import VCharts from 'v-charts-v2';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';
import './assets/css/reset.less';

Vue.use(VCharts);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
