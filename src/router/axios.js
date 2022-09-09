/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios';
import store from '@/store/';
import { serialize } from '@/util/util';
import { getToken } from '@/util/auth';
import { Message } from 'element-ui';
import website from '@/config/website';
import { Base64 } from 'js-base64';

const request = axios.create({
  timeout: 10000,
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 && status <= 500;
  }
});

//http request拦截
request.interceptors.request.use(config => {
  const meta = config.meta || {};
  const isToken = meta.isToken === false;
  config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
  //让每个请求携带token
  if (getToken() && !isToken) {
    config.headers[website.tokenHeader] = 'bearer ' + getToken()
  }
  //headers中配置text请求
  if (config.text === true) {
    config.headers["Content-Type"] = "text/plain";
  }
  //headers中配置serialize为true开启序列化
  if (config.method === 'post' && meta.isSerialize === true) {
    config.data = serialize(config.data);
  }
  return config
}, error => {
  return Promise.reject(error)
});
//http response 拦截
request.interceptors.response.use(res => {
  //获取状态码
  const status = res.data.code || res.status;
  const statusWhiteList = website.statusWhiteList || [];
  const message = res.data.msg || res.data.error_description || '未知错误';
  //如果在白名单里则自行catch逻辑处理
  if (statusWhiteList.includes(status)) {
    return Promise.reject(res);
  }
  //如果是401则跳转到登录页面
  if (status === 401) {
    store.dispatch('FedLogOut').then(() => location.replace(`${location.origin}/#/login`))
  }
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    Message({
      message: message,
      type: 'error'
    });
    return Promise.reject(new Error(message))
  }
  return res;
}, error => {
  return Promise.reject(new Error(error));
});

export default request;