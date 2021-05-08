import cookie from 'js-cookie';

const key = 'xxx-token';

//将token保存到cookie中
export function setToken(token) {
  return cookie.set(key, token);
}

//获取cookie中的token
export function getToken() {
  return cookie.get(key);
}

//删除token
export function removeToken() {
  return cookie.remove(key);
}
