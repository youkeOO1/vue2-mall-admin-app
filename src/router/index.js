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
      icon: 'inbox',
      hidden: false,
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
          hidden: false,
        },
        component: () => import('@/views/layout/page/productList.vue'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          icon: 'file-add',
          hidden: false,
        },
        component: () => import('@/views/layout/page/productAdd.vue'),
      },
      {
        path: 'category',
        name: 'ProductCategory',
        meta: {
          title: '类目管理',
          icon: 'project',
          hidden: false,
        },
        component: () => import('@/views/layout/page/productCategory.vue'),
      },
    ],
  },
  {
    path: '/notFound',
    name: 'notFound',
    meta: {
      title: '404',
      hidden: true,
    },
    component: NotFound,
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    component: Home,
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '统计',
          icon: 'number',
          hidden: false,
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
      hidden: true,
    },
    component: Test,
  },
];

const router = new VueRouter({
  routes,
});
let isAddRouter = false;
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    return next('/');
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
        store.dispatch('setMenuRouter', routes.concat(userRouter)).then(() => {
          // 将其配置添加到路由
          router.addRoutes(userRouter);
          // next();
        });
        isAddRouter = true;
      }
      return next();
    }
    return next('/test');
  }

  return next();
});

export default router;
