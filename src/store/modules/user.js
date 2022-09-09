import { setToken, removeToken } from '@/util/auth'
import { Message } from 'element-ui'
import { setStore, getStore } from '@/util/store'
import { validatenull } from '@/util/validate'
import { loginByUsername, getButtons, logout } from '@/api/user'
import md5 from 'js-md5'

const user = {
  state: {
    tenantId: getStore({ name: 'tenantId' }) || '',
    userInfo: getStore({ name: 'userInfo' }) || [],
    permission: getStore({ name: 'permission' }) || {},
    token: getStore({ name: 'token' }) || ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token);
      state.token = token;
      setStore({ name: 'token', content: state.token })
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId;
      setStore({ name: 'tenantId', content: state.tenantId })
    },
    SET_USER_INFO: (state, userInfo) => {
      if (validatenull(userInfo.avatar)) {
        userInfo.avatar = require("@/assets/img/avator.png");
      }
      state.userInfo = userInfo;
      setStore({ name: 'userInfo', content: state.userInfo })
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission;
      setStore({ name: 'permission', content: state.permission })
    },
    // 本地按钮权限
    SET_PERMISSION_LOCAL: (state, permission) => {
      let result = [];
      // 递归取code
      function getCode(list) {
        list.forEach(ele => {
          if (typeof (ele) === 'object') {
            const chiildren = ele.children;
            const code = ele.menuCode;
            if (chiildren && chiildren.length>0) {
              getCode(chiildren)
            } else {
              result.push(code);
            }
          }
        })
      }
      // 将按钮列表转换成Obejct=>key=value形式
      getCode(permission);
      state.permission = {};
      result.forEach(ele => {
        state.permission[ele] = true;
      });
      setStore({ name: 'permission', content: state.permission })
    }
  },
  actions: {
    //根据用户名登录
    LoginByUsername({ commit, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.tenantId, userInfo.deptId, userInfo.roleId, userInfo.username, md5(userInfo.password), userInfo.type, userInfo.key, userInfo.code).then(res => {
          const data = res.data;
          if (data.error_description) {
            Message({
              message: data.error_description,
              type: 'error'
            })
          } else {
            commit('SET_TOKEN', data.access_token);
            commit('SET_TENANT_ID', data.tenant_id);
            commit('SET_USER_INFO', data);
            dispatch('GetButtons');
          }
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      })
    },
    //获取系统按钮
    GetButtons({ commit }) {
      return new Promise((resolve) => {
        getButtons().then(res => {
          const data = res.data.data;
          // commit('SET_PERMISSION', data);
          commit('SET_PERMISSION_LOCAL', data);
          resolve();
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '');
          removeToken();
          localStorage.clear();
          sessionStorage.clear();
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    //注销session
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        localStorage.clear();
        sessionStorage.clear();
        resolve();
      })
    },
  }
}
export default user
