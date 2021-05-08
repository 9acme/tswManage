import Vue from 'vue';
//导入vuex
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
// import permissions from './modules/permission-local';
import permissions from './modules/permission-online';

//安装vuex
Vue.use(Vuex);

//导出vuex中store对象
export default new Vuex.Store({
  modules: {
    user,
    permissions
  },
  getters
});
