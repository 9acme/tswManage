import { login } from '@/api/login';
import { getUserInfo } from '@/api/user';
import { setToken } from '../../utils/auth';

export default {
  state: {
    token: '',
    name: '',
    avatar: '',
    permissions: [],
    roles: []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.toke = token;
    },

    SET_NAME(state, name) {
      state.name = name;
    },

    SET_AVATAR(state, avatar) {
      state.avatar = avatar;
    },

    SET_PERMISSIONS(state, permissions) {
      state.permissions = permissions;
    },

    SET_ROLES(state, roles) {
      state.roles = roles;
    }
  },
  actions: {
    //登录action
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        //发送请求
        login(userInfo)
          .then(res => {
            //请求成功则保存token到cookie中, 并返回res
            let token = res.data.token;
            setToken(token);
            commit('SET_TOKEN', token);
            resolve();
          })
          .catch(err => {
            //请求失败返回错误信息
            reject(err);
          });
      });
    },

    //拉取个人信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(res => {
            //保存信息到vuex中
            commit('SET_PERMISSIONS', res.data.permissions);
            commit('SET_ROLES', res.data.roles);
            commit('SET_AVATAR', res.data.avatar);
            commit('SET_NAME', res.data.nickName);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
