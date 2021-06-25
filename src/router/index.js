import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/layout/Home.vue';
import Test from '../views/layout/test.vue';
import NotFound from '../views/layout/notFound.vue';
import index from '../views/layout/page/index.vue';
import store from '../store';
import getMenuRouter from '../util/permission/permission';

Vue.use(VueRouter);

const asyncRouter = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
        },
        component: () => import('@/views/layout/page/productList.vue'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
        },
        component: () => import('@/views/layout/page/productAdd.vue'),
      },
      {
        path: 'category',
        name: 'ProductCategory',
        meta: {
          title: '类目管理',
        },
        component: () => import('@/views/layout/page/productCategory.vue'),
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
    },
    component: Home,
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '统计',
        },
        component: index,
      },
    ],
  },
  {
    path: '/test',
    name: 'Test',
    meta: {
      title: '登录',
    },
    component: Test,
  },
  {
    path: '/notFound',
    name: 'notFound',
    meta: {
      title: '404',
    },
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});
let isAddRouter = false;
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.matched.length === 0) {
    return next('/notFound');
  }

  if (to.path !== '/test') {
    const {
      username, appkey, role, email,
    } = store.state.user;
    if (username && appkey && role && email) {
      // 防止一直写入导致栈溢出
      if (!isAddRouter) {
        // 获取过滤好的路由配置
        const userRouter = getMenuRouter(role, asyncRouter);
        // 将其配置添加到路由
        router.addRoutes(userRouter);
        store.dispatch('setMenuRouter', routes.concat(userRouter));
        isAddRouter = true;
      }
      return next();
    }
    return next('/test');
  }

  return next();
});

export default router;
