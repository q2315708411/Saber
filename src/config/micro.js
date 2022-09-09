// 原生append to body方法
export const originBodyAppend = document.body.appendChild.bind(document.body);

// 更改子应用全局挂载DOM指向
/*
* el-popper：select选择器，级联选择器，时间选择器，日期选择器，日期时间选择器，下拉菜单，popover弹出框，popconfirm气泡确认框
* el-dialog__wrapper：弹窗
* el-drawer__wrapper：抽屉
* v-modal：弹窗背景，抽屉背景
* el-message-box__wrapper：messagebox弹窗
* el-message：message消息提示(走全局)
* el-notification：notification通知
* el-tooltip__popper：message消息提示背景、tootip文字提示
* el-color-dropdown：颜色选择器
*/
const whiteList = ['el-dialog__wrapper', 'el-drawer__wrapper', 'v-modal'];
const whiteLength = whiteList.length;
export function redirectPopup(container) {
  // 重写appendChild方法
  document.body.appendChild = (dom) => {
    // 根据标记，来区分是否用新的挂载方式
    let iswhite = false;
    for (let i = 0; i < whiteLength; i++) {
      if (` ${dom.className} `.includes(whiteList[i])) {
        iswhite = true;
        break;
      }
    }
    if (iswhite) {
      container.querySelector('#app').appendChild(dom)
    } else {
      originBodyAppend(dom)
    }
  }
}

// 判断是否是当前子应用的路由
function isCurrentPath(routes,path){
  return routes.some(r=>r.path.includes(path))
}

// 子应用模式下，路由拦截判断应用标识
export function interceptRouter(router,routes,name=''){
  router.beforeEach((to, from, next) => {
    if (!to.path.startsWith('/micro-') && isCurrentPath(routes,to.path)) {
      next({
        path: name + to.path
      })
    } else {
      next()
    }
  });
}

// 纯英文判断
function isEnglish(str){
  var reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
  return !reg.test(str);
}

// 子应用模式下，处理内部路由，拼接应用标识
export function splicePrefix(routes=[],name=''){
  routes.forEach(r=>{
    // 路由前缀
    r.path = `${name}${r.path}`;
    // 适配通过name路由跳转
    if(isEnglish(r.name)){
      let pre = r.name.startsWith('/')?'':'/';
      r.name = `${name}${pre}${r.name}`;
    }
  });
}