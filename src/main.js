import './public-path'

import Vue from 'vue';
import App from './App';
import store from './store';

import i18n from './lang';
import axios from './router/axios';

import { loadStyle } from './util/util'
import * as urls from '@/config/env';
import Element from 'element-ui';
import { iconfontUrl, iconfontVersion } from '@/config/env';
import './styles/common.scss';

// 全局组件
import basicBlock from './components/basic-block/main';
import basicContainer from './components/basic-container/main';
Vue.component('basicContainer', basicContainer);
Vue.component('basicBlock', basicBlock);

// 加载Vue拓展
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(window.AVUE, {
  size: 'small',
  tableSize: 'small',
  calcHeight: 65,
  axios,
  i18n: (key, value) => i18n.t(key, value)
});
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
});
// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele));
});

Vue.config.productionTip = false;

// 路由改造
import { constantRoutes } from './router/index';
import VueRouter from 'vue-router';
import { getStore } from '@/util/store';
import { originBodyAppend,redirectPopup } from '@/config/micro';
Vue.use(VueRouter);

const __qiankun__ = window.__POWERED_BY_QIANKUN__;
let router = null;
let instance = null;

const render = async ( props = {}) => {
  const { name, container } = props;
  const appName = name?`/${name}`:'';
  Vue.prototype.$appName = appName;
  // 加载默认路由
  router = new VueRouter({
    routes: constantRoutes
  });
  // 加载权限路由
  if(__qiankun__){
    // 修改body挂载
    redirectPopup(container);
    // 设置按钮、菜单权限
    var storeRoutes = [];
    const tenantId = getStore({ name: 'tenantId' });
    const menu_props = getStore({name:'menuProps'});
    const permission_buttons = getStore({name:'permission'});
    const permission_routes = getStore({name:'appRoutes'});
    if(permission_routes){
      storeRoutes = permission_routes[name]||[];
    }
    // 设置按钮权限
    store.commit('SET_PERMISSION',permission_buttons);
    store.commit('SET_TENANT_ID',tenantId);
    // 拼接路由
    const accessRoutes = await store.dispatch('generateRoutes',{
      props: menu_props,
      routes: storeRoutes,
      app: appName
    });
    router.addRoutes(accessRoutes);
  }
  // 挂载
  instance = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}
__qiankun__ || render()

export async function bootstrap(props = {}) {
  // 存储全局使用 props是基座传输过来的值，可进行token等存储使用
  // Vue.prototype.$MicroBootstrap = props
  console.log('bootstrap', props);
}

/**
* name 实例化微应用
* param {Object} props 主应用下发的props
* description 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
*/
export async function mount(props) {
  // 注册应用间通信  props是基座传输过来的值，可进行token等存储使用
  console.log('mount', props);
  // 设置通讯
  // Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange;
  // Vue.prototype.$setGlobalState = props.setGlobalState;
  // 注册微应用实例化函数
  render(props);
}

/**
* name 微应用卸载/切出
*/
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  document.body.appendChild = originBodyAppend;
}