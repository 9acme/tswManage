//导入vue
import Vue from 'vue';
//导入vue-router
import VueRouter from 'vue-router';

//安装路由插件
Vue.use(VueRouter);

//基本路由
export const baseRouter = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/404',
    component: () => import('@/views/error/404')
  },
  {
    path: '/403',
    component: () => import('@/views/error/401')
  },
  {
    path: '/success',
    component: () => import('@/views/success')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout/layout')
  }
];

// 需要权限的路由
export const authRouter = [
  {
    path: '/user',
    component: () => import('@/views/user/user'),
    meta: { perms: ['user/get', 'user/post', 'user/delete', 'user/put'] }
  },
  {
    path: '/role',
    component: () => import('@/views/role/role'),
    meta: { perms: ['role/get', 'role/post', 'role/delete', 'role/put'] }
  },
  {
    path: '*',
    component: () => import('@/views/error/404')
  }
];

//导出路由对象
export default new VueRouter({
  mode: 'hash', //路由采用hash的方式, 也就是浏览器地址栏带#
  scrollBehavior: () => ({ y: 0 }), //滚动到y为0的位置
  routes: baseRouter
});

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
