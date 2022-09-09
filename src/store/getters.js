const getters = {
  // tags
  tag: state => state.tags.tag,
  tagList: state => state.tags.tagList,
  tagWel: state => state.tags.tagWel,
  // common
  language: state => state.common.language,
  website: state => state.common.website,
  colorName: state => state.common.colorName,
  themeName: state => state.common.themeName,
  isCollapse: state => state.common.isCollapse,
  screen: state => state.common.screen,
  keyCollapse: (state, getters) => getters.screen > 1 ? getters.isCollapse : false,
  // user
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  permission: state => state.user.permission,
  // permission
  menu: state => state.permission.routes
}
export default getters
