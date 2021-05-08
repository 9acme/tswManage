import axios from 'axios';
import { getToken } from './auth';
import store from '@/store/index';

const instance = axios.create({
  baseURL: 'https://localhost/api/',
  timeout: 5000
});

axios.interceptors.request.use(
  config => {
    //使用store.getters.token来进行判断可以防止登录带token
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Litemall-Admin-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Litemall-Admin-Token'] = getToken();
    }
    return config;
  },
  error => {
    console.log('error: ', error);
  }
);

axios.interceptors.response.use(
  resp => {
    console.log('resp: ', resp);
  },
  err => {
    console.log('err: ', err);
  }
);

export default instance;
