import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    name: 'Owl',
    layout: 'side',
    headerRender: false,
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', name: 'Overview', icon: 'areaChart', component: './overview' },
    {
      path: '/policies',
      name: 'Policies',
      icon: 'user',
      component: './policies',
    },
    {
      path: '/config',
      name: 'Configuration',
      icon: 'user',
      component: './config',
    },
  ],
  fastRefresh: {},
});
