//导入需要权限的路由
import { authRouter, baseRouter } from '@/router/index';

/**
 * 通过meta.perms判断是否与当前用户权限匹配
 * @param route
 * @param perms
 */
function hasPermission(route, perms) {
  if (route.meta && route.meta.perms) {
    //有mate
    return perms.some(perm => route.meta.perms.includes(perm));
  } else {
    //没有mate
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param perms
 */
function filterAsyncRoutes(routes, perms) {
  const res = [];

  routes.forEach(item => {
    const tmp = { ...item };
    if (tmp.children) {
      //有, 则接着递归
      tmp.children = filterAsyncRoutes(tmp.children, perms);
      //防止加入空的数组
      if (tmp.children && tmp.children.length > 0) {
        res.push(tmp);
      }
    } else {
      //没有children元素, 则判断是否与当前用户权限匹配
      if (hasPermission(tmp, perms)) {
        res.push(tmp);
      }
    }
  });
  return res;
}

export default {
  state: {
    routes: baseRouter, //将总的路由的值默认设为基础路由
    addRouter: [] //要添加的路由
  },
  mutations: {
    SET_ROUTES(state, addRouter) {
      state.addRouter = addRouter;
      state.routes = state.routes.concat(addRouter);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let accessedRoutes;
        const perms = data;

        if (perms.includes('*/*')) {
          // 包含'*/*', 则证明该用户拥有所有权限
          accessedRoutes = authRouter;
        } else {
          // 不包含, 则需要通过递归遍历出有权限的路由
          accessedRoutes = filterAsyncRoutes(authRouter, perms);
        }

        commit('SET_ROUTES', accessedRoutes);
        resolve();
      });
    }
  }
};
