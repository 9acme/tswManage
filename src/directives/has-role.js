import store from '../store/index';

export default {
  inserted(el, binding) {
    //传入的角色字符串
    const { value } = binding;
    //超级管理员角色字符串
    const super_admin = 'admin';
    //获取全部角色字符串
    const roles = store.getters.roles;

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value;

      let hasRole = roles.some(role => {
        return role == super_admin || roleFlag.includes(role);
      });

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw Error('请设置角色权限标签值');
    }
  }
};
