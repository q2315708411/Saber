// 路由相关的路由、标题等操作
import Vue from 'vue';
import i18n from '@/lang';

const i18nVue = new Vue({ i18n: i18n });

// 标题国际化
export function setTitle(title) {
  const defaultTitle = i18nVue.$t('title');
  title = title ? `${title}-${defaultTitle}` : defaultTitle;
  document.title = title;
}
// 路由国际化
export function generateTitle(title, key) {
  if (!key) {
    return title;
  }
  const hasKey = i18nVue.$te('route.' + key);
  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = i18nVue.$t('route.' + key);
    return translatedTitle;
  }
  return title;
}
//处理路由
export function getPath(params) {
  let { src } = params;
  let result = src || '/';
  return result;
}
//正则处理路由
export function vaildPath(list, path) {
  let result = false;
  list.forEach(ele => {
    if (new RegExp("^" + ele + ".*", "g").test(path)) {
      result = true;
    }
  })
  return result;
}
//设置路由值
export function getValue(route) {
  let value = "";
  if (route.query.src) {
    value = route.query.src;
  } else {
    value = route.path;
  }
  return value;
}