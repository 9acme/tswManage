import { baseRouter } from '../../router/index';
import { getRouters } from '../../api/user';

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 */
function filterAsyncRoutes(routes) {
  //结果集
  const res = [];
  //临时变量
  let temp = null;

  //遍历线上路由
  routes.forEach(route => {
    //把单个路由赋值给临时变量temp
    temp = { ...route };

    //根据字符串进行路由懒加载
    temp.component = loadView(temp.component);

    //判断是否有子节点, 有则进行递归
    if (temp.children) {
      temp.children = filterAsyncRoutes(temp.children);
    }

    //加入结果集
    res.push(temp);
  });

  //返回结果集
  return res;
}

// 路由懒加载
export const loadView = view => {
  return () => import(`@/views/${view}`);
};

export default {
  state: {
    routes: baseRouter,
    addRoute: []
  },
  mutations: {
    SET_ROUTES(state, addRoute) {
      state.addRoute = addRoute;
      state.routes = state.routes.concat(addRoute);
    }
  },
  actions: {
    async GenerateRoutes({ commit }) {
      await getRouters()
        .then(res => {
          let accessedRoutes = filterAsyncRoutes(res.data.data);
          console.log('accessedRoutes: ', accessedRoutes);
          commit('SET_ROUTES', accessedRoutes);
        })
        .catch(err => {
          console.log('在线路由解析err: ', err);
        });
    }
  }
};
