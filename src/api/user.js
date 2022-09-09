import request from '@/router/axios';
import website from "@/config/website";

// 用户名登录
export const loginByUsername = (tenantId, deptId, roleId, username, password, type, key, code) => request({
  url: '/api/tiji-auth/oauth/token',
  method: 'post',
  headers: {
    'Tenant-Id': tenantId,
    'Dept-Id': (website.switchMode ? deptId : ''),
    'Role-Id': (website.switchMode ? roleId : ''),
    'Captcha-Key': key,
    'Captcha-Code': code,
  },
  params: {
    tenantId,
    username,
    password,
    grant_type: (website.captchaMode ? "captcha" : "password"),
    scope: "all",
    type
  }
});

// 退出
export const logout = () => request({
  url: '/api/tiji-auth/oauth/logout',
  method: 'get'
});

// 按钮权限
export const getButtons = () => request({
  url: '/api/tiji-system/menu/buttons',
  method: 'get'
});

// 验证码
export const getCaptcha = () => request({
  url: '/api/tiji-auth/oauth/captcha',
  method: 'get'
});

// 清除缓存
export const clearCache = () => request({
  url: '/api/tiji-auth/oauth/clear-cache',
  method: 'get'
});
