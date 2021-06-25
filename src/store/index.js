import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getCookie, removeCookie } from '../util/cookie/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 首页左侧菜单的显示与隐藏 false：隐藏 true：显示
    collapsed: false,
    user: getCookie(),
    menuRouter: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, obj) {
      state.user = obj;
    },
    logout(state) {
      state.user = {
        email: '',
        username: '',
        appkey: '',
        role: '',
      };
    },
    setMenuRouter(state, routers) {
      state.menuRouter = routers;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setCookieInfo({ commit }, obj) {
      commit('setUserInfo', obj);
      setCookie(obj);
    },
    logout({ commit }) {
      commit('logout');
      removeCookie();
    },
    setMenuRouter({ commit }, routers) {
      commit('setMenuRouter', routers);
    },
  },
  modules: {},
});
