import website from "@/config/website";
import { isURL } from '@/util/validate'

// 子应用名称
var appName = '';
// 路由的配置（主应用）
var propsDefault = website.menu.props;

// 菜单属性
function buildRouter(route) {
  let path = route[propsDefault.path];
  // 判断是否外链
  let isThird = isURL(path);
  let component = `views${path}`;
  let name = route[propsDefault.label];
  let icon = route[propsDefault.icon];
  let children = route[propsDefault.children] || [];
  let meta = route[propsDefault.meta] || {};
  let isChild = children.length !== 0;
  // 外链设置iframe路径（加密，否则路由报错）
  if(isThird){
    path = `/thirdurl/${encodeURIComponent(path)}`;
    component = 'views/thirdurl/index';
  }
  let childRouter;
  //是否有子路由
  if (isChild) {
    childRouter = []
    children.map(item => {
      childRouter.push(buildRouter(item, false))
    })
  }
  return {
    path: appName + path,
    component: (resolve) => {
      if (isChild) {
        require(['@/page/index/layout'], resolve)
      } else {
        require([`@/${component}.vue`], resolve)
      }
    },
    name: name,
    icon: icon,
    meta: meta,
    children: childRouter
  }
}

// 构建菜单
function buildRouterFrame(routes) {
  // 如果没有权限菜单就结束
  if (routes.length == 0) {
    return [];
  }
  var router = [];
  routes.map(item => {
    router.push(buildRouter(item, true));
  })
  return router;
}

const permission = {
  state: {
    routes: [],
    appName: '',
  },
  mutations: {
    // 测试环境使用
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    },
    // 存值？
    SET_APP_INFO: (state, app) => {
      state.appName = app;
    }
  },
  actions: {
    // 构建权限路由
    generateRoutes({ commit }, { props, routes, app }) {
      return new Promise(resolve => {
        commit('SET_APP_INFO', app);
        propsDefault = props;
        appName = app;
        let accessedRoutes = buildRouterFrame(routes);
        resolve(accessedRoutes)
      })
    }
  }
}

export default permission