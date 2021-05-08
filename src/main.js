import Vue from 'vue';
import ElementUI from 'element-ui'; // 导入element-ui
import 'element-ui/lib/theme-chalk/index.css'; // 导入element-ui的样式文件
import router from './router/index'; // 导入路由对象
import store from './store/index'; // 导入vuex中的store对象
import './mock/auth'; // 导入Mock
import './permission'; // 导入路由守卫
import './styles/index.scss'; // 导入全局样式
import App from './App.vue';

//自动全局安装指令
const directives = require.context('./directives', false, /\.js$/);
directives.keys().forEach(key => {
  //引入的具体模块
  let instruct = directives(key);
  let name = key.replace(/\.\/(.{1,}).js$/g, '$1');
  Vue.directive(name, instruct.default || instruct);
});

//安装element-ui
Vue.use(ElementUI);

Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
