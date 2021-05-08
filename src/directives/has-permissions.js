import store from '../store/index';

export default {
  inserted(el, binding) {
    //传入的权限字符串
    const { value } = binding;
    //超级管理员权限字符串
    const all_permission = '*/*';
    //获取全部权限字符串
    const permissions = store.getters && store.getters.permissions;

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value;

      const hasPermissions = permissions.some(perm => {
        return perm == all_permission || permissionFlag.includes(perm);
      });

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw Error('请设置操作权限标签值');
    }
  }
};
