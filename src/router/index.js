import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/layout/Home.vue';
import Test from '../views/layout/test.vue';
import NotFound from '../views/layout/notFound.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.matched.length === 0) {
    return next('/notFound');
  }

  if (to.path !== '/test') {
    const {
      username, appkey, role, email,
    } = store.state.user;
    if (!username && !appkey && !role && !email) {
      return next('/test');
    }
    return next();
  }

  return next();
});

export default router;
