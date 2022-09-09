'use strict'
const path = require('path')

const packageName = require('./package.json').name

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '././' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    // qiankun--fetch跨域
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 9000,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://192.168.0.211:20000/',
        ws: true,
        // pathRewrite: {
        //   '^/api': '/'
        // }
      }
    }
  },
  configureWebpack: {
    // devtool: 'source-map',
    name: '中盐安徽红四方股份有限公司',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    // qiankun--把子应用打包成 umd 库格式
    output:{
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    // 配置cdn引入
    config.plugin('html').tap((args) => {
      args[0].rootPath = process.env.NODE_ENV === 'production' ? '/' : './';
      return args
    });
    // 打包时忽略cdn相关(直接引用根目录)
    config.plugin('copy').tap(([options])=> {
      options[0].ignore.push('cdn/**')
      options[0].ignore.push('util/**')
      return [options]
    });
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    });
  },
  css: {
    extract: { ignoreOrder: true }
  }
};
