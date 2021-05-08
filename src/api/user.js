import axios from '../utils/request';

//获取个人信息
export function getUserInfo() {
  return axios.request({
    url: 'user/getUserInfo',
    method: 'get'
  });
}

//获取线上路由信息
export function getRouters() {
  return axios.request({
    url: 'user/getRouters',
    method: 'get'
  });
}
