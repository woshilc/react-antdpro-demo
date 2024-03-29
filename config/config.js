// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'Note',
              icon: 'BookOutlined',
              path: '/note',
              component: './Note',
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              name: 'ReactWindow',
              icon: 'smile',
              path: '/react-window',
              component: './ReactWindow',
            },
            {
              name: 'JiShiQi',
              icon: 'smile',
              path: '/jishiqi',
              component: './JiShiQi',
            },
            {
              name: 'ClassNames&Media',
              icon: 'smile',
              path: '/classnames',
              component: './ClassNames',
            },
            {
              name: 'ReactQuill',
              icon: 'smile',
              path: '/react-quill',
              component: './ReactQuill',
            },
            {
              name: 'Transition',
              icon: 'smile',
              path: '/transition',
              component: './Transition',
            },
            {
              name: 'Scroller',
              icon: 'smile',
              path: '/scroller',
              component: './Scroller',
            },
            {
              name: 'Router',
              icon: 'smile',
              path: '/router/:id?',
              component: './Router/[id$]/index',
            },
            {
              name: 'Event',
              icon: 'smile',
              path: '/event',
              component: './Event',
            },
            {
              name: 'Grid',
              icon: 'smile',
              path: '/grid',
              component: './Grid',
            },
            {
              name: 'AnimTrans',
              icon: 'smile',
              path: '/animtrans',
              component: './AnimTrans',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
