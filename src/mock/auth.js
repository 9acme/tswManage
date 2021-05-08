var Mock = require('mockjs');

//返回完整的请求路径
function getUrl(name) {
  return 'https://localhost/api/' + name;
}

Mock.mock(getUrl('login'), function() {
  return {
    msg: '操作成功',
    code: 200,
    token:
      'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImEzYjZjMzFlLTI4ODAtNDQ4Yy04ODIxLWMyNTUwMWRhZTE3NSJ9.0NKs-lcbbQkpEvqOx_lY_hIjb7fh0h_pibRKxpPlOPeMG5KcJK5fJ7Ll4JmsM3M54AAp80CWmYud_BKjXM9ytw'
  };
});

Mock.mock(getUrl('user/getUserInfo'), function() {
  return {
    msg: '操作成功',
    code: 200,
    permissions: ['user/get'],
    roles: ['admin'],
    user: {
      searchValue: null,
      createBy: 'admin',
      createTime: '2020-11-20 19:29:42',
      updateBy: null,
      updateTime: null,
      remark: '管理员',
      params: {},
      userId: 1,
      deptId: 103,
      userName: 'admin',
      nickName: '若依',
      email: 'ry@163.com',
      phonenumber: '15888888888',
      sex: '1',
      avatar: '',
      salt: null,
      status: '0',
      delFlag: '0',
      loginIp: '127.0.0.1',
      loginDate: '2020-11-20T19:29:42.000+0800',
      dept: {
        searchValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        params: {},
        deptId: 103,
        parentId: 101,
        ancestors: null,
        deptName: '研发部门',
        orderNum: '1',
        leader: '若依',
        phone: null,
        email: null,
        status: '0',
        delFlag: null,
        parentName: null,
        children: []
      },
      roles: [
        {
          searchValue: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          params: {},
          roleId: 1,
          roleName: '超级管理员',
          roleKey: 'admin',
          roleSort: '1',
          dataScope: '1',
          menuCheckStrictly: false,
          deptCheckStrictly: false,
          status: '0',
          delFlag: null,
          flag: false,
          menuIds: null,
          deptIds: null,
          admin: true
        }
      ],
      roleIds: null,
      postIds: null,
      admin: true
    }
  };
});

Mock.mock(getUrl('user/getRouters'), function() {
  return {
    msg: '操作成功',
    code: 200,
    data: [
      {
        path: '/user',
        component: 'user/user',
        children: [
          {
            path: 'role',
            component: 'role/role'
          }
        ]
      },
      {
        path: '/role',
        component: 'role/role'
      },
      {
        path: '*',
        component: 'error/404'
      }
    ]
  };
});

export default Mock;
