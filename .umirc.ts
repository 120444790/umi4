import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/register',
    },
    {
      name: '用户列表',
      path: '/user',
      component: './Users',
    },
    {
      name: '注册新用户',
      path: '/register',
      component: './Register',
      layout: false,
    },
  ],
  npmClient: 'pnpm',
});

