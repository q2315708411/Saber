## 说明


- 启动

  ```js
    npm install

    npm run serve
  ```

- 静态资源文件（图片、字体等）统一放在`src/assets/`下

- 路由：hostory模式

- 本地开发

  - 在/src/router/index.js中配置所需路由


- eslint校验看个人需求，可自行删减

- 子应用打包如果需要删除cdn等公共引入，直接引入根目录下的文件，则

  - 在vue.config.js中

    ```
    chainWebpack: (config) => {
      //...

      // 配置cdn引入
      config.plugin('html').tap((args) => {
        args[0].rootPath = process.env.NODE_ENV === 'production' ? '/' : './';
        return args
      })
      // 打包时忽略cdn相关(直接引用根目录)
      config.plugin('copy').tap(([options])=> {
          options[0].ignore.push('cdn/**')
          options[0].ignore.push('util/**')
          return [options]
      })

      //...
    }
    ```
  
  - 在index.html中把`BASE_URL` 替换成 `htmlWebpackPlugin.options.prePath` 