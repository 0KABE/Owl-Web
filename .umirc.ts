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
    { path: '/', name: 'Overview', icon: 'user', component: './overview' },
    { path: '/index', name: 'Index', icon: 'user', component: './index' },
  ],
  fastRefresh: {},
});
