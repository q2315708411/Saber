import store from '../store';
import Layout from '@/page/index/';
const __qiankun__ = window.__POWERED_BY_QIANKUN__;

// 子应用-本地开发环境-自定义路由(！！保证本地开发的路由全部定义在这里！！)
// 不需要展示的路由hidden：true即可
var customRoutes = [
  {
    path: '/login',
    name: '登录页',
    hidden:true,
    component: () => import('@/page/login/index.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    isFirst: true,
    icon:'icon-caidan',
    children: [{
      path: '/dashboard',
      name: '首页',
      meta: {
        i18n: 'dashboard',
      },
      component: () => import('@/views/dashboard/index.vue')
    }]
  },
  // 本地开发路由
  {
    path: '/test',
    name: '菜单集合',
    redirect:'/test/form',
    component:Layout,
    icon:'icon-caidan',
    children:[
      {
        path: '/test/form',
        name: '表单页',
        component: () => import('@/views/test/form.vue'),
      }
    ]
  },
  // 不在菜单展示，但是需要内部跳转，本地开发使用
  {
    path: '/test2',
    name: '隐藏菜单集合',
    hidden:true,
    redirect:'/test2/crud',
    component:Layout,
    children:[
      {
        path: '/test2/crud',
        // name: '表格页',//不要配置name
        component: () => import('@/views/test/crud.vue'),
      }
    ]
  },
  {
    path: '/404',
    hidden:true,
    component: () => import('@/components/error-page/404'),
  },
  {
    path: '*',
    hidden:true,
    redirect: '/dashboard'
  }
]
/*
  注册生产路由
  子应用（通过$router.pus或者link等方式）内部跳转：可不在菜单中配置
  如果没有这种类型的操作，置为空数组即可
*/
var developRoutes = [];
// 开发环境
if (process.env.NODE_ENV === 'development' && !__qiankun__) {
  developRoutes = customRoutes;
  store.commit('SET_ROUTES',[...customRoutes]);
}

// 基础路由
export const constantRoutes = developRoutes;