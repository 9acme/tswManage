import axios from '../utils/request';

//登录
export function login(data) {
  return axios.request({
    url: 'login',
    method: 'post',
    data
  });
}
