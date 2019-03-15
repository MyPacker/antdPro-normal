export default [
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/login',
        component: './user-login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      // dashboard
      {
        path: '/welcome',
        name: '欢迎',
        icon: 'smile',
        component: './Welcome',
      },
      {
        name: '招聘信息管理',
        icon: 'smile',
        path: '/recruit',
        routes: [
          {
            name: '实习管理',
            icon: 'smile',
            path: '/recruit/practice-management/',
            component: './practice-management',
          },
          {
            path: '/recruit/practice-management/new',
            name: '新建',
            component: './practice-form',
            hideInMenu: true,
          },
        ],
      },
    ],
  },
];
