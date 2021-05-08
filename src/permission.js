//导入路由对象
import router from './router/index';
//导入token相关的方法
import { getToken } from './utils/auth';
//导入store对象
import store from './store/index';

//白名单
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  if (getToken()) {
    //有token
    if (to.path == '/login') {
      //去登录页
      next(false);
    } else {
      if (store.getters.roles.length === 0) {
        //没有个人信息,则拉取个人信息
        store
          .dispatch('getUserInfo')
          .then(() => {
            //拉取成功则动态添加路由表
            store.dispatch('GenerateRoutes', store.getters.permissions).then(() => {
              router.addRoutes(store.getters.addRoutes);
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            });
          })
          .catch(err => {
            //拉取失败则弹出错误信息并登出
            alert(err);
          });
      } else {
        //有个人信息, 则直接通行next()
        next();
      }
    }
  } else {
    //没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      // 不在免登录名单, 则跳转登录页面
      next('/login');
    }
  }
});
