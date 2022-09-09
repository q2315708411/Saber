/*
  此处保留语言、颜色、主题和基础配置，主应用会修改这些项，后面可能会考虑同步
*/
import { setStore, getStore } from '@/util/store'
import website from '@/config/website'

const common = {
  state: {
    language: getStore({ name: 'language' }) || 'zh',
    colorName: getStore({ name: 'colorName' }) || '#409EFF',
    themeName: getStore({ name: 'themeName' }) || 'theme-default',
    website: website,
    isCollapse: false,
    screen: -1,
  },
  mutations: {
    SET_COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    SET_SCREEN: (state, screen) => {
      state.screen = screen;
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      setStore({
        name: 'language',
        content: state.language
      })
    },
    SET_COLOR_NAME: (state, colorName) => {
      state.colorName = colorName;
      setStore({
        name: 'colorName',
        content: state.colorName,
      })
    },
    SET_THEME_NAME: (state, themeName) => {
      state.themeName = themeName;
      setStore({
        name: 'themeName',
        content: state.themeName,
      })
    }
  }
}
export default common
