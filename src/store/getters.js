export default {
  token: state => state.user.token,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  addRoutes: state => state.permissions.routes
};
